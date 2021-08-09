import { DataTypes } from 'sequelize';
import db from '../database/connection';
const Producto = db.define('Productos', {
    nombre: {
        type: DataTypes.STRING
    },
    categoriumId: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.STRING
    },
    tieneIva: {
        type: DataTypes.BOOLEAN
    },
    precioVenta: {
        type: DataTypes.DOUBLE
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    
});

export default Producto;