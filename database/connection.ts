import { Sequelize } from 'sequelize';
const db = new Sequelize('gesincom_gestionafacil', 'gesincom_csparedes', 'csparedes:vgesincom', {
    host: 'gesin.com.ec',
    dialect: 'mysql',
    logging: false,
    port: 3306
})

// const db = new Sequelize('bdd-backend', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false
// })

export default db;