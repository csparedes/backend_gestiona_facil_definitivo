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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
// const Usuario = import('../models/usuario');
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    const secretKey = process.env.SECRETORPRIVATEKEY || 'EsM1SuperCl4v3100%realNof4k3';
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
    try {
        const uid = jsonwebtoken_1.default.verify(token, secretKey);
        //@ts-ignore
        const nombre = uid.uid;
        const usuario = yield usuario_1.default.findOne({
            where: {
                nombre
            }
        });
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido, el usuario no existe en la Base de Datos"
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map