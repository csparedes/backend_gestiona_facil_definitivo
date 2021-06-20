import { Request, Response } from "express";
import { Op } from "sequelize";

import Producto from "../../models/producto";
import KardexSalida from "../../models/kardexSalida";
import KardexExistencia from "../../models/kardexExistencia";
import DetalleVenta from "../../models/detalleVenta";
import EncabezadoVentas from "../../models/encabezadoVenta";

export const postListaProductosFacturaVenta = async (
  req: Request,
  res: Response
) => {
  let bandera: boolean = true;
  let razon: string = "Novedades: ";
  const {
    comprobante,
    clienteId,
    fechaVenta,
    totalVenta,
    listaProductos,
    comentario,
  } = req.body;

  //Se agrega la lista a los diferentes kardex de ingreso y salida

  const listaProductosAux: Array<Object> = listaProductos;
  //Agregamos cada producto de la lista
  for (let producto of listaProductosAux) {
    const productoBuscado = await Producto.findOne({
      where: {
        [Op.and]: [
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

    const salida = await KardexSalida.build(salidaNueva);
    salida.save();
    //Actualizamos la existencia
    const exis = await KardexExistencia.findOne({
      where: {
        [Op.and]: [
          { estado: true },
          //@ts-ignore
          { productoId: productoBuscado.id },
        ],
      },
    });
    //@ts-ignore
    let cant: number = exis.cantidad - parseFloat(producto["cantidad"]);

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
    const venta = await DetalleVenta.build(detalleVenta);
    venta.save();
  }

  //Si la lista es correcta, es señal de que se ha actualizado el kardex, y se procede a hacer el encabezado de factura
  if (!bandera) {
    return res.status(400).json({
      bandera,
      razon,
    });
  } else {
    const encabezadoVenta = {
      comprobante,
      clienteId,
      fechaVenta,
      totalVenta,
      comentario,
    };

    const encabezado = await EncabezadoVentas.build(encabezadoVenta);
    encabezado.save();

    res.json({
      msg: "Ha salido todo muy bien",
      encabezado,
      bandera,
      razon: razon + ",Sin novedades, todo ha salido bien :)",
    });
  }
};
