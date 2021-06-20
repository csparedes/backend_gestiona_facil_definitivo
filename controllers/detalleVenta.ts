import { Request, Response } from 'express';
import DetalleVenta from '../models/detalleVenta';

export const getDetallesVentas = async (req: Request, res: Response) => {
    const detalles = await DetalleVenta.findAll({
        where: {
            estado: true
        }
    });

    if (!detalles) {
        return res.status(400).json({
            msg: "No hay detalles de venta"
        })
    }

    res.json({
        msg: "Lista de Detalles de Venta",
        detalles
    });
}

export const getDetalleVentaPorComprobante = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detalles = await DetalleVenta.findAll({
        where: {
            comprobante,
            estado: true
        }
    });

    if (!detalles) {
        return res.status(400).json({
            msg: "El detalle de venta no existe"
        })
    }

    res.json({
        msg: "Detalle de Venta N°: "+comprobante,
        detalles
    })
}

export const postDetalleVenta = async (req: Request, res: Response) => {
    const { comprobante, cantidad, producto, valorUnitario } = req.body;
    const nuevoDetalle = {
        comprobante,
        cantidad,
        producto,
        valorUnitario,
        estado: true
    };

    const detalle = await DetalleVenta.build(nuevoDetalle);
    detalle.save();
    res.json({
        msg: "Se ha creado un nuevo producto",
        detalle
    });
}

export const putDetalleVenta= async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const { cantidad, producto, valorUnitario } = req.body;
    
    const detalleBuscado = await DetalleVenta.findOne({
        where: {
            comprobante,
            estado: true
        }

    });

    if (!detalleBuscado) {
        return res.status(400).json({
            msg: "El detalle de venta no existe"
        })
    }
    const nuevoDetalle = {
        comprobante,
        cantidad,
        producto,
        valorUnitario,
        estado: true
    };

    await detalleBuscado.update(nuevoDetalle);
    res.json({
        msg: "Se ha actualizado el producto",
        detalle: detalleBuscado
    });
}

export const deleteDetalleVenta = async (req: Request, res: Response) => {
   const { comprobante } = req.params;
    
    const detalleBuscado = await DetalleVenta.findOne({
        where: {
            comprobante,
            estado: true
        }
    });

    if (!detalleBuscado) {
        return res.status(400).json({
            msg: "El detalle de venta no existe"
        })
    }

    await detalleBuscado.update({estado:false});
    res.json({
        msg: "Se ha eliminado el producto",
        detalle: detalleBuscado
    });
}