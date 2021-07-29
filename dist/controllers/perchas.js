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
exports.deleteEnlaceCajaProducto = exports.putCrearEnlaceCajaProducto = exports.postCrearEnlaceCajaProducto = exports.getPerchas = void 0;
const perchas_1 = __importDefault(require("../models/perchas"));
const getPerchas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const perchas = yield perchas_1.default.findAll({
        where: {
            estado: true
        }
    });
    if (!perchas) {
        return res.status(400).json({
            msg: "No hay productos relacionados"
        });
    }
    res.json({
        msg: "Lista de productos relacionados",
        perchas
    });
});
exports.getPerchas = getPerchas;
const postCrearEnlaceCajaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cajaId, articuloId } = req.body;
    const nuevo = {
        cajaId,
        articuloId
    };
    const nuevoEnlace = yield perchas_1.default.build(nuevo);
    nuevoEnlace.save();
    res.json({
        msg: "Nuevo enlace creado"
    });
});
exports.postCrearEnlaceCajaProducto = postCrearEnlaceCajaProducto;
const putCrearEnlaceCajaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perchaBuscada = yield perchas_1.default.findByPk(id);
    if (!perchaBuscada) {
        return res.status(400).json({
            msg: "No se encontró el enlace de los productos"
        });
    }
    const { cajaId, articuloId } = req.body;
    const nuevo = {
        cajaId,
        articuloId
    };
    perchaBuscada.update(nuevo);
    res.json({
        msg: "Se ha actualizado el enlace del producto"
    });
});
exports.putCrearEnlaceCajaProducto = putCrearEnlaceCajaProducto;
const deleteEnlaceCajaProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perchaBuscada = yield perchas_1.default.findByPk(id);
    if (!perchaBuscada) {
        return res.status(400).json({
            msg: "No se encontró el enlace de los productos"
        });
    }
    perchaBuscada.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el enlace del producto"
    });
});
exports.deleteEnlaceCajaProducto = deleteEnlaceCajaProducto;
//# sourceMappingURL=perchas.js.map