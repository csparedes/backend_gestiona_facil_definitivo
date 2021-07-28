import { Request, Response } from 'express';
import Percha from '../models/perchas';
import Producto from '../models/producto';

export const getPerchas = async (req: Request, res: Response) => {
    const perchas = await Percha.findAll({
        where: {
            estado: true
        }
    });

    if (!perchas) {
        return res.status(400).json({
            msg: "No hay productos relacionados"
        });
    }


    res.json({
        msg: "Lista de productos relacionados",
        perchas
    });

}

export const postCrearEnlaceCajaProducto = async (req: Request, res: Response) => {
    const { cajaId, articuloId } = req.body;
    const nuevo = {
        cajaId,
        articuloId
    };

    const nuevoEnlace = await Percha.build(nuevo);
    nuevoEnlace.save();

    res.json({
        msg: "Nuevo enlace creado"
    });
}


export const putCrearEnlaceCajaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;

    const perchaBuscada = await Percha.findByPk(id);
    if (!perchaBuscada) {
        return res.status(400).json({
            msg: "No se encontró el enlace de los productos"
        });
    }

    const { cajaId, articuloId } = req.body;
    const nuevo = {
        cajaId,
        articuloId
    };

    perchaBuscada.update(nuevo);

    res.json({
        msg: "Se ha actualizado el enlace del producto"
    });
}

export const deleteEnlaceCajaProducto = async (req: Request, res: Response) => {
    const { id } = req.params;

    const perchaBuscada = await Percha.findByPk(id);
    if (!perchaBuscada) {
        return res.status(400).json({
            msg: "No se encontró el enlace de los productos"
        });
    }

   

    perchaBuscada.update({estado: false});

    res.json({
        msg: "Se ha eliminado el enlace del producto"
    });
}
