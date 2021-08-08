"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// const db = new Sequelize('bdd-backend','root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     port: 3306
// })
const db = new sequelize_1.Sequelize(process.env.CONN_BDD, process.env.CONN_USER, process.env.CONN_PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
    port: 3306
});
exports.default = db;
//# sourceMappingURL=connection.js.map