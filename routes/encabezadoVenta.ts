import { Router } from "express";
import {
  getEncabezadoPorQuery,
  getEncabezadosVentas,
  postEncabezadoVenta,
  putEncabezadoVenta,
  deleteEncabezadoVenta,
} from "../controllers/encabezadoVenta";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getEncabezadosVentas);

router.get("/:query", [validarJWT, validarCampos], getEncabezadoPorQuery);

router.post("/", [validarJWT, validarCampos], postEncabezadoVenta);

router.put("/:comprobante", [validarJWT, validarCampos], putEncabezadoVenta);

router.delete(
  "/:comprobante",
  [validarJWT, validarCampos],
  deleteEncabezadoVenta
);

export default router;
