import { LogLevel } from "@ecoflow/types";

const logLevel: LogLevel = {
  ERROR: 0,
  WARNING: 1,
  INFO: 2,
  VERBOSE: 4,
  DEBUG: 5,
};

const logList = Object.keys(logLevel).map((item) => {
  const value = logLevel as any;
  return {
    label: item,
    value: value[item],
  };
});

export default logList;
