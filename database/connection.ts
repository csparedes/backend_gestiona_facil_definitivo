import { Sequelize } from 'sequelize';
const db = new Sequelize('bdd-backend', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

export default db;