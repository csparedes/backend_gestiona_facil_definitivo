import express, { Application } from "express";
import cors from "cors";

import rutasUsuario from "../routes/usuarios";
import rutasLogin from "../routes/login";
import rutasCategoria from "../routes/categorias";
import rutasProductos from "../routes/productos";
import rutasDetalleVenta from "../routes/detalleVenta";
import rutasCliente from "../routes/clientes";
import rutasEncabezadoVenta from "../routes/encabezadoVenta";
import rutasDetalleCompra from "../routes/detalleCompra";
import rutasRol from "../routes/rol";
import rutasEncabezadoCompra from "../routes/encabezadoCompra";
import rutasProveedores from "../routes/proveedores";
import rutasKardex from "../routes/kardex";
import rutasVentas from "../routes/ventas";
import rutasCompras from "../routes/compras";
import rutasNotificaciones from "../routes/notificaciones";

class Server {
  private app: Application;
  private port: string;
  private server: any;
  private io: any;
  private apiPaths = {
    usuario: "/api/usuarios",
    login: "/api/login",
    categoria: "/api/categorias",
    producto: "/api/productos",
    detalleVenta: "/api/detalleVenta",
    cliente: "/api/clientes",
    encabezadoVenta: "/api/encabezadoVenta",
    detalleCompra: "/api/detalleCompra",
    rol: "/api/rol",
    encabezadoCompra: "/api/encabezadoCompra",
    proveedor: "/api/proveedores",
    kardex: "/api/kardex",
    ventas: "/api/ventas",
    compras: "/api/compras",
    notificaciones: "/api/notificaciones",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.middlewares();
    this.routes();
    this.socket();
    this.firebaseCloudMessaging();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.apiPaths.usuario, rutasUsuario);
    this.app.use(this.apiPaths.login, rutasLogin);
    this.app.use(this.apiPaths.categoria, rutasCategoria);
    this.app.use(this.apiPaths.producto, rutasProductos);
    this.app.use(this.apiPaths.detalleVenta, rutasDetalleVenta);
    this.app.use(this.apiPaths.cliente, rutasCliente);
    this.app.use(this.apiPaths.encabezadoVenta, rutasEncabezadoVenta);
    this.app.use(this.apiPaths.detalleCompra, rutasDetalleCompra);
    this.app.use(this.apiPaths.rol, rutasRol);
    this.app.use(this.apiPaths.encabezadoCompra, rutasEncabezadoCompra);
    this.app.use(this.apiPaths.proveedor, rutasProveedores);
    this.app.use(this.apiPaths.kardex, rutasKardex);
    this.app.use(this.apiPaths.ventas, rutasVentas);
    this.app.use(this.apiPaths.compras, rutasCompras);
    this.app.use(this.apiPaths.notificaciones, rutasNotificaciones);
  }

  socket() {
    this.io.on("connection", (client: any) => {
      console.log(`Cliente Conectado`);

      client.on("disconnection", () => {
        console.log(`Cliente desconectado`);
      });
    });
  }
  firebaseCloudMessaging() {
    const admin = require("firebase-admin");
    admin.initializeApp({
      credential: admin.credential.cert({
        project_id: process.env['FIREBASE_PROJECT_ID'],
        private_key: process.env['FIREBASE_PRIVATE_KEY'],
        client_email: process.env['FIREBASE_CLIENT_EMAIL'],
      }),
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(
        "Servidor de Gestiona Facil on line en el puerto: ",
        this.port
      );
    });
  }
}

export default Server;
