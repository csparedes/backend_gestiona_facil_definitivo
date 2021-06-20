"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Rol = connection_1.default.define('Roles', {
    rol: {
        type: sequelize_1.DataTypes.TINYINT
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Rol;
//# sourceMappingURL=rol.js.map