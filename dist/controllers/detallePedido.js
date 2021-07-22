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
exports.deleteDetallePedido = exports.putDetallePedido = exports.postDetallePedido = exports.getDetallesPedidoLike = exports.getDetallePedido = exports.getDetallesPedidos = void 0;
const sequelize_1 = require("sequelize");
const detallePedido_1 = __importDefault(require("../models/detallePedido"));
const getDetallesPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalles = yield detallePedido_1.default.findAll({ where: { estado: true } });
    if (!detalles) {
        return res.status(400).json({
            msg: "No existen Detalles de Compras"
        });
    }
    res.json({
        msg: "Lista de encabezados de compra",
        detalles
    });
});
exports.getDetallesPedidos = getDetallesPedidos;
const getDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const detalle = yield detallePedido_1.default.findOne({ where: { comprobante } });
    if (!detalle) {
        return res.status(400).json({
            msg: "No existe aquel Detalle de Pedido"
        });
    }
    res.json({
        msg: "Detalle de pedido encontrado",
        detalle
    });
});
exports.getDetallePedido = getDetallePedido;
const getDetallesPedidoLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params;
    const detalles = yield detallePedido_1.default.findOne({ where: { comprobante: { [sequelize_1.Op.like]: query } } });
    if (!detalles) {
        return res.status(400).json({
            msg: "No existe aquel Detalle de Pedido"
        });
    }
    res.json({
        msg: "Detalle de pedido encontrado",
        detalles
    });
});
exports.getDetallesPedidoLike = getDetallesPedidoLike;
const postDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante, cantidad, producto, valorUnitario } = req.body;
    const detalleCompraBuscado = yield detallePedido_1.default.findOne({ where: { comprobante } });
    if (detalleCompraBuscado) {
        return res.status(400).json({
            msg: "Ya existe el detalle de pedido: " + comprobante
        });
    }
    const nuevoDetalle = {
        comprobante, cantidad, producto, valorUnitario, estado: true
    };
    const detalle = yield detallePedido_1.default.build(nuevoDetalle);
    detalle.save();
    res.json({
        msg: "se ha creado un nuevo detalle de compra",
        detalle
    });
});
exports.postDetallePedido = postDetallePedido;
const putDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const detallePedidoBuscado = yield detallePedido_1.default.findOne({ where: { comprobante } });
    if (!detallePedidoBuscado) {
        return res.status(400).json({
            msg: "No existe el detalle de pedido: " + comprobante
        });
    }
    const { cantidad, producto, valorUnitario } = req.body;
    const nuevoDetalle = {
        comprobante, cantidad, producto, valorUnitario, estado: true
    };
    yield detallePedidoBuscado.update(nuevoDetalle);
    res.json({
        msg: "se ha actualizado el detalle de pedido",
        detalle: detallePedidoBuscado
    });
});
exports.putDetallePedido = putDetallePedido;
const deleteDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const detallePedidoBuscado = yield detallePedido_1.default.findOne({ where: { comprobante } });
    if (!detallePedidoBuscado) {
        return res.status(400).json({
            msg: "No existe el detalle de compra: " + comprobante
        });
    }
    yield detallePedidoBuscado.update({ estado: false });
    res.json({
        msg: "se ha eliminado el detalle de compra",
        detalle: detallePedidoBuscado
    });
});
exports.deleteDetallePedido = deleteDetallePedido;
//# sourceMappingURL=detallePedido.js.map