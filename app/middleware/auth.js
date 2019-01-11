const url = require('url')
module.exports = () => {
  return async function auth (ctx, next) {
    // 1.用户没有登录跳转到登录页面
    // 2.只有登录以后才可以访问后台管理系统
    const pathname = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
      await next();
    } else {
      // 排除不需要的页面
      if (pathname == '/api/v1/login' || pathname == '/api/v1/logout') {
        await next()
      } else {
        ctx.status = 401
        ctx.body = {
          msg: "没有登录状态"
        }
      }
    }
  };
};