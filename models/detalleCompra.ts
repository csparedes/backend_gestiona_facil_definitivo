import { DataTypes } from 'sequelize';
import db from '../database/connection';
const DetalleCompra = db.define('DetalleCompras', {
    comprobante: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.DOUBLE
    },
    productoId: {
        type: DataTypes.STRING,
        references: 'Producto'
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

export default DetalleCompra;