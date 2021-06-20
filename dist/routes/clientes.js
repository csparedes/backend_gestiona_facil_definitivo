"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const cliente_1 = require("../controllers/cliente");
const database_validators_1 = require("../helpers/database-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.get('/', [
    validar_jwt_1.default,
    validar_campos_1.default
], cliente_1.getClientes);
router.get('/:identificacion', [
    validar_jwt_1.default,
    validar_campos_1.default
], cliente_1.getClientesPorIdentificacion);
router.post('/', [
    validar_jwt_1.default,
    express_validator_1.check('identificacion').custom(database_validators_1.identificacionLength),
    validar_campos_1.default
], cliente_1.postCliente);
router.put('/:identificacion', [
    validar_jwt_1.default,
    express_validator_1.check('identificacion').custom(database_validators_1.identificacionLength),
    validar_campos_1.default
], cliente_1.putCliente);
router.delete('/:identificacion', [
    validar_jwt_1.default,
    validar_campos_1.default
], cliente_1.deleteCliente);
exports.default = router;
//# sourceMappingURL=clientes.js.map