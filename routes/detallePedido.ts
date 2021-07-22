import { Router } from 'express';
import { deleteDetallePedido, getDetallePedido, getDetallesPedidoLike, getDetallesPedidos, postDetallePedido, putDetallePedido } from '../controllers/detallePedido';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();
router.get('/', [validarJWT, validarCampos], getDetallesPedidos);
router.get('/:comprobante', [validarJWT, validarCampos], getDetallePedido);
router.get('/:query', [validarJWT, validarCampos], getDetallesPedidoLike);
router.post('/', [validarJWT, validarCampos], postDetallePedido);
router.put('/:comprobante', [validarJWT, validarCampos], putDetallePedido);
router.delete('/:comprobante', [validarJWT, validarCampos], deleteDetallePedido);

export default router;