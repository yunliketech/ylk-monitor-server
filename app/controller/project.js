'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async add () {
    const { ctx, service } = this;
    // 校验规则
    const createRule = {
      id: 'number',
      projectName: 'string'
    };
    ctx.validate(createRule, ctx.request.body);

    // 传入数据去增加数据
    const result = await ctx.service.project.add(ctx.request.body);
    // 返回数据
    ctx.body = {
      code: 200,
      result: result.insertSuccess === true ? "成功" : "失败"
    }
  }

  async id () {
    const { ctx, service } = this;
    const projectId = await ctx.service.project.id();
    // 返回参数
    ctx.body = {
      code: 200,
      projectId
    }
  }
}

module.exports = ProjectController;
