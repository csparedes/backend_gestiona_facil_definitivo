import { Sequelize } from 'sequelize';
require('dotenv').config()
// const db = new Sequelize('bdd-backend', 'root' ,'', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
// })

const db = new Sequelize(process.env["CONN_BDD"], process.env["CONN_USER"], process.env["CONN_PASS"], {
    host: process.env["CONN_HOST"],
    dialect: 'mysql',
    logging: false,
});
// const db = new Sequelize('gesincom_gestionafacil','gesincom_csparedes' ,'csparedes:vgesincom', {
//     host: 'gesin.com.ec',
//     dialect: 'mysql',
//     logging: false,
// })

export default db;