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
exports.deleteEncabezadoVenta = exports.putEncabezadoVenta = exports.postEncabezadoVenta = exports.getEncabezadoPorQuery = exports.getEncabezadosVentas = void 0;
const encabezadoVenta_1 = __importDefault(require("../models/encabezadoVenta"));
const getEncabezadosVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const encabezados = yield encabezadoVenta_1.default.findAll({
        where: { estado: true },
    });
    if (!encabezados) {
        return res.status(400).json({
            msg: "No existe ningún encabezado de factura",
        });
    }
    res.json({
        msg: "Lista de Encabezados de Venta",
        encabezados,
    });
});
exports.getEncabezadosVentas = getEncabezadosVentas;
const getEncabezadoPorQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params;
    const encabezado = yield encabezadoVenta_1.default.findOne({
        where: {
            comprobante: query,
        },
    });
    if (!encabezado) {
        return res.status(400).json({
            msg: "No existe ningún encabezado de factura",
        });
    }
    res.json({
        msg: "Se ha encontrado en encabezado de venta",
        encabezado,
    });
});
exports.getEncabezadoPorQuery = getEncabezadoPorQuery;
const postEncabezadoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante, cliente, fechaVenta, totalVenta, comentario } = req.body;
    const buscarEncabezado = yield encabezadoVenta_1.default.findOne({
        where: { comprobante },
    });
    if (buscarEncabezado) {
        return res.status(400).json({
            msg: "El comprobante ya existe en la base de datos",
        });
    }
    const nuevoEncabezado = {
        comprobante,
        cliente,
        fechaVenta,
        totalVenta,
        comentario,
        estado: true,
    };
    const encabezado = yield encabezadoVenta_1.default.build(nuevoEncabezado);
    encabezado.save();
    res.json({
        msg: "Se ha creado un nuevo Encabezado",
        encabezado,
    });
});
exports.postEncabezadoVenta = postEncabezadoVenta;
const putEncabezadoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const buscarEncabezado = yield encabezadoVenta_1.default.findOne({
        where: { comprobante },
    });
    if (!buscarEncabezado) {
        return res.status(400).json({
            msg: "El comprobante no existe en la base de datos",
        });
    }
    const { cliente, fechaVenta, totalVenta, comentario } = req.body;
    yield buscarEncabezado.update({
        cliente,
        fechaVenta,
        totalVenta,
        comentario,
    });
    res.json({
        msg: "Se ha actualizado el Encabezado",
        encabezado: buscarEncabezado,
    });
});
exports.putEncabezadoVenta = putEncabezadoVenta;
const deleteEncabezadoVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comprobante } = req.params;
    const buscarEncabezado = yield encabezadoVenta_1.default.findOne({
        where: { comprobante },
    });
    if (!buscarEncabezado) {
        return res.status(400).json({
            msg: "El comprobante no existe en la base de datos",
        });
    }
    yield buscarEncabezado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el Encabezado",
        encabezado: buscarEncabezado,
    });
});
exports.deleteEncabezadoVenta = deleteEncabezadoVenta;
//# sourceMappingURL=encabezadoVenta.js.map