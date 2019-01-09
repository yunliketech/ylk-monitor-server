'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 展开数据保存
  router.post('/api/v1/logs/add', controller.logs.add);  // 插入logs数据
  router.get('/api/v1/logs/list', controller.logs.list); // 查询logs数据

  // router.post('/login')
  router.post('/api/v1/project/add', controller.project.add); // 后台加入project代码
  router.get('/api/v1/project/id', controller.project.id); // 后台分配的id号
};
