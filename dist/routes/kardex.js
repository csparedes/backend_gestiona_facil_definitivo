"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kardex_1 = require("../controllers/kardex");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/ingresos", [validar_jwt_1.default, validar_campos_1.default], kardex_1.getKardexIngresos);
router.get("/salidas", [validar_jwt_1.default, validar_campos_1.default], kardex_1.getKardexSalidas);
router.get("/existencias", [validar_jwt_1.default, validar_campos_1.default], kardex_1.getKardexExistencias);
router.get("/existencias/:codigo", [validar_jwt_1.default, validar_campos_1.default], kardex_1.getExistenciaPorCodigoProducto);
router.post("/ingresos", [validar_jwt_1.default, validar_campos_1.default], kardex_1.postIngresoPutExistenciaCompra);
router.post("/salidas/:codigo/:cantidad", [validar_jwt_1.default, validar_campos_1.default], kardex_1.postSalidaPutExistenciaVenta);
exports.default = router;
//# sourceMappingURL=kardex.js.map