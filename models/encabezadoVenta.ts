import { DataTypes } from 'sequelize';
import db from '../database/connection';
const EncabezadoVentas = db.define('EncabezadoVentas', {
    comprobante: {
        type: DataTypes.INTEGER
    },
    clienteId: {
        type: DataTypes.STRING
    },
    fechaVenta: {
        type: DataTypes.DATE
    },
    totalVenta: {
        type: DataTypes.DOUBLE
    },
    comentario: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default EncabezadoVentas;