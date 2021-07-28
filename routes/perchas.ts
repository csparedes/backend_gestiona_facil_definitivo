import { Router } from "express";
import {
  deleteEnlaceCajaProducto,
  getPerchas,
  postCrearEnlaceCajaProducto,
  putCrearEnlaceCajaProducto,
} from "../controllers/perchas";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getPerchas);
router.post("/", [validarJWT, validarCampos], postCrearEnlaceCajaProducto);
router.put("/:id", [validarJWT, validarCampos], putCrearEnlaceCajaProducto);
router.delete("/:id", [validarJWT, validarCampos], deleteEnlaceCajaProducto);
export default router;
