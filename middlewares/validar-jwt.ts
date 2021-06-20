import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
// const Usuario = import('../models/usuario');

const validarJWT = async (req: Request, res: Response,next:Function) => {
    const token = req.header('x-token');
    const secretKey = process.env.SECRETORPRIVATEKEY || 'EsM1SuperCl4v3100%realNof4k3';
    
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        })
    }

    try {
        const uid = jwt.verify(token, secretKey);
        
        //@ts-ignore
        const nombre = uid.uid;
        const usuario = await Usuario.findOne({
            where: {
                nombre
            }
        });

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido, el usuario no existe en la Base de Datos"
            });
        }
        
        next();

        

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        })
    }
}

export default validarJWT;