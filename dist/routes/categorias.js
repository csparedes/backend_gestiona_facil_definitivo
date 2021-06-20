"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoria_1 = require("../controllers/categoria");
const database_validators_1 = require("../helpers/database-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], categoria_1.getCategorias);
router.get("/:id", [
    validar_jwt_1.default,
    express_validator_1.check('id').custom(database_validators_1.existeCategoria),
    validar_campos_1.default
], categoria_1.getCategoria);
router.post("/", [
    validar_jwt_1.default,
    express_validator_1.check('nombre').custom(database_validators_1.existeNombreCategoria),
    validar_campos_1.default
], categoria_1.postCategoria);
router.put("/:id", [validar_jwt_1.default, validar_campos_1.default], categoria_1.putCategoria);
router.delete("/:id", [validar_jwt_1.default, validar_campos_1.default], categoria_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categorias.js.map