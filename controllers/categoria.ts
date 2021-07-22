import { Request, Response } from "express";
import Categoria from "../models/categoria";

export const getCategorias = async (req: Request, res: Response) => {
  const categorias = await Categoria.findAll({
    where: {
      estado: true,
    },
    attributes: ["id","nombre", "descripcion"],
    
  });

  if (!categorias) {
    return res.status(401).json({
      msg: "No se ha encontrado ninguna categoria",
    });
  }

  res.json({
    msg: "Lista de categorias",
    categorias,
  });
};

export const getCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByPk(id);
  res.json({
    msg: "Se ha encontrado la categoría",
    categoria,
  });
};

export const postCategoria = async (req: Request, res: Response) => {
  const { nombre, descripcion } = req.body;
  const categoriaNueva = {
    nombre,
    descripcion,
    estado: true,
  };

  const categoria = await Categoria.build(categoriaNueva);
  categoria.save();
  res.json({
    msg: "Se ha creado una nueva categoria",
    categoria,
  });
};

export const putCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoriaActual = await Categoria.findByPk(id);
  if (!categoriaActual) {
    return res.status(401).json({
      msg: "La categoria no existe",
    });
  }

  const { nombre, descripcion } = req.body;
  const categoriaNueva = {
    nombre,
    descripcion,
    estado: true,
  };
  await categoriaActual.update(categoriaNueva);
  res.json({
    msg: "Categoria Actualizada",
    categoriaActual,
  });
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoriaActual = await Categoria.findByPk(id);
  if (!categoriaActual) {
    return res.status(401).json({
      msg: "La categoria no existe",
    });
  }

  await categoriaActual.update({ estado: false });
  res.json({
    msg: "Categoria eliminada",
  });
};
