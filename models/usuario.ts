

import { DataTypes } from 'sequelize';
import db from '../database/connection';
const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
    },
    roleId: {
        type:DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Usuario;