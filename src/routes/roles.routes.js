import { Router } from "express";
//TODO: Ver para roles la validación
// import {validarLogin, validarRegistro, validarUsuario} from "../helpers/validarUsuario";
import validarJWT from "../helpers/tokenVerificacion";
import { crearRol, editarRol, borrarRol, obtenerRol, obtenerListaRoles } from "../controllers/rol.controllers";

const router = Router();
router.route("/").get(validarJWT, obtenerListaRoles)
router.route("/nuevo").post(crearRol)
router.route("/:id").delete(validarJWT, borrarRol).put(validarJWT, editarRol).get(validarJWT, obtenerRol)

export default router;