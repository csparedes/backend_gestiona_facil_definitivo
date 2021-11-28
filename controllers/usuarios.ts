require('dotenv').config()
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario";
import Rol from "../models/rol";
require("../models/asociaciones");

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll({
    where: {
      estado: true,
    },
    include: {
      model: Rol,
      attributes: ["rol"],
    },
    attributes: ["nombre", "email", "id"],
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
    attributes: ["nombre", "email"],
    include: {
      model: Rol,
      attributes: ["rol"],
    },
  });
  if (!usuario) {
    return res.status(401).json({
      msg: "No se ha encontrado ningún usuario",
    });
  }
  res.json({
    msg: "Se encontró el usuario: " + id,
    usuario,
  });
};
export const postUsuario = async (req: Request, res: Response) => {
  const nodemailer = require("nodemailer");
  let bandera = true;
  const transporter = nodemailer.createTransport({
    host: process.env.CONN_HOST,
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const { nombre, roleId, email, password } = req.body;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Entrega de Credenciales",
    text: `Hola ${nombre}, bienvenid@ a Gestiona Fácil, una app para gestionar Víveres Stalin, tus credenciales de acceso al aplicatvo son: \nCorreo: ${email}\nContraseña: ${password}\n\nMuchas gracias por participar, y mucha suerte!!!`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      bandera = false;
    }
    bandera = true;
  });

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
    emailEnviado: true
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
    password: bcrypt.hashSync(password, salt),
  };
  await actualUsuario.update(nuevoUsuario);
  res.json({
    msg: "Usuario actualizado",
    actualUsuario,
  });

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
    msg: "Se ha eliminado el usuario con id: " + id,
  });
};

export const postTokenFirebase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { token } = req.body;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(400).json({
      msg: "No se ha encontrado ningún usuario",
    });
  }

  await usuario.update({ firebase: token });
  res.json({
    msg: "Se ha asignado el token de firebase al usuario",
    token,
    usuario,
  });
};
