import { Router } from "express";
import { check } from "express-validator";
import {
  getExistenciaPorCodigoProducto,
  getExistenciaPorNombreProducto,
  getKardexExistencias,
  getKardexIngresos,
  getKardexSalidas,
  postIngresoPutExistenciaCompra,
  postSalidaPutExistenciaVenta,
} from "../controllers/kardex";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/ingresos", [validarJWT, validarCampos], getKardexIngresos);
router.get("/salidas", [validarJWT, validarCampos], getKardexSalidas);
router.get("/existencias", [validarJWT, validarCampos], getKardexExistencias);
router.get(
  "/existencias/:codigo",
  [validarJWT, validarCampos],
  getExistenciaPorCodigoProducto
);
router.get(
  "/existencias/producto/:nombre",
  [validarJWT, validarCampos],
  getExistenciaPorNombreProducto
);

router.post(
  "/ingresos",
  [validarJWT, validarCampos],
  postIngresoPutExistenciaCompra
);
router.post(
  "/salidas/:codigo/:cantidad",
  [validarJWT, validarCampos],
  postSalidaPutExistenciaVenta
);



export default router;
