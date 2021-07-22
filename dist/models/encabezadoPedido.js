"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const EncabezadoPedido = connection_1.default.define('EncabezadoPedido', {
    comprobante: {
        type: sequelize_1.DataTypes.INTEGER
    },
    proveedoreId: {
        type: sequelize_1.DataTypes.STRING
    },
    fechaPedido: {
        type: sequelize_1.DataTypes.DATE
    },
    totalPedido: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = EncabezadoPedido;
//# sourceMappingURL=encabezadoPedido.js.map