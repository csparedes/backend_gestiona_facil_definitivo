import { DataTypes } from "sequelize";
import db from '../database/connection';

const Firebase = db.define('Firebase', {
    token: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

export default Firebase;