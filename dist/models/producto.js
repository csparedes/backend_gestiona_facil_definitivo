"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Producto = connection_1.default.define('Productos', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    categoriumId: {
        type: sequelize_1.DataTypes.STRING
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING
    },
    tieneIva: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    precioVenta: {
        type: sequelize_1.DataTypes.DOUBLE
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map