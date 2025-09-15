import { Router } from "express";
import { crearRol, editarRol, borrarRol, obtenerRol, obtenerListaRoles } from "../controllers/rol.controllers";

const router = Router();
router.route("/").get(obtenerListaRoles)
router.route("/nuevo").post(crearRol)
router.route("/:id").delete( borrarRol).put( editarRol).get( obtenerRol)

export default router;