import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Proveedor = db.define('Proveedores', {
    nombre: {
        type: DataTypes.STRING
    },
    identificacion: {
        type: DataTypes.STRING
    },
    domicilio: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Proveedor;