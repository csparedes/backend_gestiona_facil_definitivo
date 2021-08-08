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
exports.postListaProductosFacturaVenta = void 0;
const sequelize_1 = require("sequelize");
const producto_1 = __importDefault(require("../models/producto"));
const kardexSalida_1 = __importDefault(require("../models/kardexSalida"));
const kardexExistencia_1 = __importDefault(require("../models/kardexExistencia"));
const detalleVenta_1 = __importDefault(require("../models/detalleVenta"));
const encabezadoVenta_1 = __importDefault(require("../models/encabezadoVenta"));
const postListaProductosFacturaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bandera = true;
    let razon = "Novedades: ";
    const { comprobante, clienteId, fechaVenta, totalVenta, listaProductos, comentario, } = req.body;
    //Se agrega la lista a los diferentes kardex de existencias y salida
    const listaProductosAux = listaProductos;
    //Agregamos cada producto de la lista
    for (let producto of listaProductosAux) {
        const productoBuscado = yield producto_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { estado: true },
                    //@ts-ignore
                    { codigo: producto["codigo"] }
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
        //Hacemos la salida
        const salidaNueva = {
            //@ts-ignore
            productoId: productoBuscado["id"],
            //@ts-ignore
            cantidad: producto["cantidad"],
            fecha: fechaVenta,
            //@ts-ignore
            valorUnitario: producto["valorUnitario"],
        };
        const salida = yield kardexSalida_1.default.build(salidaNueva);
        salida.save();
        //Actualizamos la existencia
        const exis = yield kardexExistencia_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    { estado: true },
                    //@ts-ignore
                    { productoId: productoBuscado.id },
                ],
            },
        });
        //@ts-ignore
        let cant = exis.cantidad - parseFloat(producto["cantidad"]);
        if (cant <= 0) {
            bandera = false;
            razon = ", No hay la cantidad disponible en la base de datos";
            break;
        }
        //Actualizamos las existencias
        exis.update({ cantidad: cant });
        //Añadimos al detalle de venta
        const detalleVenta = {
            comprobante,
            //@ts-ignore
            productoId: productoBuscado.id,
            //@ts-ignore
            cantidad: producto["cantidad"],
            //@ts-ignore
            valorUnitario: producto["valorUnitario"],
        };
        const venta = yield detalleVenta_1.default.build(detalleVenta);
        venta.save();
    }
    //Si la lista es correcta, es señal de que se ha actualizado el kardex, y se procede a hacer el encabezado de factura
    if (!bandera) {
        return res.status(400).json({
            bandera,
            razon,
        });
    }
    else {
        const encabezadoVenta = {
            comprobante,
            clienteId,
            fechaVenta,
            totalVenta,
            comentario,
        };
        const encabezado = yield encabezadoVenta_1.default.build(encabezadoVenta);
        encabezado.save();
        res.json({
            msg: "Ha salido todo muy bien",
            encabezado,
            bandera,
            razon: razon + ",Sin novedades, todo ha salido bien :)",
        });
    }
});
exports.postListaProductosFacturaVenta = postListaProductosFacturaVenta;
//# sourceMappingURL=listaVentas.js.map