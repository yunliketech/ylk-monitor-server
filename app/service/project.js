'use strict';
const Service = require('egg').Service;
const SqlProject = require('../sql/project');

class ProjectService extends Service {
  async add (data) {
    const result = await this.app.mysql.insert('c_project', { project_name: data.projectName, is_del: 0 });

    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    return { insertSuccess };
  }

  async id () {
    const result = await this.app.mysql.query(SqlProject.countProject);
    const projectId = result[0]["count(*)"] + 1
    return projectId;
  }
}

module.exports = ProjectService;
