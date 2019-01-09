'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 展开数据保存
  router.post('/logs/add', controller.logs.add);  // 插入logs数据
  router.get('/logs/list', controller.logs.list); // 查询logs数据

  // router.post('/login')
};
