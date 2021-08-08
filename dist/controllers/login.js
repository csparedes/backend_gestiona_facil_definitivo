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
exports.logIn = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //existe usuario
        const usuario = yield usuario_1.default.findOne({
            where: {
                email
            }
        });
        //@ts-ignore
        if (!usuario) {
            return res.status(401).json({
                msg: "El usuario no existe"
            });
        }
        //verificar contraseña
        //@ts-ignore
        const checkPassword = bcrypt_1.default.compareSync(password, usuario.password);
        if (!checkPassword) {
            return res.status(400).json({
                msg: 'Usuario o password incorrectos (password)'
            });
        }
        //generar el token
        //@ts-ignore
        const token = yield generar_jwt_1.default([usuario.rol, usuario.nombre, usuario.email]);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Comuníquese con el Administrador",
            error
        });
    }
});
exports.logIn = logIn;
//# sourceMappingURL=login.js.map