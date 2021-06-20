import { DataTypes } from 'sequelize';
import db from '../database/connection';

const KardexExistencia = db.define('KardexExistencias', {
    productoId: {
        type: DataTypes.STRING
    },
    fechaCaducidad: {
        type: DataTypes.DATE
    },
    cantidad: {
        type: DataTypes.DOUBLE
    },
    valorIngreso: {
        type: DataTypes.DOUBLE
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default KardexExistencia;