require('../models/asociaciones');
import { Request, Response } from "express";
import { Op } from "sequelize";
import DetallePedido from "../models/detallePedido";
import Proveedor from "../models/proveedor";
import EncabezadoPedido from "../models/encabezadoPedido";
import Producto from "../models/producto";

export const getMostrarPedidos = async (req: Request, res: Response) => {
  const encabezadosPedidos = await EncabezadoPedido.findAll({
    where: {
      estado: true
    },
    include: {
      model: Proveedor,
      attributes: ['nombre']
    }
  });

  if (!encabezadosPedidos) {
    res.status(400).json({
      msg: "Hubo un error en la petición"
    });
  }

  res.json({
    msg: "La petición fue realizada con éxito",
    encabezadosPedidos
  });
}

export const getArticulosPedido = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const detallePedido = await DetallePedido.findAll({
    where: {
      estado: true,
      comprobante
    },
    include: {
      model: Producto
    }
  });
  const encabezadoPedido = await EncabezadoPedido.findOne({
    where: {
      estado: true,
      comprobante
    },
    include: {
      model: Proveedor
    }
  });

  if (!detallePedido || !encabezadoPedido) {
    res.status(400).json({
      msg: "Ha ocurrido un error"
    });
  }

  res.json({
    msg: "Éxito en la petición",
    encabezadoPedido,
    detallePedido
  });
}


export const postListaProductosNotaPedido = async (req: Request, res: Response) => {
   
  
  let bandera: boolean = true;
  let razon: string = "Novedades: ";
  const {
    comprobante,
    proveedoreId,
    fechaPedido,
    totalPedido,
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

    const detalle = await DetallePedido.build(detallePedido);
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

  const encabezado = await EncabezadoPedido.build(encabezadoPedido);
  encabezado.save();

  res.json({
    msg: "Se ha realizado el pedido exitosamente",
    encabezado,
  });
}