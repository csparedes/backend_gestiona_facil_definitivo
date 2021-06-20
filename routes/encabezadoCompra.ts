import { Router } from "express";
import {
  deleteEncabezadoCompra,
  getEncabezadoPorQuery,
  getEncabezadosCompra,
  postEncabezadoCompra,
  putEncabezadoCompra,
} from "../controllers/encabezadoCompra";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getEncabezadosCompra);
router.get("/:query", [validarJWT, validarCampos], getEncabezadoPorQuery);
router.post("/", [validarJWT, validarCampos], postEncabezadoCompra);
router.put("/:comprobante", [validarJWT, validarCampos], putEncabezadoCompra);
router.delete(
  "/:comprobante",
  [validarJWT, validarCampos],
  deleteEncabezadoCompra
);

export default router;
