'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.session.userinfo = { "user": "admin" };
    ctx.session.maxAge = 2 * 3600 * 1000;
    ctx.body = "欢迎来到由前端编写的后台架构";
  }

  async checkSession () {
    const { ctx } = this;
    console.log(ctx.session.userinfo);
    ctx.session = null;
    ctx.body = "??"
  }
}

module.exports = HomeController;
