'use strict';
const Service = require('egg').Service;

class LoginService extends Service {
  async Login () {
    const result = await this.app.mysql.select('c_user');
    return { result };
  }

  async LoginOut () {
    // const 
  }
}

module.exports = LoginService;
