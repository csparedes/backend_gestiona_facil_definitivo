import { Request, Response } from "express";
import { Op } from "sequelize";
import Proveedor from "../models/proveedor";

export const getProveedores = async (req: Request, res: Response) => {
  const proveedores = await Proveedor.findAll({ where: { estado: true } });
  if (!proveedores) {
    return res.status(400).json({
      msg: "No se encontró ningún proveedor",
    });
  }

  res.json({
    msg: "Lista de proveedores",
    proveedores,
  });
};

export const getProveedoresPorNombre = async (req: Request, res: Response) => {
  const { nombre } = req.params;
  const proveedores = await Proveedor.findAll({
    where: {
      nombre: {
        [Op.like]: `%${nombre}%`,
      },
      estado: true,
    },
    order: [["nombre", "ASC"]],
    
  });

  if (!proveedores) {
    return res.status(400).json({
      msg: "No se encontró ningún proveedor",
    });
  }

  res.json({
    msg: "Proveedores encontrado",
    proveedores,
  });
};

export const postProveedor = async (req: Request, res: Response) => {
  const { nombre, identificacion, domicilio, email } = req.body;
  const nuevoProveedor = {
    nombre,
    identificacion,
    domicilio,
    email,
    estado: true,
  };

  const proveedor = await Proveedor.build(nuevoProveedor);
  proveedor.save();

  res.json({
    msg: "Se ha creado un nuevo proveedor",
    proveedor,
  });
};

export const putProveedor = async (req: Request, res: Response) => {
  const { identificacion } = req.params;
  const proveedorBuscado = await Proveedor.findOne({
    where: {
      [Op.and]: [{ estado: true }, { identificacion }],
    },
  });

  if (!proveedorBuscado) {
    return res.status(400).json({
      msg: "No existe el proveedor",
    });
  }

  const { nombre, domicilio, email } = req.body;
  const nuevoProveedor = {
    nombre,
    identificacion,
    domicilio,
    email,
    estado: true,
  };
  await proveedorBuscado.update(nuevoProveedor);

  res.json({
    msg: "Se ha actualizado el proveedor",
    proveedor: proveedorBuscado,
  });
};

export const deleteProveedor = async (req: Request, res: Response) => {
  const { identificacion } = req.params;
  const proveedorBuscado = await Proveedor.findOne({
    where: {
      [Op.and]: [{ estado: true }, { identificacion }],
    },
  });

  if (!proveedorBuscado) {
    return res.status(400).json({
      msg: "No existe el proveedor",
    });
  }
  await proveedorBuscado.update({ estado: false });
  res.json({
    msg: "Se ha eliminado el proveedor",
  });
};
