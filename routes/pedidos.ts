import { Router } from "express";
import {
  getMostrarPedidos,
  getArticulosPedido,
  postListaProductosNotaPedido,
} from "../controllers/listaPedidos";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();
router.get("/", [validarJWT, validarCampos], getMostrarPedidos);
router.get("/:comprobante", [validarJWT, validarCampos], getArticulosPedido);
router.post("/", [validarJWT, validarCampos], postListaProductosNotaPedido);

export default router;
