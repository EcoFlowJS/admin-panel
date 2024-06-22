import { FormGroup, InputPassword } from "@ecoflow/components-lib";
import isEmpty from "lodash/isEmpty";
import { FormEvent, useState } from "react";
import { Button, Form, Panel } from "rsuite";
import UserChangePasswordFormModel from "./UserChangePasswordFormModel";
import updateUserInformations from "../../../../service/user/updateUserInformations.service";
import { ApiResponse } from "@ecoflow/types";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";
import { useAtom } from "jotai";

interface UserChangePasswordFormProps {
  onSuccess?: (message: string) => void;
  onFailure?: (message: string) => void;
}

export default function UserChangePasswordForm({
  onSuccess = () => {},
  onFailure = () => {},
}: UserChangePasswordFormProps) {
  const successNoti = useAtom(successNotification)[1];
  const errNoti = useAtom(errorNotification)[1];

  const [isUpdateing, setUpdating] = useState(false);
  const [formValueChangePassword, setFormValueChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const handleFormSubmit = () => {
    updateUserInformations(formValueChangePassword, "PWD").then(
      (response: ApiResponse) => {
        setUpdating(false);
        if (response.success) {
          setFormValueChangePassword({
            oldPassword: "",
            newPassword: "",
            rePassword: "",
          });
          successNoti({
            show: true,
            header: "Password Updated",
            message: "Password updated successfully.",
          });
          onSuccess("Password updated successfully.");
        }
      },
      (reject: ApiResponse) => {
        setUpdating(false);
        if (reject.error) {
          errNoti({
            show: true,
            header: "Password Upadte Error",
            message:
              typeof reject.payload === "string"
                ? reject.payload
                : typeof reject.payload === "object"
                ? JSON.stringify(reject.payload)
                : reject.payload.toString(),
          });
          onFailure(
            typeof reject.payload === "string"
              ? reject.payload
              : typeof reject.payload === "object"
              ? JSON.stringify(reject.payload)
              : reject.payload.toString()
          );
        }
      }
    );
  };

  return (
    <Panel>
      <Form
        fluid
        model={UserChangePasswordFormModel}
        onSubmit={(
          formValue: Record<string, any> | null,
          event?: FormEvent<HTMLFormElement>
        ) => {
          event?.preventDefault();
          if (formValue) handleFormSubmit();
        }}
        disabled={isUpdateing}
        formValue={formValueChangePassword}
        onChange={(value: any) => setFormValueChangePassword(value)}
      >
        <FormGroup
          name="oldPassword"
          label="Current Password"
          accepter={InputPassword}
          autoComplete="off"
        />
        <FormGroup
          name="newPassword"
          label="New Password"
          accepter={InputPassword}
          autoComplete="off"
        />
        <FormGroup
          name="rePassword"
          label="Confirm Password"
          accepter={InputPassword}
          autoComplete="off"
        />

        <Button
          type="submit"
          block
          loading={isUpdateing}
          appearance="primary"
          color="cyan"
          disabled={
            formValueChangePassword.newPassword !==
              formValueChangePassword.rePassword ||
            isEmpty(formValueChangePassword.newPassword) ||
            isEmpty(formValueChangePassword.rePassword)
          }
        >
          Change Password
        </Button>
      </Form>
    </Panel>
  );
}
