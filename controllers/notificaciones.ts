import { Request, Response } from "express";
import Firebase from "../models/firebase";
import { Op } from "sequelize";
import { productosPorCaducarse } from "../helpers/operaciones-fechas";
import Producto from "../models/producto";
import KardexExistencia from "../models/kardexExistencia";

export const enviarNotificacion = async (req: Request, res: Response) => {
  const admin = require("firebase-admin");
  const listaConsulta = await Firebase.findAll({
    where: {
      estado: true,
    },
    attributes: ["token"],
  });
  const listaDispositivos: any[] = [];
  listaConsulta.forEach((value) => {
    //@ts-ignore
    listaDispositivos.push(value["token"]); 
  });

  const message = {
    data: {
      texto: "Una notificación de prueba desde NodeJs",
    },

    // tokens: registrationTokens,
    tokens: listaDispositivos,
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then((respuesta: any) => {
      res.json({
        msg: "Notificación con Exito",
        respuesta,
      });
    })
    .catch((err: any) => {
      res.status(400).json({
        msg: "Error en el proceso",
        err,
      });
    });
};

export const agregarTokenFirebase = async (req: Request, res: Response) => {
  const { token } = req.body;

  const buscarToken = await Firebase.findOne({
    where: {
      token: token,
    },
  });

  if (buscarToken) {
    return res.json({
      msg: "Ya existe el token",
    });
  }
  const nuevoToken = {
    token: token,
  };
  const firebase = await Firebase.build(nuevoToken);
  firebase.save();
  res.json({
    msg: "Se agrego el token del dispositivo",
    token,
  });
};

//Notificacion de productos por caducarse
export const notificacionProductosPorCaducarse = async (
  req: Request,
  res: Response
) => {
  const admin = require("firebase-admin");
  const listaConsulta = await Firebase.findAll({
    where: {
      estado: true,
    },
    attributes: ["token"],
  });
  const listaDispositivos: any[] = [];
  listaConsulta.forEach((value) => {
    //@ts-ignore
    listaDispositivos.push(value["token"]);    
  });

  const listaProductosPorCaducarse = await productosPorCaducarse();
  let bandera: boolean = true;
  listaProductosPorCaducarse.forEach((value: any) => {
    //@ts-ignore
    const message = {
      data: {
        texto: `El producto: ${value["Producto"]["nombre"]} tiene riesgo de expiración, se caduca el ${value["fechaCaducidad"]}`,
        //Aqui se puede poner rutas, imagenes, o cualquier agregado de la notificación
      },
      tokens: listaDispositivos,
    };
    admin
      .messaging()
      .sendMulticast(message)
      .then((respuesta: any) => {
        bandera = true;
      })
      .catch((err: any) => {
        bandera = false;
      });
  });

  if (bandera) {
    res.json({
      ok: bandera,
      msg: "Ha salido todo a la perfección, se enviaron todas las notificaciones",
    });
  } else {
    res.status(400).json({
      ok: bandera,
      msg: "Ha sido un desastre, al menos una notificación no se envío",
    });
  }
};

//Notificación de cambio de precio de producto
export const notificacionCambioPrecioProducto = async (
  req: Request,
  res: Response
) => {
  const { productoId } = req.body;
  const productoBuscado = await Producto.findByPk(productoId);
  if (!productoBuscado) {
    res.status(400).json({
      ok: false,
      msg: "No hay producto, error en el productoId",
    });
  }

  const admin = require("firebase-admin");
  const listaConsulta = await Firebase.findAll({
    where: {
      estado: true,
    },
    attributes: ["token"],
  });

  const listaDispositivos: any[] = [];
  listaConsulta.forEach((value) => {
    //@ts-ignore
    listaDispositivos.push(value["token"]);
  });
  let bandera = true;
  const message = {
    data: {
      //@ts-ignore
      texto: `El producto ${productoBuscado["nombre"]} ha sido actualizado, el precio de venta es: ${productoBuscado["precioVenta"]}`,
    },
    tokens: listaDispositivos,
  };
  admin
    .messaging()
    .sendMulticast(message)
    .then((resp: any) => {
      console.log(`Éxito: ${resp}`);
      bandera = true;
    })
    .catch((err: any) => {
      console.log(`Fail: ${err}`);
      bandera = false;
    });

  if (!bandera) {
    res.status(400).json({
      ok: bandera,
      msg: "Hubo un error en el envío de la notificación",
    });
  } else {
    res.json({
      ok: bandera,
      msg: "Se envío con éxito la notificación",
    });
  }
};

//Notificación de productos con bajo stock
export const notificacionBajoStock = async (req: Request, res: Response) => {
  const listaProductos = await KardexExistencia.findAll({
    where: {
      cantidad: {
        [Op.lte]: 6,
      },
    },
    include: {
      model: Producto
    },
    order: [["cantidad", "DESC"]],
  });
  if (!listaProductos) {
    res.status(400).json({
      ok: false,
      msg: "No hay productos con bajo stock, de hecho eso es algo bueno",
    });
  }

  const admin = require("firebase-admin");
  const listaConsulta = await Firebase.findAll({
    where: {
      estado: true,
    },
    attributes: ["token"],
  });

  const listaDispositivos: any[] = [];
  listaConsulta.forEach((value) => {
    //@ts-ignore
    listaDispositivos.push(value["token"]);
  });
  let bandera = true;
 

  listaProductos.forEach((value: any) => {
    //@ts-ignore
    const message = {
      data: {
        texto: `El producto: ${value["Producto"]["nombre"]} tiene bajo stock, con ${value["cantidad"]} existencias`,
      },
      tokens: listaDispositivos,
    };
    admin
      .messaging()
      .sendMulticast(message)
      .then((respuesta: any) => {
        bandera = true;
      })
      .catch((err: any) => {
        bandera = false;
      });
  });
 
  if (!bandera) {
    res.status(400).json({
      ok: bandera,
      msg: "Hubo un error en el envío de la notificación",
    });
  } else {
    res.json({
      ok: bandera,
      msg: "Se envío con éxito la notificación",
    });
  }
};
