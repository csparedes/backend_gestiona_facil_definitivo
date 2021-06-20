import { Router } from "express";
import { check } from "express-validator";
import {
  deleteDetalleVenta,
  getDetallesVentas,
  getDetalleVentaPorComprobante,
  postDetalleVenta,
  putDetalleVenta,
} from "../controllers/detalleVenta";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
const router = Router();

router.get("/", [validarJWT, validarCampos], getDetallesVentas);
router.get(
  "/:comprobante",
  [validarJWT, validarCampos],
  getDetalleVentaPorComprobante
);
router.post("/", [validarJWT, validarCampos], postDetalleVenta);
router.put("/:comprobante", [validarJWT, validarCampos], putDetalleVenta);
router.delete("/:comprobante", [validarJWT, validarCampos], deleteDetalleVenta);

export default router;
