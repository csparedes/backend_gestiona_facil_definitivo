import { Request, Response } from 'express';
import { Op } from 'sequelize';
import DetallePedido from '../models/detallePedido';

export const getDetallesPedidos = async(req: Request, res: Response) => {
    const detalles = await DetallePedido.findAll({ where: { estado: true } });
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

export const getDetallePedido = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detalle = await DetallePedido.findOne({ where: { comprobante } });
    if (!detalle) {
        return res.status(400).json({
            msg: "No existe aquel Detalle de Pedido"
        });
    }
    res.json({
        msg: "Detalle de pedido encontrado",
        detalle
    });
}

export const getDetallesPedidoLike = async (req: Request, res: Response) => {
    const { query } = req.params;
    const detalles = await DetallePedido.findOne({ where:{ comprobante: {[Op.like]: query}}  });
    if (!detalles) {
        return res.status(400).json({
            msg: "No existe aquel Detalle de Pedido"
        });
    }
    res.json({
        msg: "Detalle de pedido encontrado",
        detalles
    });
}

export const postDetallePedido = async (req: Request, res: Response) => {
    const { comprobante, cantidad, producto, valorUnitario } = req.body;
    const detalleCompraBuscado = await DetallePedido.findOne({ where: { comprobante } });
    if (detalleCompraBuscado) {
        return res.status(400).json({
            msg: "Ya existe el detalle de pedido: " + comprobante
        });
    }

    const nuevoDetalle = {
        comprobante, cantidad, producto, valorUnitario, estado: true
    };
    const detalle = await DetallePedido.build(nuevoDetalle);
    detalle.save();

    res.json({
        msg: "se ha creado un nuevo detalle de compra",
        detalle
    });
}

export const putDetallePedido = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detallePedidoBuscado = await DetallePedido.findOne({ where: { comprobante } });
    if (!detallePedidoBuscado) {
        return res.status(400).json({
            msg: "No existe el detalle de pedido: " + comprobante
        });
    }

    const { cantidad, producto, valorUnitario } = req.body;
     const nuevoDetalle = {
        comprobante, cantidad, producto, valorUnitario, estado: true
    };
    await detallePedidoBuscado.update(nuevoDetalle);
    res.json({
        msg: "se ha actualizado el detalle de pedido",
        detalle: detallePedidoBuscado
    });
}

export const deleteDetallePedido = async (req: Request, res: Response) => {
    const { comprobante } = req.params;
    const detallePedidoBuscado = await DetallePedido.findOne({ where: { comprobante } });
    if (!detallePedidoBuscado) {
        return res.status(400).json({
            msg: "No existe el detalle de compra: " + comprobante
        });
    }

    await detallePedidoBuscado.update({estado: false});
    res.json({
        msg: "se ha eliminado el detalle de compra",
        detalle: detallePedidoBuscado
    });
}