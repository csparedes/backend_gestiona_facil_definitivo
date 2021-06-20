import { Router } from 'express';
import { postListaProductosFacturaCompra } from '../controllers/test/listaCompras';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.post('/', [
    validarJWT,
    validarCampos
], postListaProductosFacturaCompra);

export default router;