"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encabezadoVenta_1 = require("../controllers/encabezadoVenta");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], encabezadoVenta_1.getEncabezadosVentas);
router.get("/:query", [validar_jwt_1.default, validar_campos_1.default], encabezadoVenta_1.getEncabezadoPorQuery);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], encabezadoVenta_1.postEncabezadoVenta);
router.put("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], encabezadoVenta_1.putEncabezadoVenta);
router.delete("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], encabezadoVenta_1.deleteEncabezadoVenta);
exports.default = router;
//# sourceMappingURL=encabezadoVenta.js.map