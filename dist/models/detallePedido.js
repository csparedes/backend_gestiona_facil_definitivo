"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const DetallePedido = connection_1.default.define('DetallePedidos', {
    comprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    cantidad: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    productoId: {
        type: sequelize_1.DataTypes.STRING
    },
    valorUnitario: {
        type: sequelize_1.DataTypes.DOUBLE,
        defaultValue: 0.0
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = DetallePedido;
//# sourceMappingURL=detallePedido.js.map