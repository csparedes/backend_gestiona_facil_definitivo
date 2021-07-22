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
exports.deleteCliente = exports.putCliente = exports.postCliente = exports.getClientesPorIdentificacion = exports.getClientes = void 0;
const sequelize_1 = require("sequelize");
const cliente_1 = __importDefault(require("../models/cliente"));
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield cliente_1.default.findAll({
        where: {
            estado: true,
        },
        offset: 3
    });
    if (!clientes) {
        return res.status(400).json({
            msg: "No hay clientes disponibles",
        });
    }
    res.json({
        msg: "Lista de Clientes",
        clientes,
    });
});
exports.getClientes = getClientes;
const getClientesPorIdentificacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificacion } = req.params;
    const clientes = yield cliente_1.default.findAll({
        where: {
            identificacion: {
                [sequelize_1.Op.like]: `%${identificacion}%`,
            },
            estado: true,
        },
        order: [["createdAt", "DESC"]],
    });
    if (!clientes) {
        return res.status(400).json({
            msg: "No hay cliente disponible",
        });
    }
    res.json({
        msg: "Lista de Clientes",
        clientes,
    });
});
exports.getClientesPorIdentificacion = getClientesPorIdentificacion;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, identificacion, domicilio, email } = req.body;
    const clienteBuscado = yield cliente_1.default.findOne({
        where: {
            identificacion,
            estado: true,
        },
    });
    if (clienteBuscado) {
        return res.status(400).json({
            msg: "Ese cliente ya existe",
        });
    }
    const nuevoCliente = {
        nombre,
        identificacion,
        domicilio,
        email,
        estado: true,
    };
    const cliente = yield cliente_1.default.build(nuevoCliente);
    cliente.save();
    res.json({
        msg: "Se ha creado un nuevo Cliente",
        cliente,
    });
});
exports.postCliente = postCliente;
const putCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificacion } = req.params;
    const clienteActual = yield cliente_1.default.findOne({
        where: { identificacion, estado: true },
    });
    if (!clienteActual) {
        return res.status(401).json({
            msg: "No existe el cliente con la identificación: " + identificacion,
        });
    }
    const { nombre, domicilio, email } = req.body;
    const clienteNuevo = {
        nombre,
        identificacion,
        domicilio,
        email,
        estado: true,
    };
    yield clienteActual.update(clienteNuevo);
    res.json({
        msg: "Se ha actualizado el cliente",
        cliente: clienteActual,
    });
});
exports.putCliente = putCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificacion } = req.params;
    const clienteActual = yield cliente_1.default.findOne({
        where: { identificacion, estado: true },
    });
    if (!clienteActual) {
        return res.status(401).json({
            msg: "No existe el cliente con la identificación: " + identificacion,
        });
    }
    yield clienteActual.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el cliente",
        cliente: clienteActual,
    });
});
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=cliente.js.map