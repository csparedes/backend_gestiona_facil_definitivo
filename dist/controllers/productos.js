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
exports.deleteProducto = exports.putProducto = exports.postProducto = exports.getProductosPorCategoria = exports.getProductoPorNombre = exports.getProductoPorCodigo = exports.getProducto = exports.getProductos = void 0;
require('../models/asociasiones');
const sequelize_1 = require("sequelize");
const producto_1 = __importDefault(require("../models/producto"));
const categoria_1 = __importDefault(require("../models/categoria"));
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield producto_1.default.findAll({
        where: {
            estado: true
        },
        attributes: ['id', 'nombre', 'precioVenta', 'codigo'],
        include: {
            model: categoria_1.default,
            attributes: ['id', 'nombre']
        }
    });
    if (!productos) {
        return res.status(400).json({
            msg: "No hay productos"
        });
    }
    res.json({
        msg: "Lista de productos",
        productos
    });
});
exports.getProductos = getProductos;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id, {
        attributes: ['nombre', 'precioVenta', 'codigo']
    });
    if (!producto) {
        return res.status(400).json({
            msg: "No hay producto"
        });
    }
    res.json({
        msg: "Se ha encontrado el producto",
        producto
    });
});
exports.getProducto = getProducto;
const getProductoPorCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const producto = yield producto_1.default.findOne({
        where: { codigo },
        attributes: ['nombre', 'precioVenta', 'codigo'],
        include: categoria_1.default
    });
    if (!producto) {
        return res.status(400).json({
            msg: "No hay producto"
        });
    }
    res.json({
        msg: "Se ha encontrado el producto por código",
        producto
    });
});
exports.getProductoPorCodigo = getProductoPorCodigo;
const getProductoPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const productos = yield producto_1.default.findAll({
        where: {
            nombre: {
                [sequelize_1.Op.like]: `%${nombre}%`
            }
        },
        attributes: ['nombre', 'precioVenta', 'codigo'],
        include: categoria_1.default
    });
    if (!productos) {
        return res.status(400).json({
            msg: "No hay producto"
        });
    }
    res.json({
        msg: "Se ha encontrado el producto por código",
        productos
    });
});
exports.getProductoPorNombre = getProductoPorNombre;
const getProductosPorCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoriaId } = req.params;
    const productos = yield producto_1.default.findAll({
        where: {
            categoriumId: categoriaId,
            estado: true
        }
    });
    if (!productos) {
        return res.status(400).json({
            msg: "No hay productos"
        });
    }
    res.json({
        msg: "Lista de productos por categoría",
        productos
    });
});
exports.getProductosPorCategoria = getProductosPorCategoria;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, categoriumId, codigo, precioVenta } = req.body;
    const productoCodigo = yield producto_1.default.findOne({
        where: { codigo }
    });
    if (productoCodigo) {
        return res.status(401).json({
            msg: "El producto ya existe"
        });
    }
    const productoNuevo = {
        nombre,
        categoriumId,
        codigo,
        precioVenta,
        estado: true
    };
    const producto = yield producto_1.default.build(productoNuevo);
    producto.save();
    res.json({
        msg: "Se ha creado un nuevo producto",
        producto
    });
});
exports.postProducto = postProducto;
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const productoBuscado = yield producto_1.default.findOne({
        where: {
            codigo
        }
    });
    if (!productoBuscado) {
        return res.status(400).json({
            msg: "El producto no existe en el inventario"
        });
    }
    const { nombre, categoriumId, precioVenta } = req.body;
    const productoNuevo = {
        nombre,
        categoriumId,
        codigo,
        precioVenta,
        estado: true
    };
    yield productoBuscado.update(productoNuevo);
    res.json({
        msg: "Se ha actualizado un producto",
        producto: productoBuscado
    });
});
exports.putProducto = putProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo } = req.params;
    const productoBuscado = yield producto_1.default.findOne({
        where: {
            codigo
        }
    });
    if (!productoBuscado) {
        return res.status(400).json({
            msg: "El producto no existe en el inventario"
        });
    }
    yield productoBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el producto"
    });
});
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=productos.js.map