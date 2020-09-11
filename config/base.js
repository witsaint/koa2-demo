module.exports = {
  controllerDir: 'controller',
  mysqlConfig: {
    dev: {
      MYSQL_HOST: 'localhost',
      MYSQL_USER: 'root',
      MYSQL_PASS: 'Mtl-2019',
      MYSQL_DATABASE: 'test',
      MYSQL_PORT: '3306'
    },
    prod: {
      MYSQL_HOST: '129.211.162.159',
      MYSQL_USER: 'root',
      MYSQL_PASS: 'mtl-2019',
      MYSQL_DATABASE: 'test',
      MYSQL_PORT: '3306'
    }
  }
};
