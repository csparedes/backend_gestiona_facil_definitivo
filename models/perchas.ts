import { DataTypes } from "sequelize";
import db from '../database/connection';

const Percha = db.define('Perchas', {
    cajaId: {
        type: DataTypes.STRING
    },
    articuloId: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Percha;