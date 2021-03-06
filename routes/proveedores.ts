import { Router } from "express";
import {
  deleteProveedor,
  getProveedores,
  getProveedoresPorNombre,
  postProveedor,
  putProveedor,
} from "../controllers/proveedor";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getProveedores);
router.get("/:nombre", [validarJWT, validarCampos], getProveedoresPorNombre);
router.post("/", [validarJWT, validarCampos], postProveedor);
router.put("/:identificacion", [validarJWT, validarCampos], putProveedor);
router.delete("/:identificacion", [validarJWT, validarCampos], deleteProveedor);

export default router;
