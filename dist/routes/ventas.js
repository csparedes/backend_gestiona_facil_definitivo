"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const listaVentas_1 = require("../controllers/test/listaVentas");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const validar_ventas_1 = require("../middlewares/validar-ventas");
const router = express_1.Router();
router.post("/", [
    validar_jwt_1.default,
    express_validator_1.check('comprobante').custom(validar_ventas_1.existeComprobante),
    validar_campos_1.default,
], listaVentas_1.postListaProductosFacturaVenta);
exports.default = router;
//# sourceMappingURL=ventas.js.map