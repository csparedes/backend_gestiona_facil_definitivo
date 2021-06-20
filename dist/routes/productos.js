"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../controllers/productos");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], productos_1.getProductos);
router.get("/:id", [validar_jwt_1.default, validar_campos_1.default], productos_1.getProducto);
router.get("/codigo/:codigo", [validar_jwt_1.default, validar_campos_1.default], productos_1.getProductoPorCodigo);
router.get("/nombre/:nombre", [validar_jwt_1.default, validar_campos_1.default], productos_1.getProductoPorNombre);
router.get("/categoria/:categoria", [validar_jwt_1.default, validar_campos_1.default], productos_1.getProductosPorCategoria);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], productos_1.postProducto);
router.put("/:codigo", [validar_jwt_1.default, validar_campos_1.default], productos_1.putProducto);
router.delete("/:codigo", [validar_jwt_1.default, validar_campos_1.default], productos_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map