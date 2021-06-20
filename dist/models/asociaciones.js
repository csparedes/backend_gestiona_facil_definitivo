"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rol_1 = __importDefault(require("./rol"));
const usuario_1 = __importDefault(require("./usuario"));
const categoria_1 = __importDefault(require("./categoria"));
const producto_1 = __importDefault(require("./producto"));
const kardexExistencia_1 = __importDefault(require("./kardexExistencia"));
const kardexIngreso_1 = __importDefault(require("./kardexIngreso"));
const kardexSalida_1 = __importDefault(require("./kardexSalida"));
const cliente_1 = __importDefault(require("./cliente"));
const encabezadoVenta_1 = __importDefault(require("./encabezadoVenta"));
const proveedor_1 = __importDefault(require("./proveedor"));
const encabezadoCompra_1 = __importDefault(require("./encabezadoCompra"));
const detalleVenta_1 = __importDefault(require("./detalleVenta"));
const detalleCompra_1 = __importDefault(require("./detalleCompra"));
//Asociación de usuario Rol
rol_1.default.hasOne(usuario_1.default);
usuario_1.default.belongsTo(rol_1.default);
//Asociación de producto categoria
categoria_1.default.hasOne(producto_1.default);
producto_1.default.belongsTo(categoria_1.default);
//Asociación de Kardex Existencia con Producto
producto_1.default.hasOne(kardexExistencia_1.default);
kardexExistencia_1.default.belongsTo(producto_1.default);
//Asociación de Kardex Ingreso con Producto
producto_1.default.hasOne(kardexIngreso_1.default);
kardexIngreso_1.default.belongsTo(producto_1.default);
//Asociación de Kardex Salida con Producto
producto_1.default.hasOne(kardexSalida_1.default);
kardexSalida_1.default.belongsTo(producto_1.default);
//Asociación de Encabezado de ventas con cliente
cliente_1.default.hasOne(encabezadoVenta_1.default);
encabezadoVenta_1.default.belongsTo(cliente_1.default);
//Asociación de Encabezado de compras con proveedor
proveedor_1.default.hasOne(encabezadoCompra_1.default);
encabezadoCompra_1.default.belongsTo(proveedor_1.default);
//Asociación de Detalle de Venta a Producto
producto_1.default.hasOne(detalleVenta_1.default);
detalleVenta_1.default.belongsTo(producto_1.default);
//Asociación de Detalle de Compra a Producto
producto_1.default.hasOne(detalleCompra_1.default);
detalleCompra_1.default.belongsTo(producto_1.default);
//# sourceMappingURL=asociaciones.js.map