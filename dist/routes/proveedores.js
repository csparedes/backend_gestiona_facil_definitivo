"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_1 = require("../controllers/proveedor");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], proveedor_1.getProveedores);
router.get("/:nombre", [validar_jwt_1.default, validar_campos_1.default], proveedor_1.getProveedorPorNombre);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], proveedor_1.postProveedor);
router.put("/:identificacion", [validar_jwt_1.default, validar_campos_1.default], proveedor_1.putProveedor);
router.delete("/:identificacion", [validar_jwt_1.default, validar_campos_1.default], proveedor_1.deleteProveedor);
exports.default = router;
//# sourceMappingURL=proveedores.js.map