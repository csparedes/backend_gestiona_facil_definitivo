"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Cliente = connection_1.default.define('Clientes', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    identificacion: {
        type: sequelize_1.DataTypes.STRING
    },
    domicilio: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = Cliente;
//# sourceMappingURL=cliente.js.map