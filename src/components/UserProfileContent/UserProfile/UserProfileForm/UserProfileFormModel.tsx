import { Schema } from "rsuite";

const UserProfileFormModel = Schema.Model({
  name: Schema.Types.StringType().isRequired("This field is required."),
  email: Schema.Types.StringType().isEmail(
    "Please enter a valid email address."
  ),
});

export default UserProfileFormModel;
