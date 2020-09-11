var mysql = require('mysql2');
const {mysqlConfig} = require('./../config/base')

class mysqlFactory {
  constructor () {
    this.mysql_pool = ''
    // this.init()
  }
  init() {
    const {
      MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE, MYSQL_PORT
    } = mysqlConfig[process.env.NODE_ENV || 'dev'];
    !this.mysql_pool &&
    (this.mysql_pool = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT
    }))
  }
   getDb() {
    return this.mysql_pool
  }
}
module.exports= new mysqlFactory();
