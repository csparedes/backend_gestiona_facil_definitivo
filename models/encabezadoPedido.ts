import { DataTypes } from "sequelize";
import db from '../database/connection';

const EncabezadoPedido = db.define('EncabezadoPedido', {
    comprobante: {
        type: DataTypes.INTEGER
    },
    proveedoreId: {
        type: DataTypes.STRING
    },
    fechaPedido: {
        type: DataTypes.DATE
    },
    totalPedido: {
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

export default EncabezadoPedido;