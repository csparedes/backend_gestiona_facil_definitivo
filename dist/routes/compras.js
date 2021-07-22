"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listaCompras_1 = require("../controllers/listaCompras");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.post('/', [
    validar_jwt_1.default,
    validar_campos_1.default
], listaCompras_1.postListaProductosFacturaCompra);
exports.default = router;
//# sourceMappingURL=compras.js.map