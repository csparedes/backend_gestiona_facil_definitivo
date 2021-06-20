import { DataTypes } from 'sequelize';
import db from '../database/connection';

const KardexIngreso = db.define('KardexIngresos', {
    productoId: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    cantidad: {
        type: DataTypes.DOUBLE
    },
    valorUnitario: {
        type: DataTypes.DOUBLE
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default KardexIngreso;