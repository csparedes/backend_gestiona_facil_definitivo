"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleVenta_1 = require("../controllers/detalleVenta");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], detalleVenta_1.getDetallesVentas);
router.get("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], detalleVenta_1.getDetalleVentaPorComprobante);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], detalleVenta_1.postDetalleVenta);
router.put("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], detalleVenta_1.putDetalleVenta);
router.delete("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], detalleVenta_1.deleteDetalleVenta);
exports.default = router;
//# sourceMappingURL=detalleVenta.js.map