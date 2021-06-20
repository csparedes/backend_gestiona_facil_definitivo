import { Router } from "express";
import {
  deleteProducto,
  getProducto,
  getProductoPorCodigo,
  getProductoPorNombre,
  getProductos,
  getProductosPorCategoria,
  postProducto,
  putProducto,
} from "../controllers/productos";
import validarCampos from "../middlewares/validar-campos";
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT, validarCampos], getProductos);
router.get("/:id", [validarJWT, validarCampos], getProducto);
router.get(
  "/codigo/:codigo",
  [validarJWT, validarCampos],
  getProductoPorCodigo
);
router.get(
  "/nombre/:nombre",
  [validarJWT, validarCampos],
  getProductoPorNombre
);
router.get(
  "/categoria/:categoria",
  [validarJWT, validarCampos],
  getProductosPorCategoria
);
router.post("/", [validarJWT, validarCampos], postProducto);
router.put("/:codigo", [validarJWT, validarCampos], putProducto);
router.delete("/:codigo", [validarJWT, validarCampos], deleteProducto);

export default router;
