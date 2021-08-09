import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env['CONN_BDD'], process.env['CONN_USER'] ,process.env['CONN_PASS'], {
    host: process.env['CONN_HOST'],
    dialect: 'mysql',
    logging: false,
})

export default db;