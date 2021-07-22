import Rol from './rol';
import Usuario from './usuario';
import Categoria from './categoria';
import Producto from './producto';
import KardexExistencias from './kardexExistencia';
import KardexIngreso from './kardexIngreso';
import KardexSalida from './kardexSalida';
import Cliente from './cliente';
import EncabezadoVentas from './encabezadoVenta';
import Proveedor from './proveedor';
import EncabezadoCompra from './encabezadoCompra';
import DetalleVenta from './detalleVenta';
import DetalleCompra from './detalleCompra';
import EncabezadoPedido from './encabezadoPedido';
import DetallePedido from './detallePedido';

//Asociación de usuario Rol
Rol.hasOne(Usuario);
Usuario.belongsTo(Rol);

//Asociación de producto categoria
Categoria.hasOne(Producto);
Producto.belongsTo(Categoria);

//Asociación de Kardex Existencia con Producto
Producto.hasOne(KardexExistencias);
KardexExistencias.belongsTo(Producto);

//Asociación de Kardex Ingreso con Producto
Producto.hasOne(KardexIngreso);
KardexIngreso.belongsTo(Producto);


//Asociación de Kardex Salida con Producto
Producto.hasOne(KardexSalida);
KardexSalida.belongsTo(Producto);

//Asociación de Encabezado de ventas con cliente
Cliente.hasOne(EncabezadoVentas);
EncabezadoVentas.belongsTo(Cliente);

//Asociación de Encabezado de compras con proveedor
Proveedor.hasOne(EncabezadoCompra);
EncabezadoCompra.belongsTo(Proveedor);

//Asociación de Detalle de Venta a Producto
Producto.hasOne(DetalleVenta);
DetalleVenta.belongsTo(Producto);

//Asociación de Detalle de Compra a Producto
Producto.hasOne(DetalleCompra);
DetalleCompra.belongsTo(Producto);

//Asociación de Encabezado de pedido con proveedor
Proveedor.hasOne(EncabezadoPedido);
EncabezadoPedido.belongsTo(Proveedor);

//Asociación de Detalle de Compra a Producto
Producto.hasOne(DetallePedido);
DetallePedido.belongsTo(Producto);