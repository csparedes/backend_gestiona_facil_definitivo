"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const KardexIngreso = connection_1.default.define('KardexIngresos', {
    productoId: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    cantidad: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    valorUnitario: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = KardexIngreso;
//# sourceMappingURL=kardexIngreso.js.map