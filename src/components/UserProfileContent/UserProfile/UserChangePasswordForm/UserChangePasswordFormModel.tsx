import { Schema } from "rsuite";
import { passwordRegex } from "../../../../defaults/regexs.defaults";

const UserChangePasswordFormModel = Schema.Model({
  oldPassword: Schema.Types.StringType()
    .isRequired("This field is required.")
    .pattern(
      passwordRegex,
      "Password must have at least a symbol, upper and lower case letters and a number."
    ),
  newPassword: Schema.Types.StringType()
    .isRequired("This field is required.")
    .pattern(
      passwordRegex,
      "Password must have at least a symbol, upper and lower case letters and a number."
    ),
  rePassword: Schema.Types.StringType()
    .isRequired("This field is required.")
    .pattern(
      passwordRegex,
      "Password must have at least a symbol, upper and lower case letters and a number."
    )
    .addRule((value, data) => {
      if (value !== data.newPassword) {
        return false;
      }
      return true;
    }, "The two passwords do not match"),
});

export default UserChangePasswordFormModel;
