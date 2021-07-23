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
exports.notificacionBajoStock = exports.notificacionCambioPrecioProducto = exports.notificacionProductosPorCaducarse = exports.agregarTokenFirebase = exports.enviarNotificacion = void 0;
const firebase_1 = __importDefault(require("../models/firebase"));
const sequelize_1 = require("sequelize");
const operaciones_fechas_1 = require("../helpers/operaciones-fechas");
const producto_1 = __importDefault(require("../models/producto"));
const kardexExistencia_1 = __importDefault(require("../models/kardexExistencia"));
const enviarNotificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = require("firebase-admin");
    const listaConsulta = yield firebase_1.default.findAll({
        where: {
            estado: true,
        },
        attributes: ["token"],
    });
    const listaDispositivos = [];
    listaConsulta.forEach((value) => {
        //@ts-ignore
        listaDispositivos.push(value["token"]);
    });
    const message = {
        data: {
            texto: "Una notificación de prueba desde NodeJs",
        },
        tokens: listaDispositivos,
    };
    admin
        .messaging()
        .sendMulticast(message)
        .then((respuesta) => {
        res.json({
            msg: "Notificación con Exito",
            respuesta,
        });
    })
        .catch((err) => {
        res.status(400).json({
            msg: "Error en el proceso",
            err,
        });
    });
});
exports.enviarNotificacion = enviarNotificacion;
const agregarTokenFirebase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const buscarToken = yield firebase_1.default.findOne({
        where: {
            token: token,
        },
    });
    if (buscarToken) {
        return res.json({
            msg: "Ya existe el token",
        });
    }
    const nuevoToken = {
        token: token,
    };
    const firebase = yield firebase_1.default.build(nuevoToken);
    firebase.save();
    res.json({
        msg: "Se agrego el token del dispositivo",
        token,
    });
});
exports.agregarTokenFirebase = agregarTokenFirebase;
//Notificacion de productos por caducarse
const notificacionProductosPorCaducarse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = require("firebase-admin");
    const listaConsulta = yield firebase_1.default.findAll({
        where: {
            estado: true,
        },
        attributes: ["token"],
    });
    const listaDispositivos = [];
    listaConsulta.forEach((value) => {
        //@ts-ignore
        listaDispositivos.push(value["token"]);
    });
    const listaProductosPorCaducarse = yield operaciones_fechas_1.productosPorCaducarse();
    let bandera = true;
    listaProductosPorCaducarse.forEach((value) => {
        //@ts-ignore
        const message = {
            data: {
                texto: `El producto: ${value["Producto"]["nombre"]} tiene riesgo de expiración, se caduca el ${value["fechaCaducidad"]}`,
                //Aqui se puede poner rutas, imagenes, o cualquier agregado de la notificación
            },
            tokens: listaDispositivos,
        };
        admin
            .messaging()
            .sendMulticast(message)
            .then((respuesta) => {
            bandera = true;
        })
            .catch((err) => {
            bandera = false;
        });
    });
    if (bandera) {
        res.json({
            ok: bandera,
            msg: "Ha salido todo a la perfección, se enviaron todas las notificaciones",
        });
    }
    else {
        res.status(400).json({
            ok: bandera,
            msg: "Ha sido un desastre, al menos una notificación no se envío",
        });
    }
});
exports.notificacionProductosPorCaducarse = notificacionProductosPorCaducarse;
//Notificación de cambio de precio de producto
const notificacionCambioPrecioProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productoId } = req.body;
    const productoBuscado = yield producto_1.default.findByPk(productoId);
    if (!productoBuscado) {
        res.status(400).json({
            ok: false,
            msg: "No hay producto, error en el productoId",
        });
    }
    const admin = require("firebase-admin");
    const listaConsulta = yield firebase_1.default.findAll({
        where: {
            estado: true,
        },
        attributes: ["token"],
    });
    const listaDispositivos = [];
    listaConsulta.forEach((value) => {
        //@ts-ignore
        listaDispositivos.push(value["token"]);
    });
    let bandera = true;
    const message = {
        data: {
            //@ts-ignore
            texto: `El producto ${productoBuscado["nombre"]} ha sido actualizado, el precio de venta es: ${productoBuscado["precioVenta"]}`,
        },
        tokens: listaDispositivos,
    };
    admin
        .messaging()
        .sendMulticast(message)
        .then((resp) => {
        console.log(`Éxito: ${resp}`);
        bandera = true;
    })
        .catch((err) => {
        console.log(`Fail: ${err}`);
        bandera = false;
    });
    if (!bandera) {
        res.status(400).json({
            ok: bandera,
            msg: "Hubo un error en el envío de la notificación",
        });
    }
    else {
        res.json({
            ok: bandera,
            msg: "Se envío con éxito la notificación",
        });
    }
});
exports.notificacionCambioPrecioProducto = notificacionCambioPrecioProducto;
//Notificación de productos con bajo stock
const notificacionBajoStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaProductos = yield kardexExistencia_1.default.findAll({
        where: {
            cantidad: {
                [sequelize_1.Op.lte]: 6,
            },
        },
        include: {
            model: producto_1.default
        },
        order: [["cantidad", "DESC"]],
    });
    if (!listaProductos) {
        res.status(400).json({
            ok: false,
            msg: "No hay productos con bajo stock, de hecho eso es algo bueno",
        });
    }
    const admin = require("firebase-admin");
    const listaConsulta = yield firebase_1.default.findAll({
        where: {
            estado: true,
        },
        attributes: ["token"],
    });
    const listaDispositivos = [];
    listaConsulta.forEach((value) => {
        //@ts-ignore
        listaDispositivos.push(value["token"]);
    });
    let bandera = true;
    listaProductos.forEach((value) => {
        //@ts-ignore
        const message = {
            data: {
                texto: `El producto: ${value["Producto"]["nombre"]} tiene bajo stock, con ${value["cantidad"]} existencias`,
            },
            tokens: listaDispositivos,
        };
        admin
            .messaging()
            .sendMulticast(message)
            .then((respuesta) => {
            bandera = true;
        })
            .catch((err) => {
            bandera = false;
        });
    });
    if (!bandera) {
        res.status(400).json({
            ok: bandera,
            msg: "Hubo un error en el envío de la notificación",
        });
    }
    else {
        res.json({
            ok: bandera,
            msg: "Se envío con éxito la notificación",
        });
    }
});
exports.notificacionBajoStock = notificacionBajoStock;
//# sourceMappingURL=notificaciones.js.map