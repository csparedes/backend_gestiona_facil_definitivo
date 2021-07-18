import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";

import EncabezadoVentas from "../models/encabezadoVenta";

export const getEncabezadosVentas = async (req: Request, res: Response) => {
  const encabezados = await EncabezadoVentas.findAll({
    where: { estado: true },
  });
  if (!encabezados) {
    return res.status(400).json({
      msg: "No existe ningún encabezado de factura",
    });
  }

  res.json({
    msg: "Lista de Encabezados de Venta",
    encabezados,
  });
};

export const getEncabezadoPorQuery = async (req: Request, res: Response) => {
  const { query } = req.params;
  const encabezado = await EncabezadoVentas.findOne({
    where: {
      comprobante: query,
    },
  });
  if (!encabezado) {
    return res.status(400).json({
      msg: "No existe ningún encabezado de factura",
    });
  }

  res.json({
    msg: "Se ha encontrado en encabezado de venta",
    encabezado,
  });
};

export const postEncabezadoVenta = async (req: Request, res: Response) => {
  const { comprobante, cliente, fechaVenta, totalVenta, comentario } = req.body;
  const buscarEncabezado = await EncabezadoVentas.findOne({
    where: { comprobante },
  });
  if (buscarEncabezado) {
    return res.status(400).json({
      msg: "El comprobante ya existe en la base de datos",
    });
  }

  const nuevoEncabezado = {
    comprobante,
    cliente,
    fechaVenta,
    totalVenta,
    comentario,
    estado: true,
  };
  const encabezado = await EncabezadoVentas.build(nuevoEncabezado);
  encabezado.save();
  res.json({
    msg: "Se ha creado un nuevo Encabezado",
    encabezado,
  });
};

export const putEncabezadoVenta = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const buscarEncabezado = await EncabezadoVentas.findOne({
    where: { comprobante },
  });
  if (!buscarEncabezado) {
    return res.status(400).json({
      msg: "El comprobante no existe en la base de datos",
    });
  }

  const { cliente, fechaVenta, totalVenta, comentario } = req.body;
  await buscarEncabezado.update({
    cliente,
    fechaVenta,
    totalVenta,
    comentario,
  });
  res.json({
    msg: "Se ha actualizado el Encabezado",
    encabezado: buscarEncabezado,
  });
};

export const deleteEncabezadoVenta = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const buscarEncabezado = await EncabezadoVentas.findOne({
    where: { comprobante },
  });
  if (!buscarEncabezado) {
    return res.status(400).json({
      msg: "El comprobante no existe en la base de datos",
    });
  }
  await buscarEncabezado.update({ estado: false });
  res.json({
    msg: "Se ha eliminado el Encabezado",
    encabezado: buscarEncabezado,
  });
};



export const getObtenerUltimoComprobante = async (req: Request, res: Response) => {
  
  const buscarEncabezado = await EncabezadoVentas.findOne({
    attributes: 
      [[Sequelize.fn('max',Sequelize.col('comprobante')) as any, 'ultimoComprobante']],

  });

  if (!buscarEncabezado) {
    return res.status(400).json({
      ok: false,
      msg: 'Ha ocurrido un grave error al consultar comprobante'
    })
  }

  res.json({
    comprobante: buscarEncabezado
  })
}
