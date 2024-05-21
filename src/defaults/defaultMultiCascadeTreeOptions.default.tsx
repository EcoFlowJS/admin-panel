import { ItemDataType } from "rsuite/esm/MultiCascadeTree";

const defaultMultiCascadeTreeOptions: ItemDataType<string>[] = [
  {
    label: "Database Configuration",
    value: "databaseConfigs",
  },
  {
    label: "Environment Configuration",
    value: "environmentConfigs",
  },
  {
    label: "Flow Configuration",
    value: "flowConfigs",
  },
  {
    label: "Installed Package",
    value: "installedPackages",
  },
  {
    label: "Server Configuration",
    value: "serverConfigs",
  },
];

export default defaultMultiCascadeTreeOptions;
