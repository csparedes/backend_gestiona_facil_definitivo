import { Router } from "express";
import {
  deleteEncabezadoPedido,
  getEncabezadoPedidoPorQuery,
  getEncabezadosPedido,
  getObtenerUltimoComprobante,
  postEncabezadoPedido,
  putEncabezadoPedido,
} from "../controllers/encabezadoPedido";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getEncabezadosPedido);
router.get("/:query", [validarJWT, validarCampos], getEncabezadoPedidoPorQuery);
router.get(
  "/consulta/ultimoEncabezado",
  [validarJWT, validarCampos],
  getObtenerUltimoComprobante
);
router.post("/", [validarJWT, validarCampos], postEncabezadoPedido);
router.put("/:comprobante", [validarJWT, validarCampos], putEncabezadoPedido);
router.delete(
  "/:comprobante",
  [validarJWT, validarCampos],
  deleteEncabezadoPedido
);

export default router;
