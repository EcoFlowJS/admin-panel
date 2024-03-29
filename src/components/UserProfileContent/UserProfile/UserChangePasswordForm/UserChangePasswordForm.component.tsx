import { Form, FormGroup, InputPassword } from "@ecoflow/components-lib";
import isEmpty from "lodash/isEmpty";
import { useEffect, useState } from "react";
import { Button, Panel } from "rsuite";
import UserChangePasswordFormModel from "./UserChangePasswordFormModel";
import updateUserInformations from "../../../../service/user/updateUserInformations.service";
import { ApiResponse } from "@ecoflow/types";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";
import { useAtom } from "jotai";

export default function UserChangePasswordForm() {
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
        }
      },
      (reject: ApiResponse) => {
        setUpdating(false);
        if (reject.error)
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
      }
    );
  };

  return (
    <Panel>
      <Form
        fluid
        model={UserChangePasswordFormModel}
        onSubmit={(
          checkStatus: boolean,
          event: React.FormEvent<HTMLFormElement>
        ) => {
          event.preventDefault();
          if (checkStatus) handleFormSubmit();
        }}
        disabled={isUpdateing}
        formValue={formValueChangePassword}
        onChange={(value: any) => setFormValueChangePassword(value)}
      >
        <FormGroup
          name="oldPassword"
          label="Old Password"
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
          label="New Password"
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
