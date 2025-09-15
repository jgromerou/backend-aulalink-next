import { Router } from "express";
import { crearInscripcion, borrarInscripcion, listarInscripciones, obtenerInscripcion, editarInscripcion, verificarInscripcion } from "../controllers/inscripciones.controllers";

const router = Router();
router.route("/nuevo").post(crearInscripcion)
router.route("/").get(listarInscripciones);
router.route("/:id").delete(borrarInscripcion).get(obtenerInscripcion).put(editarInscripcion);
router.post("/verificar-inscripcion", verificarInscripcion);

export default router