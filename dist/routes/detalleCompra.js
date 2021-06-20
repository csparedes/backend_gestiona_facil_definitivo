"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleCompra_1 = require("../controllers/detalleCompra");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], detalleCompra_1.getDetallesCompras);
router.get("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], detalleCompra_1.getDetalleCompra);
router.get("/:query", [validar_jwt_1.default, validar_campos_1.default], detalleCompra_1.getDetallesCompraLike);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], detalleCompra_1.postDetalleCompra);
router.put("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], detalleCompra_1.putDetalleCompra);
router.delete("/:comprobante", [validar_jwt_1.default, validar_campos_1.default], detalleCompra_1.deleteDetalleCompra);
exports.default = router;
//# sourceMappingURL=detalleCompra.js.map