import { Router } from "express";
import {
  getDetalleCompra,
  getDetallesCompraLike,
  getDetallesCompras,
  postDetalleCompra,
  putDetalleCompra,
  deleteDetalleCompra,
} from "../controllers/detalleCompra";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getDetallesCompras);
router.get("/:comprobante", [validarJWT, validarCampos], getDetalleCompra);
router.get("/:query", [validarJWT, validarCampos], getDetallesCompraLike);
router.post("/", [validarJWT, validarCampos], postDetalleCompra);
router.put("/:comprobante", [validarJWT, validarCampos], putDetalleCompra);
router.delete("/:comprobante", [validarJWT, validarCampos], deleteDetalleCompra);

export default router;
