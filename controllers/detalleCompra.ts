import { Request, Response } from 'express';
import { Op } from 'sequelize';
import DetalleCompra from '../models/detalleCompra';

export const getDetallesCompras = async(req: Request, res: Response) => {
    const detalles = await DetalleCompra.findAll({ where: { estado: true } });
    if (!detalles) {
        return res.status(400).json({
            msg: "No existen Detalles de Compras"
        });
    }

    res.json({
        msg: "Lista de encabezados de compra",
        detalles
    });
}

export const getDetalleCompra = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detalle = await DetalleCompra.findOne({ where: { comprobante } });
    if (!detalle) {
        return res.status(400).json({
            msg: "No existe aquel Detalle de Compra"
        });
    }
    res.json({
        msg: "Detalle de compra encontrado",
        detalle
    });
}

export const getDetallesCompraLike = async (req: Request, res: Response) => {
    const { query } = req.params;
    const detalles = await DetalleCompra.findOne({ where:{ comprobante: {[Op.like]: query}}  });
    if (!detalles) {
        return res.status(400).json({
            msg: "No existe aquel Detalle de Compra"
        });
    }
    res.json({
        msg: "Detalle de compra encontrado",
        detalles
    });
}

export const postDetalleCompra = async (req: Request, res: Response) => {
    const { comprobante, cantidad, producto, valorUnitario } = req.body;
    const detalleCompraBuscado = await DetalleCompra.findOne({ where: { comprobante } });
    if (detalleCompraBuscado) {
        return res.status(400).json({
            msg: "Ya existe el detalle de compra: " + comprobante
        });
    }

    const nuevoDetalle = {
        comprobante, cantidad, producto, valorUnitario, estado: true
    };
    const detalle = await DetalleCompra.build(nuevoDetalle);
    detalle.save();

    res.json({
        msg: "se ha creado un nuevo detalle de compra",
        detalle
    });
}

export const putDetalleCompra = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detalleCompraBuscado = await DetalleCompra.findOne({ where: { comprobante } });
    if (!detalleCompraBuscado) {
        return res.status(400).json({
            msg: "No existe el detalle de compra: " + comprobante
        });
    }

    const { cantidad, producto, valorUnitario } = req.body;
     const nuevoDetalle = {
        comprobante, cantidad, producto, valorUnitario, estado: true
    };
    await detalleCompraBuscado.update(nuevoDetalle);
    res.json({
        msg: "se ha actualizado el detalle de compra",
        detalle: detalleCompraBuscado
    });
}

export const deleteDetalleCompra = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detalleCompraBuscado = await DetalleCompra.findOne({ where: { comprobante } });
    if (!detalleCompraBuscado) {
        return res.status(400).json({
            msg: "No existe el detalle de compra: " + comprobante
        });
    }

    await detalleCompraBuscado.update({estado: false});
    res.json({
        msg: "se ha eliminado el detalle de compra",
        detalle: detalleCompraBuscado
    });
}