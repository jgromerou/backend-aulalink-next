import { Router } from "express";
//import validarPedido from "../helpers/validarPedido";
import validarJWT from "../helpers/tokenVerificacion";
import { crearInscripcion, borrarInscripcion, listarInscripciones } from "../controllers/inscripciones.controllers";

const router = Router();
router.route("/").post(crearInscripcion)
router.route("/").get(listarInscripciones);
router.route("/:id").delete(validarJWT,borrarInscripcion)

export default router