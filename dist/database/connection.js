"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('gesincom_gestionafacil', 'gesincom_csparedes', 'csparedes:vgesincom', {
    host: 'gesin.com.ec',
    dialect: 'mysql',
    logging: false,
    port: 3306
});
// const db = new Sequelize('0rFoRC2A8k', '0rFoRC2A8k', 'iIKNYZGnmv', {
//     host: 'remotemysql.com',
//     dialect: 'mysql',
//     // logging: false,
// })
// const db = new Sequelize('bdd-backend', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false
// })
exports.default = db;
//# sourceMappingURL=connection.js.map