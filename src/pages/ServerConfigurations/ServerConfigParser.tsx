const ServerConfigParser = (serverConfig: any, PrefixKey = ""): any => {
  let config = Object.create({});
  Object.keys(serverConfig).map((key) => {
    if (typeof serverConfig[key] === "object") {
      if (Array.isArray(serverConfig[key])) {
        config[
          PrefixKey !== ""
            ? PrefixKey + key.charAt(0).toUpperCase() + key.slice(1)
            : key
        ] = serverConfig[key];
      } else
        config = { ...config, ...ServerConfigParser(serverConfig[key], key) };
    } else
      config[
        PrefixKey !== ""
          ? PrefixKey + key.charAt(0).toUpperCase() + key.slice(1)
          : key
      ] = serverConfig[key];
  });
  return config;
};

export default ServerConfigParser;
