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
exports.existeRol = exports.tieneRol = exports.esAdminRol = void 0;
const rol_1 = __importDefault(require("../models/rol"));
const esAdminRol = (rol) => {
    return (req, res, next) => {
        /*
        * CUIDADO AMIGO, CHEQUEAR ESTAS VARIABLES
        */
        const { rol } = req.body;
        if (rol !== '1') {
            return res.status(401).json({
                msg: `Usted no es administrador, acceso denegado`
            });
        }
        next();
    };
};
exports.esAdminRol = esAdminRol;
const tieneRol = (roles) => {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(500).json({
                msg: 'Verifique el token primero'
            });
        }
        if (!roles.includes(req.body.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
    };
};
exports.tieneRol = tieneRol;
const existeRol = (rol) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const existeRol = yield rol_1.default.findOne({
            where: {
                rol
            }
        });
        if (!existeRol) {
            throw new Error(`El rol ${rol} no existe en la base de datos`);
        }
    });
};
exports.existeRol = existeRol;
//# sourceMappingURL=validar-roles.js.map