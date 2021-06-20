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
exports.deleteDetalleVenta = exports.putDetalleVenta = exports.postDetalleVenta = exports.getDetalleVentaPorComprobante = exports.getDetallesVentas = void 0;
const detalleVenta_1 = __importDefault(require("../models/detalleVenta"));
const getDetallesVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalles = yield detalleVenta_1.default.findAll({
        where: {
            estado: true
        }
    });
    if (!detalles) {
        return res.status(400).json({
            msg: "No hay detalles de venta"
        });
    }
    res.json({
        msg: "Lista de Detalles de Venta",
        detalles
    });
});
exports.getDetallesVentas = getDetallesVentas;
const getDetalleVentaPorComprobante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const detalles = yield detalleVenta_1.default.findAll({
        where: {
            comprobante,
            estado: true
        }
    });
    if (!detalles) {
        return res.status(400).json({
            msg: "El detalle de venta no existe"
        });
    }
    res.json({
        msg: "Detalle de Venta N°: " + comprobante,
        detalles
    });
});
exports.getDetalleVentaPorComprobante = getDetalleVentaPorComprobante;
const postDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante, cantidad, producto, valorUnitario } = req.body;
    const nuevoDetalle = {
        comprobante,
        cantidad,
        producto,
        valorUnitario,
        estado: true
    };
    const detalle = yield detalleVenta_1.default.build(nuevoDetalle);
    detalle.save();
    res.json({
        msg: "Se ha creado un nuevo producto",
        detalle
    });
});
exports.postDetalleVenta = postDetalleVenta;
const putDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const { cantidad, producto, valorUnitario } = req.body;
    const detalleBuscado = yield detalleVenta_1.default.findOne({
        where: {
            comprobante,
            estado: true
        }
    });
    if (!detalleBuscado) {
        return res.status(400).json({
            msg: "El detalle de venta no existe"
        });
    }
    const nuevoDetalle = {
        comprobante,
        cantidad,
        producto,
        valorUnitario,
        estado: true
    };
    yield detalleBuscado.update(nuevoDetalle);
    res.json({
        msg: "Se ha actualizado el producto",
        detalle: detalleBuscado
    });
});
exports.putDetalleVenta = putDetalleVenta;
const deleteDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const detalleBuscado = yield detalleVenta_1.default.findOne({
        where: {
            comprobante,
            estado: true
        }
    });
    if (!detalleBuscado) {
        return res.status(400).json({
            msg: "El detalle de venta no existe"
        });
    }
    yield detalleBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el producto",
        detalle: detalleBuscado
    });
});
exports.deleteDetalleVenta = deleteDetalleVenta;
//# sourceMappingURL=detalleVenta.js.map