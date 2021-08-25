'use strict';

const Sequelize = require("sequelize");

const db = new Sequelize({
  host: '127.0.0.1',
  username: "postgres",
  password: "root",
  database: "demoDb",
  dialect: "postgres",
  // operatorsAliases: false,
});

module.exports = db;
