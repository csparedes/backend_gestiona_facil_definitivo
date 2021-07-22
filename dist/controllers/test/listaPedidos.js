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
exports.postListaProductosNotaPedido = void 0;
const sequelize_1 = require("sequelize");
const detallePedido_1 = __importDefault(require("../../models/detallePedido"));
const encabezadoPedido_1 = __importDefault(require("../../models/encabezadoPedido"));
const producto_1 = __importDefault(require("../../models/producto"));
const postListaProductosNotaPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bandera = true;
    const { comprobante, proveedoreId, fechaPedido, totalPedido, listaProductos, comentario, } = req.body;
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
        //Añadimos al detalle de compra
        const detallePedido = {
            comprobante,
            //@ts-ignore
            cantidad: producto["cantidad"],
            //@ts-ignore
            productoId: productoBuscado.id,
            //@ts-ignore
            valorUnitario: producto["valorUnitario"],
        };
        const detalle = yield detallePedido_1.default.build(detallePedido);
        detalle.save();
    }
    //Se procede a realizar el  encabezado de Compra
    const encabezadoPedido = {
        comprobante,
        proveedoreId,
        fechaPedido,
        totalPedido,
        comentario,
    };
    const encabezado = yield encabezadoPedido_1.default.build(encabezadoPedido);
    encabezado.save();
    res.json({
        msg: "Se ha realizado el pedido exitosamente",
        encabezado,
    });
});
exports.postListaProductosNotaPedido = postListaProductosNotaPedido;
//# sourceMappingURL=listaPedidos.js.map