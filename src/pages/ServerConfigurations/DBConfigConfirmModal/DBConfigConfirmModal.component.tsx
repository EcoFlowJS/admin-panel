import { FormGroup, InputPassword } from "@ecoflow/components-lib";
import isEmpty from "lodash/isEmpty";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  FlexboxGrid,
  Form,
  Heading,
  HeadingGroup,
  Input,
  Modal,
  Panel,
  Text,
} from "rsuite";
import DBSetNewFormModel from "./DBSetNewFormModel";

interface DBConfigConfirmModalProps {
  open?: boolean;
  onClose?: (event?: SyntheticEvent<Element, Event>) => void;
  onConfirm?: (
    value?:
      | true
      | {
          name: string;
          username: string;
          password: string;
          email: string;
        }
  ) => void;
}

export default function DBConfigConfirmModal({
  open = false,
  onClose = () => {},
  onConfirm = () => {},
}: DBConfigConfirmModalProps) {
  const formRef = useRef(null);
  const [migrate, setMigrate] = useState<boolean>(true);
  const [value, setValue] = useState<
    Record<"name" | "username" | "password" | "email", string>
  >({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handleConfirm = (event?: SyntheticEvent<Element, Event>) => {
    (formRef.current as any).submit();
    onClose(event);
  };

  const handleSubmit = (event?: SyntheticEvent<Element, Event>) => {
    onConfirm(
      Object.keys(value)
        .filter((key) => key !== "email")
        .filter((key) => isEmpty((value as any)[key])).length === 0
        ? value
        : undefined
    );
    onClose(event);
  };

  const handleMigrate = (event?: SyntheticEvent<Element, Event>) => {
    onConfirm(true);
    onClose(event);
  };

  useEffect(() => {
    if (open) {
      setMigrate(true);
      setValue({
        name: "",
        username: "",
        password: "",
        email: "",
      });
    }
  }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          {migrate
            ? "Do you want to migrate the database?"
            : "Enter root user details."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Panel>
          {migrate ? (
            <>
              <Text style={{ paddingBottom: 15 }}>
                Migrating Database will copy all user roles permission and audit
                logs to the new database.
              </Text>
            </>
          ) : (
            <>
              <HeadingGroup>
                <Heading level={5}>Create User</Heading>
                <Text muted>
                  Create admin user to access the application in authenticated
                  mode.
                </Text>
              </HeadingGroup>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={18}>
                  <Form
                    ref={formRef}
                    fluid
                    formValue={value}
                    onChange={setValue}
                    onSubmit={(value, event) => {
                      if (value !== null) handleSubmit(event);
                    }}
                    model={DBSetNewFormModel}
                    checkTrigger="change"
                  >
                    <FormGroup
                      name="name"
                      label="Name :-"
                      autoComplete="off"
                      placeholder="Administrator"
                      accepter={Input}
                    />
                    <FormGroup
                      name="username"
                      label="Username :-"
                      autoComplete="off"
                      placeholder="admin"
                      accepter={Input}
                    />
                    <FormGroup
                      name="password"
                      label="Password :-"
                      autoComplete="off"
                      placeholder="Password"
                      accepter={InputPassword}
                    />
                    <FormGroup
                      name="email"
                      label="Email :-"
                      autoComplete="off"
                      placeholder="Email"
                      accepter={Input}
                      helperText="Optional."
                    />
                  </Form>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </>
          )}
        </Panel>
      </Modal.Body>
      <Modal.Footer>
        {migrate ? (
          <>
            <Button
              onClick={handleMigrate}
              appearance="primary"
              color="green"
              style={{ minWidth: 100 }}
            >
              Migrate
            </Button>
            <Button
              onClick={() => setMigrate(false)}
              appearance="subtle"
              style={{ minWidth: 100 }}
            >
              Setup New
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleConfirm}
              appearance="primary"
              color="green"
              style={{ minWidth: 100 }}
            >
              Confirm
            </Button>
            <Button
              onClick={onClose}
              appearance="subtle"
              style={{ minWidth: 100 }}
            >
              Cancel
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
