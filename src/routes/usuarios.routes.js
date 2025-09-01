import { Router } from "express";
import {validarLogin, validarRegistro, validarUsuario} from "../helpers/validarUsuario";
import {borrarUsuario, cambiarPassword, crearUsuarioAdmin, crearUsuarioProfesorOAlumno, editarUsuario, loginUsuario, obtenerListaUsuarios, obtenerUsuario} from "../controllers/usuarios.controllers";
import validarJWT from "../helpers/tokenVerificacion";

const router = Router();
router.route("/").get(validarJWT, obtenerListaUsuarios)
router.route("/registro").post( validarRegistro, crearUsuarioProfesorOAlumno)
router.route("/login").post( validarLogin,loginUsuario)
router.route("/nuevoAdmin").post([validarJWT, validarUsuario],crearUsuarioAdmin)
router.route("/:id").delete(validarJWT, borrarUsuario).put(validarJWT, editarUsuario).get(validarJWT, obtenerUsuario)
router.route("/nuevopassword/:id").put(validarJWT, cambiarPassword)

export default router;