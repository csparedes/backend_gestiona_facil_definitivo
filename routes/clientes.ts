import { Router } from 'express';
import { check } from 'express-validator';
import { deleteCliente, getClientesPorIdentificacion, getClientes, postCliente, putCliente } from '../controllers/cliente';
import { identificacionLength } from '../helpers/database-validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
],getClientes);
router.get('/:identificacion', [
    validarJWT,
    validarCampos
],getClientesPorIdentificacion);
router.post('/', [
    validarJWT,
    check('identificacion').custom(identificacionLength),
    validarCampos
],postCliente);
router.put('/:identificacion', [
    validarJWT,
    check('identificacion').custom(identificacionLength),
    validarCampos
],putCliente);
router.delete('/:identificacion', [
    validarJWT,
    validarCampos
],deleteCliente);

export default router;
