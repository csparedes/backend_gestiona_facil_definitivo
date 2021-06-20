"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const EncabezadoVentas = connection_1.default.define('EncabezadoVentas', {
    comprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    clienteId: {
        type: sequelize_1.DataTypes.STRING
    },
    fechaVenta: {
        type: sequelize_1.DataTypes.DATE
    },
    totalVenta: {
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
exports.default = EncabezadoVentas;
//# sourceMappingURL=encabezadoVenta.js.map