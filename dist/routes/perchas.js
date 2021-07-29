"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const perchas_1 = require("../controllers/perchas");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], perchas_1.getPerchas);
router.post("/", [validar_jwt_1.default, validar_campos_1.default], perchas_1.postCrearEnlaceCajaProducto);
router.put("/:id", [validar_jwt_1.default, validar_campos_1.default], perchas_1.putCrearEnlaceCajaProducto);
router.delete("/:id", [validar_jwt_1.default, validar_campos_1.default], perchas_1.deleteEnlaceCajaProducto);
exports.default = router;
//# sourceMappingURL=perchas.js.map