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
exports.postTokenFirebase = exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
require("../models/asociasiones");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const rol_1 = __importDefault(require("../models/rol"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: {
            estado: true,
        },
        include: {
            model: rol_1.default,
            attributes: ["rol"],
        },
        attributes: ["nombre", "email", "id"],
    });
    if (!usuarios) {
        return res.status(401).json({
            msg: "No se ha encontrado ningún usuario",
        });
    }
    res.json({
        msg: "Lista de usuarios",
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id, {
        attributes: ["nombre", "email"],
        include: {
            model: rol_1.default,
            attributes: ["rol"],
        },
    });
    if (!usuario) {
        return res.status(401).json({
            msg: "No se ha encontrado ningún usuario",
        });
    }
    res.json({
        msg: "Se encontró el usuario: " + id,
        usuario,
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodemailer = require("nodemailer");
    let bandera = true;
    const transporter = nodemailer.createTransport({
        host: "gesin.com.ec",
        port: 465,
        auth: {
            user: "gestionafacil@gesin.com.ec",
            pass: "gestionafacil",
        },
    });
    const { nombre, roleId, email, password } = req.body;
    const mailOptions = {
        from: "gestionafacil@gesin.com.ec",
        to: email,
        subject: "Entrega de Credenciales",
        text: `Hola ${nombre}, bienvenid@ a Gestiona Fácil, una app para gestionar Víveres Stalin, tus credenciales de acceso al aplicatvo son: \nCorreo: ${email}\nContraseña: ${password}\n\nMuchas gracias por participar, y mucha suerte!!!`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            bandera = false;
        }
        bandera = true;
    });
    const salt = bcrypt_1.default.genSaltSync();
    const nuevoUsuario = {
        nombre,
        roleId,
        email,
        password: bcrypt_1.default.hashSync(password, salt),
        estado: true,
    };
    const usuario = usuario_1.default.build(nuevoUsuario);
    yield usuario.save();
    res.json({
        msg: "Se ha creado un nuevo Usuario",
        usuario,
        emailEnviado: true
    });
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const actualUsuario = yield usuario_1.default.findByPk(id);
    const salt = bcrypt_1.default.genSaltSync();
    if (!actualUsuario) {
        return res.status(401).json({
            msg: "No se ha encontrado ningún usuario",
        });
    }
    const { nombre, roleId, email, password } = req.body;
    const nuevoUsuario = {
        nombre,
        roleId,
        email,
        password: bcrypt_1.default.hashSync(password, salt),
    };
    yield actualUsuario.update(nuevoUsuario);
    res.json({
        msg: "Usuario actualizado",
        actualUsuario,
    });
    // res.json({
    //   id,
    //   m: "put",
    // });
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(401).json({
            msg: "No se ha encontrado ningún usuario",
        });
    }
    yield usuario.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el usuario con id: " + id,
    });
});
exports.deleteUsuario = deleteUsuario;
const postTokenFirebase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { token } = req.body;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(400).json({
            msg: "No se ha encontrado ningún usuario",
        });
    }
    yield usuario.update({ firebase: token });
    res.json({
        msg: "Se ha asignado el token de firebase al usuario",
        token,
        usuario,
    });
});
exports.postTokenFirebase = postTokenFirebase;
//# sourceMappingURL=usuarios.js.map