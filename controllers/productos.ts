require('../models/asociaciones');
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Producto from '../models/producto';
import Categoria from '../models/categoria';

export const getProductos = async (req: Request, res: Response) => {
    const productos = await Producto.findAll({
        where: {
            estado:true
        },
        attributes: ['id','nombre', 'precioVenta', 'codigo'],
        include: {
            model: Categoria,
            attributes: ['id','nombre']
        }
    });

    if (!productos) {
        return res.status(400).json({
            msg: "No hay productos"
        });
    }

    res.json({
        msg: "Lista de productos",
        productos
    });
}

export const getProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const producto = await Producto.findByPk(id, {
        attributes: ['nombre','precioVenta','codigo']
    });
    if (!producto) {
        return res.status(400).json({
            msg: "No hay producto"
        });
    }

    res.json({
        msg: "Se ha encontrado el producto",
        producto
    });
}

export const getProductoPorCodigo = async (req: Request, res: Response) => {
    const { codigo } = req.params;
    const producto = await Producto.findOne({
        where:{codigo},
        attributes: ['nombre','precioVenta','codigo','categoriumId'],
        include: Categoria
    });
    if (!producto) {
        return res.status(400).json({
            msg: "No hay producto"
        });
    }

    res.json({
        msg: "Se ha encontrado el producto por código",
        producto
    });
}

export const getProductoPorNombre = async (req: Request, res: Response) => {
    const { nombre } = req.params;
    const productos = await Producto.findAll({
        where: {
            nombre: {
               [Op.like]: `%${nombre}%`
            },
            estado: true
        },
        attributes: ['nombre','precioVenta','codigo'],
        include: Categoria,
        order: [["createdAt", "DESC"]],
    });
    if (!productos) {
        return res.status(400).json({
            msg: "No hay producto"
        });
    }

    res.json({
        msg: "Se ha encontrado el producto por código",
        productos
    });
}

export const getProductosPorCategoria = async (req: Request, res: Response) => {
    const { categoriaId } = req.params;
    const productos = await Producto.findAll({
        where: {
            categoriumId: categoriaId,
            estado: true
        }
    });

    if (!productos) {
        return res.status(400).json({
            msg: "No hay productos"
        });
    }

    res.json({
        msg: "Lista de productos por categoría",
        productos
    });

}

export const postProducto = async (req: Request, res: Response) => {
    const { nombre, categoriumId, codigo, precioVenta } = req.body;
    const productoCodigo = await Producto.findOne({
        where:{codigo}
    });
    if (productoCodigo) {
        return res.status(401).json({
            msg: "El producto ya existe"
        })
    }

    const productoNuevo = {
        nombre,
        categoriumId,
        codigo,
        precioVenta,
        estado: true
    }

    const producto = await Producto.build(productoNuevo);
    producto.save();

    res.json({
        msg: "Se ha creado un nuevo producto",
        producto
    })
}

export const putProducto = async (req: Request, res: Response) => {
    const { codigo } = req.params;
    const productoBuscado = await Producto.findOne({
        where: {
            codigo
        }
    });

    if (!productoBuscado) {
        return res.status(400).json({
            msg: "El producto no existe en el inventario"
        })
    }

    const { nombre, categoriumId, precioVenta } = req.body;
    const productoNuevo = {
        nombre,
        categoriumId,
        codigo,
        precioVenta,
        estado: true
    };

    await productoBuscado.update(productoNuevo);
    
    res.json({
        msg: "Se ha actualizado un producto",
        producto: productoBuscado
    })

}

export const deleteProducto = async (req: Request, res: Response) => {
    const { codigo } = req.params;
    const productoBuscado = await Producto.findOne({
        where: {
            codigo
        }
    });

    if (!productoBuscado) {
        return res.status(400).json({
            msg: "El producto no existe en el inventario"
        })
    }

    await productoBuscado.update({ estado: false });
    res.json({
        msg: "Se ha eliminado el producto"
    })
}