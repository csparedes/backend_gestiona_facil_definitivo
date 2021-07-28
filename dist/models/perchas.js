"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Percha = connection_1.default.define('Perchas', {
    cajaId: {
        type: sequelize_1.DataTypes.STRING
    },
    articuloId: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
exports.default = Percha;
//# sourceMappingURL=perchas.js.map