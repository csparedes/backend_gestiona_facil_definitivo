import { Router } from "express";
import {
  agregarTokenFirebase,
  enviarNotificacion,
  notificacionCambioPrecioProducto,
  notificacionProductosPorCaducarse,
} from "../controllers/test/notificaciones";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.post("/", [validarJWT, validarCampos], enviarNotificacion);
router.post("/agregarToken", agregarTokenFirebase);

//notificar productos por caducarse
router.post(
  "/productosPorCaducarse",
  [validarJWT, validarCampos],
  notificacionProductosPorCaducarse
);

//notificar actualización de producto
router.post(
  "/actualizacionProducto",
  [validarJWT, validarCampos],
  notificacionCambioPrecioProducto
);

export default router;
