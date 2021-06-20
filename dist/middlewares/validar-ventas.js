"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeComprobante = void 0;
const encabezadoVenta_1 = __importDefault(require("../models/encabezadoVenta"));
const existeComprobante = (comprobante) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const existeComprobante = yield encabezadoVenta_1.default.findAll({
            where: {
                comprobante
            }
        });
        if (!existeComprobante) {
            throw new Error(`El comprobante ${comprobante} ya existe en la base de datos`);
        }
        next();
    });
};
exports.existeComprobante = existeComprobante;
//# sourceMappingURL=validar-ventas.js.map