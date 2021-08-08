import { Router } from "express";
import { check } from "express-validator";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  postUsuario,
  putUsuario,
} from "../controllers/usuarios";
import { existeEmail, existeId } from "../helpers/database-validators";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
import { existeRol } from "../middlewares/validar-roles";

const router = Router();

router.get("/", [validarJWT, validarCampos], getUsuarios);
router.get("/:id", [validarJWT, validarCampos], getUsuario);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email").custom(existeEmail),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  postUsuario
);
router.put(
  "/:id",
  [
    validarJWT,
    validarCampos,
  ],
  putUsuario
);
router.delete(
  "/:id",
  [
    validarJWT,
    check("id").custom(existeId),
    validarCampos
  ],
  deleteUsuario
);

export default router;
