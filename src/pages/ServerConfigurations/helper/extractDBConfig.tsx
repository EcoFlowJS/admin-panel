const extractDBConfig = (value: { [key: string]: any }): any => {
  const result = Object.create({});
  Object.keys(value)
    .filter((key) => key.startsWith("database"))
    .forEach((key) => (result[key] = value[key]));
  return result;
};

export default extractDBConfig;
