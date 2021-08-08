import { Sequelize } from 'sequelize';
const db = new Sequelize(process.env.CONN_BDD, process.env.CONN_USER , process.env.CONN_PASS, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
    port: 3306
})

export default db;