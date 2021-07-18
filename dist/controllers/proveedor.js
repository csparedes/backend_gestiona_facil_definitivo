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
exports.deleteProveedor = exports.putProveedor = exports.postProveedor = exports.getProveedoresPorNombre = exports.getProveedores = void 0;
const sequelize_1 = require("sequelize");
const proveedor_1 = __importDefault(require("../models/proveedor"));
const getProveedores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const proveedores = yield proveedor_1.default.findAll({ where: { estado: true } });
    if (!proveedores) {
        return res.status(400).json({
            msg: "No se encontró ningún proveedor",
        });
    }
    res.json({
        msg: "Lista de proveedores",
        proveedores,
    });
});
exports.getProveedores = getProveedores;
const getProveedoresPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const proveedores = yield proveedor_1.default.findAll({
        where: {
            nombre: {
                [sequelize_1.Op.like]: `%${nombre}%`,
            },
            estado: true,
        },
        order: [["nombre", "ASC"]],
    });
    if (!proveedores) {
        return res.status(400).json({
            msg: "No se encontró ningún proveedor",
        });
    }
    res.json({
        msg: "Proveedores encontrado",
        proveedores,
    });
});
exports.getProveedoresPorNombre = getProveedoresPorNombre;
const postProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, identificacion, domicilio, email } = req.body;
    const nuevoProveedor = {
        nombre,
        identificacion,
        domicilio,
        email,
        estado: true,
    };
    const proveedor = yield proveedor_1.default.build(nuevoProveedor);
    proveedor.save();
    res.json({
        msg: "Se ha creado un nuevo proveedor",
        proveedor,
    });
});
exports.postProveedor = postProveedor;
const putProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificacion } = req.params;
    const proveedorBuscado = yield proveedor_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [{ estado: true }, { identificacion }],
        },
    });
    if (!proveedorBuscado) {
        return res.status(400).json({
            msg: "No existe el proveedor",
        });
    }
    const { nombre, domicilio, email } = req.body;
    const nuevoProveedor = {
        nombre,
        identificacion,
        domicilio,
        email,
        estado: true,
    };
    yield proveedorBuscado.update(nuevoProveedor);
    res.json({
        msg: "Se ha actualizado el proveedor",
        proveedor: proveedorBuscado,
    });
});
exports.putProveedor = putProveedor;
const deleteProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identificacion } = req.params;
    const proveedorBuscado = yield proveedor_1.default.findOne({
        where: {
            [sequelize_1.Op.and]: [{ estado: true }, { identificacion }],
        },
    });
    if (!proveedorBuscado) {
        return res.status(400).json({
            msg: "No existe el proveedor",
        });
    }
    yield proveedorBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el proveedor",
    });
});
exports.deleteProveedor = deleteProveedor;
//# sourceMappingURL=proveedor.js.map