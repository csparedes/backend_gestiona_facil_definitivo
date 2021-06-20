import { DataTypes } from 'sequelize';
import db from '../database/connection';
const Categoria = db.define('Categoria', {
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Categoria;