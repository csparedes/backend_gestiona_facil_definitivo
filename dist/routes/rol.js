"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_1 = require("../controllers/rol");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get('/', [validar_jwt_1.default, validar_campos_1.default], rol_1.getRoles);
router.get('/:query', [validar_jwt_1.default, validar_campos_1.default], rol_1.getRolesLike);
router.post('/', [validar_jwt_1.default, validar_campos_1.default], rol_1.postRol);
router.delete('/:rol', [validar_jwt_1.default, validar_jwt_1.default], rol_1.deleteRol);
exports.default = router;
//# sourceMappingURL=rol.js.map