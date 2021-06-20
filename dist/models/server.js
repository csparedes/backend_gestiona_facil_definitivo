"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
const cors_1 = __importDefault(require("cors"));
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
        };
        this.app = express_1.default();
        this.port = process.env.PORT;
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.middlewares();
        this.routes();
        this.socket();
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
    }
    socket() {
        this.io.on("connection", (client) => {
            console.log(`Cliente Conectado`);
            client.on("disconnection", () => {
                console.log(`Cliente desconectado`);
            });
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