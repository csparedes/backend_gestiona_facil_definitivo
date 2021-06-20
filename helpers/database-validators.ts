import { Op } from 'sequelize';
import Usuario from '../models/usuario';
import Categoria from '../models/categoria';

//Categorias
export const existeCategoria = async (id: string) => {
    const categoria = await Categoria.findOne({
        where: {
            [Op.and]: [
                { id },
                { estado: true }
            ]
        }
    });

    if (!categoria) {
        throw new Error('La categoria no existe en la Base de Datos');
    }
}

export const existeNombreCategoria = async (nombre: string) => {
    const categoria = await Categoria.findOne({
        where: {
            [Op.and]: [
                { nombre },
                { estado: true }
            ]
        }
    });

    if (categoria) {
        throw new Error('Ya existe esa categoria en la Base de Datos');
    }
}

export const existeEmail = async(email: string) => {
    const usuario = await Usuario.findOne({
        where: {
            email
        }
    });
    if (usuario) {
        throw new Error('El correo ya existe en la Base de Datos');
    }
}

export const existeId = async(id: string) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error(`El ID: ${id}, no existe en la base de datos`);
    }
}

export const identificacionLength = async (identificacion: string) => {
    const regex = /^[0-9]*$/;
    if (identificacion.length < 10){
        throw new Error('La identificación debe tener mínimo 10 dígitos');
    } else if (identificacion.length > 13) {
        throw new Error('La identificación debe tener máximo 13 dígitos');
    } else if (!identificacion.match(regex)) {
        throw new Error('La identificación debe contener sólo números');
    }
}