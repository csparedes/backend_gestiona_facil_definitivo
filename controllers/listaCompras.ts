import { Request, Response } from "express";
import { Op } from "sequelize";

import Producto from "../models/producto";
import KardexExistencia from "../models/kardexExistencia";
import KardexIngreso from "../models/kardexIngreso";
import DetalleCompra from "../models/detalleCompra";
import EncabezadoCompra from "../models/encabezadoCompra";

export const postListaProductosFacturaCompra = async (
  req: Request,
  res: Response
) => {
  let bandera: boolean = true;
  let razon: string = "Novedades: ";

  const {
    comprobante,
    proveedoreId,
    fechaCompra,
    totalCompra,
    listaProductos, 
    comentario,
  } = req.body;

  const listaProductosAux: Array<Object> = listaProductos;
  for (let producto of listaProductosAux) {
    const productoBuscado = await Producto.findOne({
      where: {
        [Op.and]: [
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

    const ingreso = await KardexIngreso.build(ingresoNuevo);
    ingreso.save();
    console.log(`ingreso: ${ingreso}`);
    
    //Actualizamos el Kardex de Existenias
    const existencia = await KardexExistencia.findOne({
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

      const exis = await KardexExistencia.build(nuevaExistencia);
      exis.save();
    } else {
      //Si existe la actualizamos
      //@ts-ignore
      let cant: number = existencia.cantidad + parseFloat(producto["cantidad"]);
      
      
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

    const detalle = await DetalleCompra.build(detalleCompra);
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

  const encabezado = await EncabezadoCompra.build(encabezadoCompra);
  encabezado.save();

  res.json({
    msg: "Se ha realizado la compra exitosamente",
    encabezado,
    razon,
  });
};
