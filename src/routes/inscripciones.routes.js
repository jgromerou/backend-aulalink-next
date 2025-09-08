import { Router } from "express";
//import validarPedido from "../helpers/validarPedido";
import validarJWT from "../helpers/tokenVerificacion";
import { crearInscripcion, borrarInscripcion, listarInscripciones, obtenerInscripcion, editarInscripcion } from "../controllers/inscripciones.controllers";

const router = Router();
router.route("/nuevo").post(crearInscripcion)
router.route("/").get(listarInscripciones);
router.route("/:id").delete(borrarInscripcion).get(obtenerInscripcion).put(editarInscripcion);

export default router