import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Rol from '../models/rol';

export const getRoles = async (req: Request, res: Response) => {
    const roles = await Rol.findAll({ where: { estado: true } });
    if (!roles) {
        return res.status(400).json({
            msg: "No se ha encontrado ningún rol disponible"
        });
    }

    res.json({
        msg: "Lista de Roles",
        roles
    });
}

export const getRolesLike = async (req: Request, res: Response) => {
    const { query } = req.params;
    const roles = await Rol.findAll({
        where: {
            [Op.and]: [
                {estado: true},
                {rol: { [Op.like]: `%${query}%` }}
            ]
        }
    });
    if (!roles) {
        return res.status(400).json({
            msg: "No se han encontrado roles con ese parámetro"
        });
    }

    res.json({
        msg:"Roles disponibles",
        roles
    })
}

export const postRol = async (req: Request, res: Response) => {
    const { rol } = req.body;
    const rolBuscado = await Rol.findOne({ where: { rol } });
    if (rolBuscado) {
        return res.status(400).json({
            msg: "Ese rol ya existe"
        });
    }
    const rolCreado = await Rol.build({
        rol,
        estado: true
    });
    rolCreado.save();
    res.json({
        msg: "Se ha creado un nuevo rol",
        rol: rolCreado
    });
}

export const deleteRol = async (req: Request, res: Response) => {
    const { rol } = req.params;
    const rolBuscado = await Rol.findOne({ where: { rol } });
    if (!rolBuscado) {
        return res.status(400).json({
            msg: "Ese rol no existe"
        });
    }

    await rolBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el Rol" + rol,
        rol: rolBuscado
    });
}