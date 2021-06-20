require('../models/asociasiones');
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario";
import Rol from "../models/rol";



export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: true,
    },
    include: {
      model: Rol,
      attributes: ['rol'],
      
    },
    attributes: ["nombre", "email", 'id'],
    
  });
  if (!usuarios) {
    return res.status(401).json({
      msg: "No se ha encontrado ningún usuario",
    });
  }
  res.json({
    msg: "Lista de usuarios",
    usuarios,
  });
};
export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: ['nombre', 'email'],
      include: {
        model: Rol,
        attributes: ['rol']
      }
  });
  if (!usuario) {
    return res.status(401).json({
      msg: "No se ha encontrado ningún usuario",
    });
  }
  res.json({
      msg: "Se encontró el usuario: " + id,
      usuario
  });
};
export const postUsuario = async (req: Request, res: Response) => {
  const { nombre, roleId, email, password } = req.body;
  const salt = bcrypt.genSaltSync();
  const nuevoUsuario = {
    nombre,
    roleId,
    email,
    password: bcrypt.hashSync(password, salt),
    estado: true,
  };

  const usuario = Usuario.build(nuevoUsuario);
  await usuario.save();
  res.json({
    msg: "Se ha creado un nuevo Usuario",
    usuario,
  });
};
export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const actualUsuario = await Usuario.findByPk(id);
    const salt = bcrypt.genSaltSync();
    if (!actualUsuario) {
         return res.status(401).json({
      msg: "No se ha encontrado ningún usuario",
         });
        
    }
    const { nombre, roleId, email, password } = req.body;

    const nuevoUsuario = {
        nombre,
        roleId,
        email,
        password: bcrypt.hashSync(password, salt)
    }
    await actualUsuario.update(nuevoUsuario);
    res.json({
        msg: "Usuario actualizado",
        actualUsuario
    })
    
  // res.json({
  //   id,
  //   m: "put",
  // });
};
export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
     if (!usuario) {
         return res.status(401).json({
      msg: "No se ha encontrado ningún usuario",
         });
        
    }

    await usuario.update({ estado: false });
    res.json({
        msg:'Se ha eliminado el usuario con id: '+ id
    })

};
