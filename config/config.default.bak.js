'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // add your config here
  config.middleware = ['errorHandler', 'auth'];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // 只对 /api 前缀的 url 路径生效
  config.auth = {
    match: '/api',
  };

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

  //关闭csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    // 白名单
    domainWhiteList: ['http://127.0.0.1:8080']
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  return config;
};
