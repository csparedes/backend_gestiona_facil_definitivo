import { Request, Response } from 'express';
import EncabezadoVentas from '../models/encabezadoVenta';

export const existeComprobante = (comprobante: string) => {
    return async(req: Request, res: Response, next: Function) => {
        const existeComprobante = await EncabezadoVentas.findAll({
            where: {
                comprobante
            }
        });

        if (!existeComprobante) {
            throw new Error(`El comprobante ${comprobante} ya existe en la base de datos`);
        }

        next();
    }
}