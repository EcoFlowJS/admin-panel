import { Form, FormGroup } from "@eco-flow/components-lib";
import { useEffect, useState } from "react";
import { Button, Panel } from "rsuite";
import TextInput from "./TextInput/TextInput.componet";
import isEqual from "lodash/isEqual";
import { UserInformations } from "@eco-flow/types";

interface UserProfileFormProps {
  userInfo?: UserInformations;
}

export default function UserProfileForm({ userInfo }: UserProfileFormProps) {
  const [formValueUserDetails, setFormValueUserDetails] =
    useState<UserInformations>({
      name: "",
      username: "",
      email: "",
      isPermanent: false,
      createdAt: new Date(),
    });

  useEffect(() => setFormValueUserDetails({ ...userInfo! }), [userInfo]);
  return (
    <Panel>
      <Form
        fluid
        formValue={formValueUserDetails}
        onChange={(value: any) => setFormValueUserDetails(value)}
      >
        <FormGroup name="username" label="Username" disabled />
        <FormGroup
          name="name"
          label="Name"
          accepter={TextInput}
          disabled
          autoComplete="off"
        />
        <FormGroup
          name="email"
          label="Email"
          type="email"
          accepter={TextInput}
          disabled
          autoComplete="off"
        />

        <Button
          type="submit"
          block
          appearance="primary"
          color="cyan"
          disabled={isEqual(formValueUserDetails, userInfo)}
        >
          update
        </Button>
      </Form>
    </Panel>
  );
}
