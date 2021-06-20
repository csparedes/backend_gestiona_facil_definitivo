import { Router } from "express";
import { check } from "express-validator";
import { postListaProductosFacturaVenta } from "../controllers/test/listaVentas";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { existeComprobante } from "../middlewares/validar-ventas";

const router = Router();

router.post("/", [
    validarJWT,
    check('comprobante').custom(existeComprobante),
    validarCampos,
], postListaProductosFacturaVenta);


export default router;