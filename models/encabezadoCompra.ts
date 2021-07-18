import { DataTypes } from 'sequelize';
import db from '../database/connection';

const EncabezadoCompra = db.define('EncabezadoCompra', {
    comprobante: {
        type: DataTypes.INTEGER
    },
    proveedoreId: {
        type: DataTypes.STRING
    },
    fechaCompra: {
        type: DataTypes.DATE
    },
    totalCompra: {
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

export default EncabezadoCompra;