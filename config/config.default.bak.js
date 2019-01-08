'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '';

  // add your config here
  config.middleware = [];

  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'user',
      password: 'pasword',
      database: 'databaseName'
    },
    app: true,      // 是否加载到app上
    agent: false    // 是否加载到agent上
  };

  return config;
};
