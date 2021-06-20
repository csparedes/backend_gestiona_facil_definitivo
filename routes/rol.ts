import { Router } from 'express';
import { deleteRol, getRoles, getRolesLike, postRol } from '../controllers/rol';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.get('/', [validarJWT,validarCampos],getRoles);
router.get('/:query', [validarJWT,validarCampos],getRolesLike);
router.post('/', [validarJWT, validarCampos], postRol);
router.delete('/:rol', [validarJWT, validarJWT], deleteRol);

export default router;