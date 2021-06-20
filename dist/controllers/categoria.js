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
exports.deleteCategoria = exports.putCategoria = exports.postCategoria = exports.getCategoria = exports.getCategorias = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield categoria_1.default.findAll({
        where: {
            estado: true,
        },
        attributes: ["nombre", "descripcion"],
    });
    if (!categorias) {
        return res.status(401).json({
            msg: "No se ha encontrado ninguna categoria",
        });
    }
    res.json({
        msg: "Lista de categorias",
        categorias,
    });
});
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    res.json({
        msg: "Se ha encontrado la categoría",
        categoria,
    });
});
exports.getCategoria = getCategoria;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion } = req.body;
    const categoriaNueva = {
        nombre,
        descripcion,
        estado: true,
    };
    const categoria = yield categoria_1.default.build(categoriaNueva);
    categoria.save();
    res.json({
        msg: "Se ha creado una nueva categoria",
        categoria,
    });
});
exports.postCategoria = postCategoria;
const putCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoriaActual = yield categoria_1.default.findByPk(id);
    if (!categoriaActual) {
        return res.status(401).json({
            msg: "La categoria no existe",
        });
    }
    const { nombre, descripcion } = req.body;
    const categoriaNueva = {
        nombre,
        descripcion,
        estado: true,
    };
    yield categoriaActual.update(categoriaNueva);
    res.json({
        msg: "Categoria Actualizada",
        categoriaActual,
    });
});
exports.putCategoria = putCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoriaActual = yield categoria_1.default.findByPk(id);
    if (!categoriaActual) {
        return res.status(401).json({
            msg: "La categoria no existe",
        });
    }
    yield categoriaActual.update({ estado: false });
    res.json({
        msg: "Categoria eliminada",
    });
});
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoria.js.map