import { Request, Response } from "express";
import { Op } from "sequelize";
import Cliente from "../models/cliente";

export const getClientes = async (req: Request, res: Response) => {
  const clientes = await Cliente.findAll({
    where: {
      estado: true,
    },
    offset: 3
  });

  if (!clientes) {
    return res.status(400).json({
      msg: "No hay clientes disponibles",
    });
  }

  res.json({
    msg: "Lista de Clientes",
    clientes,
  });
};

export const getClientesPorIdentificacion = async (
  req: Request,
  res: Response
) => {
  const { identificacion } = req.params;
  const clientes = await Cliente.findAll({
    where: {
      identificacion: {
        [Op.like]: `%${identificacion}%`,
      },
      estado: true,
    },
    order: [["createdAt", "DESC"]],
  });

  if (!clientes) {
    return res.status(400).json({
      msg: "No hay cliente disponible",
    });
  }

  res.json({
    msg: "Lista de Clientes",
    clientes,
  });
};

export const postCliente = async (req: Request, res: Response) => {
  const { nombre, identificacion, domicilio, email } = req.body;
  const clienteBuscado = await Cliente.findOne({
    where: {
      identificacion,
      estado: true,
    },
  });
  if (clienteBuscado) {
    return res.status(400).json({
      msg: "Ese cliente ya existe",
    });
  }

  const nuevoCliente = {
    nombre,
    identificacion,
    domicilio,
    email,
    estado: true,
  };

  const cliente = await Cliente.build(nuevoCliente);
  cliente.save();
  res.json({
    msg: "Se ha creado un nuevo Cliente",
    cliente,
  });
};

export const putCliente = async (req: Request, res: Response) => {
  const { identificacion } = req.params;
  const clienteActual = await Cliente.findOne({
    where: { identificacion, estado: true },
  });
  if (!clienteActual) {
    return res.status(401).json({
      msg: "No existe el cliente con la identificación: " + identificacion,
    });
  }

  const { nombre, domicilio, email } = req.body;
  const clienteNuevo = {
    nombre,
    identificacion,
    domicilio,
    email,
    estado: true,
  };
  await clienteActual.update(clienteNuevo);
  res.json({
    msg: "Se ha actualizado el cliente",
    cliente: clienteActual,
  });
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { identificacion } = req.params;
  const clienteActual = await Cliente.findOne({
    where: { identificacion, estado: true },
  });
  if (!clienteActual) {
    return res.status(401).json({
      msg: "No existe el cliente con la identificación: " + identificacion,
    });
  }

  await clienteActual.update({ estado: false });
  res.json({
    msg: "Se ha eliminado el cliente",
    cliente: clienteActual,
  });
};
