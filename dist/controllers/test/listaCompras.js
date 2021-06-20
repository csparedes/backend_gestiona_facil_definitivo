"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postListaProductosFacturaCompra = void 0;
const sequelize_1 = require("sequelize");
const producto_1 = __importDefault(require("../../models/producto"));
const kardexExistencia_1 = __importDefault(require("../../models/kardexExistencia"));
const kardexIngreso_1 = __importDefault(require("../../models/kardexIngreso"));
const detalleCompra_1 = __importDefault(require("../../models/detalleCompra"));
const encabezadoCompra_1 = __importDefault(require("../../models/encabezadoCompra"));
const postListaProductosFacturaCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bandera = true;
    let razon = "Novedades: ";
    const { comprobante, proveedoreId, fechaCompra, totalCompra, listaProductos, comentario, } = req.body;
    const listaProductosAux = listaProductos;
    for (let producto of listaProductosAux) {
        const productoBuscado = yield producto_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { estado: true },
                    //@ts-ignore
                    { codigo: producto["codigo"] },
                ],
            },
        });
        //Validamos si existe el producto
        if (!productoBuscado) {
            bandera = false;
            //@ts-ignore
            razon += `, El código del producto: ${producto["codigo"]} no existe en la base de datos`;
            break;
        }
        //Hacemos el ingreso
        const ingresoNuevo = {
            //@ts-ignore
            productoId: productoBuscado["id"],
            //@ts-ignore
            cantidad: producto["cantidad"],
            fecha: fechaCompra,
            //@ts-ignore
            valorUnitario: producto["valorUnitario"],
        };
        const ingreso = yield kardexIngreso_1.default.build(ingresoNuevo);
        ingreso.save();
        //Actualizamos el Kardex de Existenias
        const existencia = yield kardexExistencia_1.default.findOne({
            where: {
                //@ts-ignore
                productoId: productoBuscado.id,
                //@ts-ignore
                valorIngreso: producto["valorUnitario"],
                //@ts-ignore
                // fechaCaducidad: producto['fechaCaducidad']
            },
        });
        if (!existencia) {
            //Si no hay existencia que coincida, creamos una nueva
            const nuevaExistencia = {
                //@ts-ignore
                productoId: productoBuscado.id,
                //@ts-ignore
                fechaCaducidad: producto["fechaCaducidad"],
                //@ts-ignore
                cantidad: producto["cantidad"],
                //@ts-ignore
                valorIngreso: producto["valorUnitario"],
            };
            const exis = yield kardexExistencia_1.default.build(nuevaExistencia);
            exis.save();
        }
        else {
            //Si existe la actualizamos
            //@ts-ignore
            let cant = existencia.cantidad + parseFloat(producto["cantidad"]);
            existencia.update({ cantidad: cant });
        }
        if (!bandera) {
            return res.status(400).json({
                bandera,
                razon,
            });
        }
        //Añadimos al detalle de compra
        const detalleCompra = {
            comprobante,
            //@ts-ignore
            cantidad: producto["cantidad"],
            //@ts-ignore
            productoId: productoBuscado.id,
            //@ts-ignore
            valorUnitario: producto["valorUnitario"],
        };
        const detalle = yield detalleCompra_1.default.build(detalleCompra);
        detalle.save();
    }
    //Se procede a realizar el  encabezado de Compra
    const encabezadoCompra = {
        comprobante,
        proveedoreId,
        fechaCompra,
        totalCompra,
        comentario,
    };
    const encabezado = yield encabezadoCompra_1.default.build(encabezadoCompra);
    encabezado.save();
    res.json({
        msg: "Se ha realizado la compra exitosamente",
        encabezado,
    });
});
exports.postListaProductosFacturaCompra = postListaProductosFacturaCompra;
//# sourceMappingURL=listaCompras.js.map