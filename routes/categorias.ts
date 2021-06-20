import { Router } from "express";
import { check } from 'express-validator';
import {
  deleteCategoria,
  getCategoria,
  getCategorias,
  postCategoria,
  putCategoria,
} from "../controllers/categoria";
import {
  existeCategoria,
  existeNombreCategoria
} from "../helpers/database-validators";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";
const router = Router();

router.get("/", [validarJWT, validarCampos], getCategorias);
router.get("/:id", [
  validarJWT,
  check('id').custom(existeCategoria),
  validarCampos
], getCategoria);
router.post("/", [
  validarJWT,
  check('nombre').custom(existeNombreCategoria),
  validarCampos
], postCategoria);
router.put("/:id", [validarJWT, validarCampos], putCategoria);
router.delete("/:id", [validarJWT, validarCampos], deleteCategoria);

export default router;
