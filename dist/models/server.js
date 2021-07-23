"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const login_1 = __importDefault(require("../routes/login"));
const categorias_1 = __importDefault(require("../routes/categorias"));
const productos_1 = __importDefault(require("../routes/productos"));
const detalleVenta_1 = __importDefault(require("../routes/detalleVenta"));
const clientes_1 = __importDefault(require("../routes/clientes"));
const encabezadoVenta_1 = __importDefault(require("../routes/encabezadoVenta"));
const detalleCompra_1 = __importDefault(require("../routes/detalleCompra"));
const rol_1 = __importDefault(require("../routes/rol"));
const encabezadoCompra_1 = __importDefault(require("../routes/encabezadoCompra"));
const proveedores_1 = __importDefault(require("../routes/proveedores"));
const kardex_1 = __importDefault(require("../routes/kardex"));
const ventas_1 = __importDefault(require("../routes/ventas"));
const compras_1 = __importDefault(require("../routes/compras"));
const notificaciones_1 = __importDefault(require("../routes/notificaciones"));
const detallePedido_1 = __importDefault(require("../routes/detallePedido"));
const encabezadoPedido_1 = __importDefault(require("../routes/encabezadoPedido"));
const pedidos_1 = __importDefault(require("../routes/pedidos"));
class Server {
    constructor() {
        this.apiPaths = {
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
            detallePedido: "/api/detallePedido",
            encabezadoPedido: "/api/encabezadoPedido",
            pedidos: "/api/pedidos",
        };
        this.app = express_1.default();
        this.port = process.env.PORT;
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.middlewares();
        this.routes();
        this.socket();
        this.firebaseCloudMessaging();
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.usuario, usuarios_1.default);
        this.app.use(this.apiPaths.login, login_1.default);
        this.app.use(this.apiPaths.categoria, categorias_1.default);
        this.app.use(this.apiPaths.producto, productos_1.default);
        this.app.use(this.apiPaths.detalleVenta, detalleVenta_1.default);
        this.app.use(this.apiPaths.cliente, clientes_1.default);
        this.app.use(this.apiPaths.encabezadoVenta, encabezadoVenta_1.default);
        this.app.use(this.apiPaths.detalleCompra, detalleCompra_1.default);
        this.app.use(this.apiPaths.rol, rol_1.default);
        this.app.use(this.apiPaths.encabezadoCompra, encabezadoCompra_1.default);
        this.app.use(this.apiPaths.proveedor, proveedores_1.default);
        this.app.use(this.apiPaths.kardex, kardex_1.default);
        this.app.use(this.apiPaths.ventas, ventas_1.default);
        this.app.use(this.apiPaths.compras, compras_1.default);
        this.app.use(this.apiPaths.notificaciones, notificaciones_1.default);
        this.app.use(this.apiPaths.detallePedido, detallePedido_1.default);
        this.app.use(this.apiPaths.encabezadoPedido, encabezadoPedido_1.default);
        this.app.use(this.apiPaths.pedidos, pedidos_1.default);
    }
    socket() {
        this.io.on("connection", (client) => {
            console.log(`Cliente Conectado`);
            client.on("disconnection", () => {
                console.log(`Cliente desconectado`);
            });
        });
    }
    firebaseCloudMessaging() {
        const admin = require("firebase-admin");
        // var serviceAccount = require("../gestionafacil2021-firebase-adminsdk-ohgs5-f429a84acc.json");
        // var serviceAccount = JSON.parse(process.env["FIREBASE_ADMIN_KEYS"]);
        admin.initializeApp({
            // credential: admin.credential.cert({serviceAccount}),
            credential: admin.credential.cert({
                type: process.env["FIREBASE_TYPE"],
                project_id: process.env["FIREBASE_PROJECT_ID"],
                private_key_id: process.env["FIREBASE_PRIVATE_KEY_ID"],
                private_key: process.env["FIREBASE_PRIVATE_KEY"].replace(/\\n/g, '\n'),
                client_email: process.env["FIREBASE_CLIENT_EMAIL"],
                client_id: process.env["FIREBASE_CLIENT_ID"],
                auth_uri: process.env["FIREBASE_AUTH_URI"],
                token_uri: process.env["https://oauth2.googleapis.com/token"],
                auth_provider_x509_cert_url: process.env["https://www.googleapis.com/oauth2/v1/certs"],
                client_x509_cert_url: process.env["FIREBASE_CLIENT_X509_CERT_URL"]
            }),
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor de Gestiona Facil on line en el puerto: ", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map