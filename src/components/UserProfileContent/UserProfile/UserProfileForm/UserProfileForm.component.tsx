import { FormGroup } from "@ecoflow/components-lib";
import { useEffect, useState } from "react";
import { Button, Form, Panel } from "rsuite";
import TextInput from "./TextInput/TextInput.componet";
import isEqual from "lodash/isEqual";
import { ApiResponse, UserInformations } from "@ecoflow/types";
import UserProfileFormModel from "./UserProfileFormModel";
import updateUserInformations from "../../../../service/user/updateUserInformations.service";
import { useAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";

interface UserProfileFormProps {
  userInfo?: UserInformations;
}

export default function UserProfileForm({ userInfo }: UserProfileFormProps) {
  const successNoti = useAtom(successNotification)[1];
  const errNoti = useAtom(errorNotification)[1];

  const [isUpdating, setUpdating] = useState(false);
  const [formValueUserDetails, setFormValueUserDetails] =
    useState<UserInformations>({
      name: "",
      username: "",
      email: "",
      isPermanent: false,
      createdAt: new Date(),
    });

  const handelFormSubmit = () => {
    setUpdating(true);
    updateUserInformations(formValueUserDetails).then(
      (response: ApiResponse) => {
        setUpdating(false);
        if (response.success) {
          successNoti({
            show: true,
            header: "User Updated",
            message: "User details updated successfully.",
          });
        }
      },
      (reject: ApiResponse) => {
        setUpdating(false);
        if (reject.error)
          errNoti({
            show: true,
            header: "User Upadte Error",
            message: "User details update failed.",
          });
      }
    );
  };

  useEffect(() => {
    if (userInfo) setFormValueUserDetails({ ...userInfo! });
  }, [userInfo]);
  return (
    <Panel>
      <Form
        fluid
        disabled={isUpdating}
        model={UserProfileFormModel}
        formValue={formValueUserDetails}
        onChange={(value: any) => setFormValueUserDetails(value)}
        onSubmit={(
          checkStatus: boolean,
          event: React.FormEvent<HTMLFormElement>
        ) => {
          event.preventDefault();
          if (checkStatus) handelFormSubmit();
        }}
      >
        <FormGroup name="username" label="Username" readOnly />
        <FormGroup
          name="name"
          label="Name"
          accepter={TextInput}
          readOnly
          autoComplete="off"
        />
        <FormGroup
          name="email"
          label="Email"
          accepter={TextInput}
          readOnly
          autoComplete="off"
        />

        <Button
          type="submit"
          block
          loading={isUpdating}
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
