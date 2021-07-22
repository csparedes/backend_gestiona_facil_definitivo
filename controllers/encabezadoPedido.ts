import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import EncabezadoPedido from "../models/encabezadoPedido";
import Proveedor from "../models/proveedor";

export const getEncabezadosPedido = async (req: Request, res: Response) => {
  const encabezados = await EncabezadoPedido.findAll({
    where: { estado: true },
    include: Proveedor
  });
  if (!encabezados) {
    return res.status(400).json({
      msg: "No se han encontrado ningún encabezado de pedido",
    });
  }

  res.json({
    msg: "Lista de encabezados de pedido",
    encabezados,
  });
};

export const getEncabezadoPedidoPorQuery = async (
  req: Request,
  res: Response
) => {
  const { query } = req.body;
  const encabezados = await EncabezadoPedido.findAll({
    where: {
      [Op.and]: [
        { estado: true },
        { comprobante: { [Op.like]: `%${query}%` } },
      ],
    },
  });
  if (!encabezados) {
    return res.status(400).json({
      msg: "No se encontro ningún encabezado",
    });
  }

  res.json({
    msg: "Lista de encabezados",
    encabezados,
  });
};

export const postEncabezadoPedido = async (req: Request, res: Response) => {
  const { comprobante, proveedoreId, fechaPedido, totalPedido, comentario } =
    req.body;
  const encabezadoBuscado = await EncabezadoPedido.findOne({
    where: {
      comprobante,
    },
  });
  if (encabezadoBuscado) {
    return res.status(400).json({
      msg: "Ya existe ese comprobante",
    });
  }
  const nuevoEncabezado = {
    comprobante,
    proveedoreId,
    fechaPedido,
    totalPedido,
    comentario,
    estado: true,
  };
  
  const encabezado = await EncabezadoPedido.build(nuevoEncabezado);
  encabezado.save();
  res.json({
    msg: "Se ha creado un nuevo encabezado de Pedido",
    encabezado,
  });
};

export const putEncabezadoPedido = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const encabezadoBuscado = await EncabezadoPedido.findOne({
    where: {
      comprobante,
    },
  });
  if (!encabezadoBuscado) {
    return res.status(400).json({
      msg: "No existe ese comprobante",
    });
  }
  const { proveedorId, fechaPedido, totalPedido, comentario } = req.body;
  const nuevoEncabezado = {
    comprobante,
    proveedorId,
    fechaPedido,
    totalPedido,
    comentario,
    estado: true,
  };
  await encabezadoBuscado.update(nuevoEncabezado);
  res.json({
    msg: "Se ha actualizado el encabezado de pedido",
    encabezado: encabezadoBuscado,
  });
};

export const deleteEncabezadoPedido = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const encabezadoBuscado = await EncabezadoPedido.findOne({
    where: {
      comprobante,
    },
  });
  if (!encabezadoBuscado) {
    return res.status(400).json({
      msg: "No existe ese comprobante",
    });
  }

  await encabezadoBuscado.update({ estado: false });
  res.json({
    msg: "Se ha eliminado el encabezado de pedido",
  });
};

export const getObtenerUltimoComprobante = async (req: Request, res: Response) => {
  
  const buscarEncabezado = await EncabezadoPedido.findOne({
    attributes: 
      [[Sequelize.fn('max',Sequelize.col('comprobante')) as any, 'ultimoComprobante']],

  });

  if (!buscarEncabezado) {
    return res.status(400).json({
      ok: false,
      msg: 'Ha ocurrido un grave error al consultar comprobante de pedido'
    })
  }

  res.json({
    comprobante: buscarEncabezado
  })
}
