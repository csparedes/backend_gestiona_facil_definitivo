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
exports.postSalidaPutExistenciaVenta = exports.postIngresoPutExistenciaCompra = exports.getExistenciaPorCodigoProducto = exports.getKardexExistencias = exports.getKardexSalidas = exports.getKardexIngresos = void 0;
const sequelize_1 = require("sequelize");
const kardexExistencia_1 = __importDefault(require("../models/kardexExistencia"));
const kardexIngreso_1 = __importDefault(require("../models/kardexIngreso"));
const kardexSalida_1 = __importDefault(require("../models/kardexSalida"));
const producto_1 = __importDefault(require("../models/producto"));
const getKardexIngresos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kardex = yield kardexIngreso_1.default.findAll({
        where: { estado: true },
        include: {
            model: producto_1.default,
            attributes: ["id", "nombre", "precioVenta", "codigo"],
        },
        attributes: ["fecha", "cantidad", "valorUnitario"],
    });
    res.json({
        msg: "Lista de Ingresos",
        kardex,
    });
});
exports.getKardexIngresos = getKardexIngresos;
const getKardexSalidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kardex = yield kardexSalida_1.default.findAll({
        where: { estado: true },
        include: {
            model: producto_1.default,
            attributes: ["id", "nombre", "precioVenta", "codigo"],
        },
        attributes: ["fecha", "cantidad", "valorUnitario"],
    });
    res.json({
        msg: "Lista de Salidas",
        kardex,
    });
});
exports.getKardexSalidas = getKardexSalidas;
const getKardexExistencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kardex = yield kardexExistencia_1.default.findAll({
        where: { estado: true },
        include: {
            model: producto_1.default,
            attributes: ["id", "nombre", "precioVenta", "codigo"],
        },
        attributes: ["fechaCaducidad", "valorIngreso", "cantidad"],
    });
    res.json({
        msg: "Lista de Existencias",
        kardex,
    });
});
exports.getKardexExistencias = getKardexExistencias;
const getExistenciaPorCodigoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    //buscamos el producto según el código
    const producto = yield producto_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [{ estado: true }, { codigo }],
        },
    });
    //comprobamos si no existe el producto
    if (!producto) {
        return res.status(400).json({
            msg: "No existe el producto",
        });
    }
    //Si hay producto, le buscamos en las existencias
    const kardex = yield kardexExistencia_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { estado: true },
                //@ts-ignore
                { producto: producto.id },
            ],
        },
    });
    //Verificamos si existe en las existencias
    if (!kardex) {
        return res.status(400).json({
            msg: "El producto existe, pero no hay en existencias",
        });
    }
    res.json({
        msg: "Existencia del producto",
        producto,
        kardex,
    });
});
exports.getExistenciaPorCodigoProducto = getExistenciaPorCodigoProducto;
const postIngresoPutExistenciaCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscamos el producto
    const { fechaCaducidad, cantidad, valorUnitario, codigo } = req.body;
    const productoBuscado = yield producto_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [{ estado: true }, { codigo }],
        },
    });
    if (!productoBuscado) {
        return res.status(400).json({
            msg: "El producto no existe",
        });
    }
    //Hacemos el ingreso
    const ingresoNuevo = {
        //@ts-ignore
        producto: productoBuscado.id,
        cantidad,
        valorUnitario,
    };
    const ingreso = yield kardexIngreso_1.default.build(ingresoNuevo);
    ingreso.save();
    const exis = yield kardexExistencia_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { estado: true },
                //@ts-ignore
                { producto: productoBuscado.id },
                { valorIngreso: valorUnitario },
                { fechaCaducidad },
            ],
        },
    });
    if (!exis) {
        //Si no existe, lo creamos
        const nuevaExistencia = yield kardexExistencia_1.default.build({
            //@ts-ignore
            producto: productoBuscado.id,
            fechaCaducidad,
            cantidad,
            valorIngreso: valorUnitario,
        });
        nuevaExistencia.save();
        return res.json({
            msg: "Nueva existencia",
            kardex: nuevaExistencia,
        });
    }
    //Si existe, lo actualizamos (Compra)
    //@ts-ignore
    let cant = exis.cantidad + parseFloat(cantidad);
    exis.update({ cantidad: cant });
    res.json({
        msg: "Existencia actualizada",
        kardex: exis,
    });
});
exports.postIngresoPutExistenciaCompra = postIngresoPutExistenciaCompra;
const postSalidaPutExistenciaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscamos el producto
    const { codigo, cantidad } = req.params;
    const productoBuscado = yield producto_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [{ estado: true }, { codigo }],
        },
    });
    if (!productoBuscado) {
        return res.status(400).json({
            msg: "El producto no existe",
        });
    }
    //Hacemos la salida
    const salidaNueva = {
        //@ts-ignore
        producto: productoBuscado.id,
        cantidad,
    };
    const salida = yield kardexSalida_1.default.build(salidaNueva);
    salida.save();
    const exis = yield kardexExistencia_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { estado: true },
                //@ts-ignore
                { producto: productoBuscado.id },
            ],
        },
    });
    //Si y solo si existe, lo actualizamos (Venta)
    //@ts-ignore
    let cant = exis.cantidad - parseFloat(cantidad);
    if (cant <= 0) {
        return res.status(403).json({
            //Caso contrario indica que no hay stock para vender
            msg: "No hay la cantidad disponible en el inventario",
            kardex: exis,
        });
    }
    exis.update({ cantidad: cant });
    res.json({
        msg: "Existencia actualizada",
        kardex: exis,
    });
});
exports.postSalidaPutExistenciaVenta = postSalidaPutExistenciaVenta;
//# sourceMappingURL=kardex.js.map