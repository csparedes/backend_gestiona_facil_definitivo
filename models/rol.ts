import { DataTypes } from 'sequelize';
import db from '../database/connection';
const Rol = db.define('Roles', {
    rol: {
        type: DataTypes.TINYINT
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default Rol;