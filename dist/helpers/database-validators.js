"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identificacionLength = exports.existeId = exports.existeEmail = exports.existeNombreCategoria = exports.existeCategoria = void 0;
const sequelize_1 = require("sequelize");
const usuario_1 = __importDefault(require("../models/usuario"));
const categoria_1 = __importDefault(require("../models/categoria"));
//Categorias
const existeCategoria = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { id },
                { estado: true }
            ]
        }
    });
    if (!categoria) {
        throw new Error('La categoria no existe en la Base de Datos');
    }
});
exports.existeCategoria = existeCategoria;
const existeNombreCategoria = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { nombre },
                { estado: true }
            ]
        }
    });
    if (categoria) {
        throw new Error('Ya existe esa categoria en la Base de Datos');
    }
});
exports.existeNombreCategoria = existeNombreCategoria;
const existeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findOne({
        where: {
            email
        }
    });
    if (usuario) {
        throw new Error('El correo ya existe en la Base de Datos');
    }
});
exports.existeEmail = existeEmail;
const existeId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        throw new Error(`El ID: ${id}, no existe en la base de datos`);
    }
});
exports.existeId = existeId;
const identificacionLength = (identificacion) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = /^[0-9]*$/;
    if (identificacion.length < 10) {
        throw new Error('La identificación debe tener mínimo 10 dígitos');
    }
    else if (identificacion.length > 13) {
        throw new Error('La identificación debe tener máximo 13 dígitos');
    }
    else if (!identificacion.match(regex)) {
        throw new Error('La identificación debe contener sólo números');
    }
});
exports.identificacionLength = identificacionLength;
//# sourceMappingURL=database-validators.js.map