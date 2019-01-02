var mysql = require('mysql2');
const {mysqlConfig} = require('./../config/base')

class mysqlFactory {
  constructor () {
    this.mysql_pool = ''
    // this.init()
  }
  init() {
    !this.mysql_pool &&
    (this.mysql_pool = mysql.createPool({
      host: mysqlConfig.MYSQL_HOST,
      user: mysqlConfig.MYSQL_USER,
      password: mysqlConfig.MYSQL_PASS,
      database: mysqlConfig.MYSQL_DATABASE,
      port: mysqlConfig.MYSQL_PORT
    }))
  }
   getDb() {
    return this.mysql_pool
  }
}
module.exports= new mysqlFactory();