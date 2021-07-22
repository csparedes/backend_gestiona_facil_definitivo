"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encabezadoPedido_1 = require("../controllers/encabezadoPedido");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], encabezadoPedido_1.getEncabezadosPedido);
router.get("/:query", [validar_jwt_1.default, validar_campos_1.default], encabezadoPedido_1.getEncabezadoPedidoPorQuery);
router.get("/consulta/ultimoEncabezado", [validar_jwt_1.default, validar_campos_1.default], encabezadoPedido_1.getObtenerUltimoComprobante);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], encabezadoPedido_1.postEncabezadoPedido);
router.put("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], encabezadoPedido_1.putEncabezadoPedido);
router.delete("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], encabezadoPedido_1.deleteEncabezadoPedido);
exports.default = router;
//# sourceMappingURL=encabezadoPedido.js.map