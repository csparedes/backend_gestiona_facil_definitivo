import KardexExistencia from "../models/kardexExistencia";
import Producto from "../models/producto";

//Diferencia de días de productos a caducarse
//2021-09-08 - 2021-07-17 = #dias
export const diferenciaDias = (diaHoy: Date, diaCaducidad: Date) => {
  const diaHoyUTC = Date.UTC(
    diaHoy.getFullYear(),
    diaHoy.getMonth(),
    diaHoy.getDay()
  );
  const diaCaducidadUTC = Date.UTC(
    diaCaducidad.getFullYear(),
    diaCaducidad.getMonth(),
    diaCaducidad.getDay()
  );
  const divisor = 1000 * 60 * 60 * 24;
  return (diaCaducidadUTC - diaHoyUTC) / divisor;
};

export const productosPorCaducarse = async () => {
  const productos = await KardexExistencia.findAll({
    where: {
      estado: true,
      },
      include: {
          model: Producto,
          attributes:['nombre']
      },
    attributes: ["id","productoId","fechaCaducidad"],
  });
  const listaProductos: any[] = [];
  //retornar la lista de productos que se van a caducar en 1 mes o menos
    productos.forEach((value) => {
    const numeroDias = diferenciaDias(
      new Date(),
      //@ts-ignore
      new Date(value["fechaCaducidad"].toString() + "T00:00:00")
    );
    if (numeroDias <= 30) {
        listaProductos.push(value);
    }
    });
  return listaProductos;
};
