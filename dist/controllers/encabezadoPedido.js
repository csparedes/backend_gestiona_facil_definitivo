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
exports.getObtenerUltimoComprobante = exports.deleteEncabezadoPedido = exports.putEncabezadoPedido = exports.postEncabezadoPedido = exports.getEncabezadoPedidoPorQuery = exports.getEncabezadosPedido = void 0;
const sequelize_1 = require("sequelize");
const encabezadoPedido_1 = __importDefault(require("../models/encabezadoPedido"));
const proveedor_1 = __importDefault(require("../models/proveedor"));
const getEncabezadosPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const encabezados = yield encabezadoPedido_1.default.findAll({
        where: { estado: true },
        include: proveedor_1.default
    });
    if (!encabezados) {
        return res.status(400).json({
            msg: "No se han encontrado ningún encabezado de pedido",
        });
    }
    res.json({
        msg: "Lista de encabezados de pedido",
        encabezados,
    });
});
exports.getEncabezadosPedido = getEncabezadosPedido;
const getEncabezadoPedidoPorQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    const encabezados = yield encabezadoPedido_1.default.findAll({
        where: {
            [sequelize_1.Op.and]: [
                { estado: true },
                { comprobante: { [sequelize_1.Op.like]: `%${query}%` } },
            ],
        },
    });
    if (!encabezados) {
        return res.status(400).json({
            msg: "No se encontro ningún encabezado",
        });
    }
    res.json({
        msg: "Lista de encabezados",
        encabezados,
    });
});
exports.getEncabezadoPedidoPorQuery = getEncabezadoPedidoPorQuery;
const postEncabezadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante, proveedoreId, fechaPedido, totalPedido, comentario } = req.body;
    const encabezadoBuscado = yield encabezadoPedido_1.default.findOne({
        where: {
            comprobante,
        },
    });
    if (encabezadoBuscado) {
        return res.status(400).json({
            msg: "Ya existe ese comprobante",
        });
    }
    const nuevoEncabezado = {
        comprobante,
        proveedoreId,
        fechaPedido,
        totalPedido,
        comentario,
        estado: true,
    };
    const encabezado = yield encabezadoPedido_1.default.build(nuevoEncabezado);
    encabezado.save();
    res.json({
        msg: "Se ha creado un nuevo encabezado de Pedido",
        encabezado,
    });
});
exports.postEncabezadoPedido = postEncabezadoPedido;
const putEncabezadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const encabezadoBuscado = yield encabezadoPedido_1.default.findOne({
        where: {
            comprobante,
        },
    });
    if (!encabezadoBuscado) {
        return res.status(400).json({
            msg: "No existe ese comprobante",
        });
    }
    const { proveedorId, fechaPedido, totalPedido, comentario } = req.body;
    const nuevoEncabezado = {
        comprobante,
        proveedorId,
        fechaPedido,
        totalPedido,
        comentario,
        estado: true,
    };
    yield encabezadoBuscado.update(nuevoEncabezado);
    res.json({
        msg: "Se ha actualizado el encabezado de pedido",
        encabezado: encabezadoBuscado,
    });
});
exports.putEncabezadoPedido = putEncabezadoPedido;
const deleteEncabezadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const encabezadoBuscado = yield encabezadoPedido_1.default.findOne({
        where: {
            comprobante,
        },
    });
    if (!encabezadoBuscado) {
        return res.status(400).json({
            msg: "No existe ese comprobante",
        });
    }
    yield encabezadoBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el encabezado de pedido",
    });
});
exports.deleteEncabezadoPedido = deleteEncabezadoPedido;
const getObtenerUltimoComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buscarEncabezado = yield encabezadoPedido_1.default.findOne({
        attributes: [[sequelize_1.Sequelize.fn('max', sequelize_1.Sequelize.col('comprobante')), 'ultimoComprobante']],
    });
    if (!buscarEncabezado) {
        return res.status(400).json({
            ok: false,
            msg: 'Ha ocurrido un grave error al consultar comprobante de pedido'
        });
    }
    res.json({
        comprobante: buscarEncabezado
    });
});
exports.getObtenerUltimoComprobante = getObtenerUltimoComprobante;
//# sourceMappingURL=encabezadoPedido.js.map