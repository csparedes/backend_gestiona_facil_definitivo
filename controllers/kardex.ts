import { Request, Response } from "express";
import { Op } from "sequelize";
import KardexExistencia from "../models/kardexExistencia";
import KardexIngreso from "../models/kardexIngreso";
import KardexSalida from "../models/kardexSalida";
import Producto from "../models/producto";

export const getKardexIngresos = async (req: Request, res: Response) => {
  const kardex = await KardexIngreso.findAll({
    where: { estado: true },
    include: {
      model: Producto,
      attributes: ["id", "nombre", "precioVenta", "codigo"],
    },
    attributes: ["fecha", "cantidad", "valorUnitario"],
  });
  res.json({
    msg: "Lista de Ingresos",
    kardex,
  });
};
export const getKardexSalidas = async (req: Request, res: Response) => {
  const kardex = await KardexSalida.findAll({
    where: { estado: true },
    include: {
      model: Producto,
      attributes: ["id", "nombre", "precioVenta", "codigo"],
    },
    attributes: ["fecha", "cantidad", "valorUnitario"],
  });
  res.json({
    msg: "Lista de Salidas",
    kardex,
  });
};
export const getKardexExistencias = async (req: Request, res: Response) => {
  const kardex = await KardexExistencia.findAll({
    where: { estado: true },
    include: {
      model: Producto,
      attributes: ["id", "nombre", "precioVenta", "codigo"],
    },
    attributes: ["fechaCaducidad", "valorIngreso", "cantidad"],
    order: ['fechaCaducidad']
  });
  res.json({
    msg: "Lista de Existencias",
    kardex,
  });
};
export const getExistenciaPorCodigoProducto = async (
  req: Request,
  res: Response
) => {
  const { codigo } = req.params;
  //buscamos el producto según el código
  const producto = await Producto.findOne({
    where: {
      [Op.and]: [{ estado: true }, { codigo }],
    },
  });
  //comprobamos si no existe el producto
  if (!producto) {
    return res.status(400).json({
      msg: "No existe el producto",
    });
  }
  //Si hay producto, le buscamos en las existencias

  const kardex = await KardexExistencia.findOne({
    where: {
      [Op.and]: [
        { estado: true },
        //@ts-ignore
        { producto: producto.id },
      ],
    },
  });

  //Verificamos si existe en las existencias
  if (!kardex) {
    return res.status(400).json({
      msg: "El producto existe, pero no hay en existencias",
    });
  }

  res.json({
    msg: "Existencia del producto",
    producto,
    kardex,
  });
};

export const postIngresoPutExistenciaCompra = async (
  req: Request,
  res: Response
) => {
  //Buscamos el producto
  const { fechaCaducidad, cantidad, valorUnitario, codigo } = req.body;
  const productoBuscado = await Producto.findOne({
    where: {
      [Op.and]: [{ estado: true }, { codigo }],
    },
  });
  if (!productoBuscado) {
    return res.status(400).json({
      msg: "El producto no existe",
    });
  }
  //Hacemos el ingreso
  const ingresoNuevo = {
    //@ts-ignore
    producto: productoBuscado.id,
    cantidad,
    valorUnitario,
  };
  const ingreso = await KardexIngreso.build(ingresoNuevo);
  ingreso.save();

  const exis = await KardexExistencia.findOne({
    where: {
      [Op.and]: [
        { estado: true },
        //@ts-ignore
        { producto: productoBuscado.id },
        { valorIngreso: valorUnitario },
        { fechaCaducidad },
      ],
    },
  });

  if (!exis) {
    //Si no existe, lo creamos
    const nuevaExistencia = await KardexExistencia.build({
      //@ts-ignore
      producto: productoBuscado.id,
      fechaCaducidad,
      cantidad,
      valorIngreso: valorUnitario,
    });
    nuevaExistencia.save();
    return res.json({
      msg: "Nueva existencia",
      kardex: nuevaExistencia,
    });
  }
  //Si existe, lo actualizamos (Compra)
  //@ts-ignore
  let cant: number = exis.cantidad + parseFloat(cantidad);
  exis.update({ cantidad: cant });
  res.json({
    msg: "Existencia actualizada",
    kardex: exis,
  });
};

export const postSalidaPutExistenciaVenta = async (
  req: Request,
  res: Response
) => {
  //Buscamos el producto
  const { codigo, cantidad } = req.params;
  const productoBuscado = await Producto.findOne({
    where: {
      [Op.and]: [{ estado: true }, { codigo }],
    },
  });
  if (!productoBuscado) {
    return res.status(400).json({
      msg: "El producto no existe",
    });
  }
  //Hacemos la salida
  const salidaNueva = {
    //@ts-ignore
    producto: productoBuscado.id,
    cantidad,
  };
  const salida = await KardexSalida.build(salidaNueva);
  salida.save();

  const exis = await KardexExistencia.findOne({
    where: {
      [Op.and]: [
        { estado: true },
        //@ts-ignore
        { producto: productoBuscado.id },
      ],
    },
  });

  //Si y solo si existe, lo actualizamos (Venta)
  //@ts-ignore
  let cant: number = exis.cantidad - parseFloat(cantidad);
  if (cant <= 0) {
    return res.status(403).json({
      //Caso contrario indica que no hay stock para vender
      msg: "No hay la cantidad disponible en el inventario",
      kardex: exis,
    });
  }
  exis.update({ cantidad: cant });
  res.json({
    msg: "Existencia actualizada",
    kardex: exis,
  });
};
