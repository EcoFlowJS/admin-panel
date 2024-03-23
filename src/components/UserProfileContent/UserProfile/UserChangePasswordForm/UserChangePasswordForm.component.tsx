import { Form, FormGroup, InputPassword } from "@eco-flow/components-lib";
import isEmpty from "lodash/isEmpty";
import { useState } from "react";
import { Button, Panel } from "rsuite";

export default function UserChangePasswordForm() {
  const [formValueChangePassword, setFormValueChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  return (
    <Panel>
      <Form
        fluid
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

        <Button
          type="submit"
          block
          appearance="primary"
          color="cyan"
          disabled={
            formValueChangePassword.oldPassword !==
              formValueChangePassword.newPassword ||
            isEmpty(formValueChangePassword.oldPassword) ||
            isEmpty(formValueChangePassword.newPassword)
          }
        >
          Change Password
        </Button>
      </Form>
    </Panel>
  );
}
