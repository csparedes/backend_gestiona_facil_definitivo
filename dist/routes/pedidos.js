"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listaPedidos_1 = require("../controllers/listaPedidos");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], listaPedidos_1.getMostrarPedidos);
router.get("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], listaPedidos_1.getArticulosPedido);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], listaPedidos_1.postListaProductosNotaPedido);
exports.default = router;
//# sourceMappingURL=pedidos.js.map