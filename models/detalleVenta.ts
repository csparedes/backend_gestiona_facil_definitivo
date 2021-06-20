import { DataTypes } from 'sequelize';
import db from '../database/connection';
const DetalleVenta = db.define('detalleVentas', {
    comprobante: {
       type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.DOUBLE
    },
    productoId: {
        type: DataTypes.STRING,
    },
    valorUnitario: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default DetalleVenta;