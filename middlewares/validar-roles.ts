import { Request, Response } from 'express';
import Rol from '../models/rol';

export const esAdminRol = (rol: string) => {
    return (req: Request, res: Response, next: Function) => {
        /*
        * CUIDADO AMIGO, CHEQUEAR ESTAS VARIABLES
        */
        const { rol } = req.body;
        if (rol !== '1') {
            return res.status(401).json({
                msg: `Usted no es administrador, acceso denegado`
            })
        }

        next();

    }
}

export const tieneRol = (roles:string[]) => {
    return (req: Request, res: Response, next: Function)=>{
        if (!req.body) {
            return res.status(500).json({
                msg: 'Verifique el token primero'
            })
        }
        if (!roles.includes(req.body.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

    }
}

export const existeRol = (rol: string)=> {
    return async (req: Request, res: Response, next: Function) => {
        const existeRol = await Rol.findOne({
            where: {
                rol
            }
        });

        if (!existeRol) {
            throw new Error(`El rol ${rol} no existe en la base de datos`)
        }
    }
}