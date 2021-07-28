import { Router } from 'express';
import { getPerchas, postCrearEnlaceCajaProducto } from '../controllers/perchas';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.get('/', [validarJWT, validarCampos], getPerchas);
router.post('/', [validarJWT, validarCampos], postCrearEnlaceCajaProducto);

export default router;