"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificaciones_1 = require("../controllers/notificaciones");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.Router();
router.post("/", [validar_jwt_1.default, validar_campos_1.default], notificaciones_1.enviarNotificacion);
router.post("/agregarToken", notificaciones_1.agregarTokenFirebase);
//notificar productos por caducarse
router.post("/productosPorCaducarse", [validar_jwt_1.default, validar_campos_1.default], notificaciones_1.notificacionProductosPorCaducarse);
//notificar actualización de producto
router.post("/actualizacionProducto", [validar_jwt_1.default, validar_campos_1.default], notificaciones_1.notificacionCambioPrecioProducto);
//notificar existencias con bajo stock
router.post('/bajoStock', [validar_jwt_1.default, validar_campos_1.default], notificaciones_1.notificacionBajoStock);
exports.default = router;
//# sourceMappingURL=notificaciones.js.map