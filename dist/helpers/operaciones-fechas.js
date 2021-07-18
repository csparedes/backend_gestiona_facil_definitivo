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
exports.productosPorCaducarse = exports.diferenciaDias = void 0;
const kardexExistencia_1 = __importDefault(require("../models/kardexExistencia"));
const producto_1 = __importDefault(require("../models/producto"));
//Diferencia de días de productos a caducarse
//2021-09-08 - 2021-07-17 = #dias
const diferenciaDias = (diaHoy, diaCaducidad) => {
    const diaHoyUTC = Date.UTC(diaHoy.getFullYear(), diaHoy.getMonth(), diaHoy.getDay());
    const diaCaducidadUTC = Date.UTC(diaCaducidad.getFullYear(), diaCaducidad.getMonth(), diaCaducidad.getDay());
    const divisor = 1000 * 60 * 60 * 24;
    return (diaCaducidadUTC - diaHoyUTC) / divisor;
};
exports.diferenciaDias = diferenciaDias;
const productosPorCaducarse = () => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield kardexExistencia_1.default.findAll({
        where: {
            estado: true,
        },
        include: {
            model: producto_1.default,
            attributes: ['nombre']
        },
        attributes: ["id", "productoId", "fechaCaducidad"],
    });
    const listaProductos = [];
    //retornar la lista de productos que se van a caducar en 1 mes o menos
    productos.forEach((value) => {
        const numeroDias = exports.diferenciaDias(new Date(), 
        //@ts-ignore
        new Date(value["fechaCaducidad"].toString() + "T00:00:00"));
        if (numeroDias <= 30) {
            listaProductos.push(value);
        }
    });
    return listaProductos;
});
exports.productosPorCaducarse = productosPorCaducarse;
//# sourceMappingURL=operaciones-fechas.js.map