import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import EncabezadoCompra from "../models/encabezadoCompra";
import Proveedor from "../models/proveedor";

export const getEncabezadosCompra = async (req: Request, res: Response) => {
  const encabezados = await EncabezadoCompra.findAll({
    where: { estado: true },
    include: Proveedor
  });
  if (!encabezados) {
    return res.status(400).json({
      msg: "No se han encontrado ningún encabezado de compra",
    });
  }

  res.json({
    msg: "Lista de encabezados de compra",
    encabezados,
  });
};

export const getEncabezadoPorQuery = async (
  req: Request,
  res: Response
) => {
  const { query } = req.body;
  const encabezados = await EncabezadoCompra.findAll({
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

export const postEncabezadoCompra = async (req: Request, res: Response) => {
  const { comprobante, proveedoreId, fechaCompra, totalCompra, comentario } =
    req.body;
  const encabezadoBuscado = await EncabezadoCompra.findOne({
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
    fechaCompra,
    totalCompra,
    comentario,
    estado: true,
  };
  
  const encabezado = await EncabezadoCompra.build(nuevoEncabezado);
  encabezado.save();
  res.json({
    msg: "Se ha creado un nuevo encabezado de compra",
    encabezado,
  });
};

export const putEncabezadoCompra = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const encabezadoBuscado = await EncabezadoCompra.findOne({
    where: {
      comprobante,
    },
  });
  if (!encabezadoBuscado) {
    return res.status(400).json({
      msg: "No existe ese comprobante",
    });
  }
  const { proveedorId, fechaCompra, totalCompra, comentario } = req.body;
  const nuevoEncabezado = {
    comprobante,
    proveedorId,
    fechaCompra,
    totalCompra,
    comentario,
    estado: true,
  };
  await encabezadoBuscado.update(nuevoEncabezado);
  res.json({
    msg: "Se ha actualizado el encabezado de compra",
    encabezado: encabezadoBuscado,
  });
};

export const deleteEncabezadoCompra = async (req: Request, res: Response) => {
  const { comprobante } = req.params;
  const encabezadoBuscado = await EncabezadoCompra.findOne({
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
    msg: "Se ha eliminado el encabezado de compra",
  });
};

export const getObtenerUltimoComprobante = async (req: Request, res: Response) => {
  
  const buscarEncabezado = await EncabezadoCompra.findOne({
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
