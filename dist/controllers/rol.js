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
exports.deleteRol = exports.postRol = exports.getRolesLike = exports.getRoles = void 0;
const sequelize_1 = require("sequelize");
const rol_1 = __importDefault(require("../models/rol"));
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield rol_1.default.findAll({ where: { estado: true } });
    if (!roles) {
        return res.status(400).json({
            msg: "No se ha encontrado ningún rol disponible"
        });
    }
    res.json({
        msg: "Lista de Roles",
        roles
    });
});
exports.getRoles = getRoles;
const getRolesLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params;
    const roles = yield rol_1.default.findAll({
        where: {
            [sequelize_1.Op.and]: [
                { estado: true },
                { rol: { [sequelize_1.Op.like]: `%${query}%` } }
            ]
        }
    });
    if (!roles) {
        return res.status(400).json({
            msg: "No se han encontrado roles con ese parámetro"
        });
    }
    res.json({
        msg: "Roles disponibles",
        roles
    });
});
exports.getRolesLike = getRolesLike;
const postRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol } = req.body;
    const rolBuscado = yield rol_1.default.findOne({ where: { rol } });
    if (rolBuscado) {
        return res.status(400).json({
            msg: "Ese rol ya existe"
        });
    }
    const rolCreado = yield rol_1.default.build({
        rol,
        estado: true
    });
    rolCreado.save();
    res.json({
        msg: "Se ha creado un nuevo rol",
        rol: rolCreado
    });
});
exports.postRol = postRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol } = req.params;
    const rolBuscado = yield rol_1.default.findOne({ where: { rol } });
    if (!rolBuscado) {
        return res.status(400).json({
            msg: "Ese rol no existe"
        });
    }
    yield rolBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el Rol" + rol,
        rol: rolBuscado
    });
});
exports.deleteRol = deleteRol;
//# sourceMappingURL=rol.js.map