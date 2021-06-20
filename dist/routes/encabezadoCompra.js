"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encabezadoCompra_1 = require("../controllers/encabezadoCompra");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], encabezadoCompra_1.getEncabezadosCompra);
router.get("/:query", [validar_jwt_1.default, validar_campos_1.default], encabezadoCompra_1.getEncabezadoPorQuery);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], encabezadoCompra_1.postEncabezadoCompra);
router.put("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], encabezadoCompra_1.putEncabezadoCompra);
router.delete("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], encabezadoCompra_1.deleteEncabezadoCompra);
exports.default = router;
//# sourceMappingURL=encabezadoCompra.js.map