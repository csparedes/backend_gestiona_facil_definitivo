"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const database_validators_1 = require("../helpers/database-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get("/", [validar_jwt_1.default, validar_campos_1.default], usuarios_1.getUsuarios);
router.get("/:id", [validar_jwt_1.default, validar_campos_1.default], usuarios_1.getUsuario);
router.post("/", [
    validar_jwt_1.default,
    express_validator_1.check("nombre", "El nombre es obligatorio").not().isEmpty(),
    express_validator_1.check("email").custom(database_validators_1.existeEmail),
    express_validator_1.check("password", "El password debe tener más de 6 letras").isLength({
        min: 6,
    }),
    // check('rol').custom(existeRol),
    validar_campos_1.default,
], usuarios_1.postUsuario);
router.put("/:id", [
    validar_jwt_1.default,
    // check("nombre", "El nombre es obligatorio").not().isEmpty(),
    // check("email").custom(existeEmail),
    // check("password", "El password debe tener más de 6 letras").isLength({
    //   min: 6,
    // }),
    // check("rol").custom(existeRol),
    validar_campos_1.default,
], usuarios_1.putUsuario);
router.delete("/:id", [
    validar_jwt_1.default,
    express_validator_1.check("id").custom(database_validators_1.existeId),
    validar_campos_1.default
], usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map