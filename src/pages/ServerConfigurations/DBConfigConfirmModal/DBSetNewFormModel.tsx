import { Schema } from "rsuite";
import { passwordRegex } from "../../../defaults/regexs.defaults";

const DBSetNewFormModel = Schema.Model({
  name: Schema.Types.StringType("Name must be a string").isRequired(
    "Name is required"
  ),
  username: Schema.Types.StringType("Username must be a string").isRequired(
    "Username is required"
  ),
  password: Schema.Types.StringType("Password must be a string")
    .isRequired("Password is required")
    .pattern(
      passwordRegex,
      "Password must have at least a symbol, upper and lower case letters and a number."
    ),
  email: Schema.Types.StringType("Email must be a string").isEmail(
    "Enter a valid email address"
  ),
});

export default DBSetNewFormModel;
