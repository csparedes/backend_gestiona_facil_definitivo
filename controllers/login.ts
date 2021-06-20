import { Request, Response } from 'express';
import Usuario from "../models/usuario";
import bcrypt from 'bcrypt';
import generarJWT from '../helpers/generar-jwt';

export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        //existe usuario
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        
        
        //@ts-ignore
        if (!usuario) {
            return res.status(401).json({
                msg: "El usuario no existe"
            });
        }
        //verificar contraseña
        //@ts-ignore
        const checkPassword = bcrypt.compareSync(password, usuario.password);
        if (!checkPassword) {
            return res.status(400).json({
                msg: 'Usuario o password incorrectos (password)'
            });
        }

        //generar el token
        //@ts-ignore
        const token = await generarJWT([usuario.rol, usuario.nombre, usuario.email]);
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Comuníquese con el Administrador"
        });
        
    }
}