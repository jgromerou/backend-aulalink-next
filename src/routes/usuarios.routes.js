import { Router } from "express";
import {validarLogin, validarRegistro, validarUsuario} from "../helpers/validarUsuario";
import {borrarUsuario, cambiarPassword, crearUsuarioAdmin, crearUsuarioProfesorOAlumno, editarUsuario, loginUsuario, obtenerListaUsuarios, obtenerUsuario} from "../controllers/usuarios.controllers";
import validarJWT from "../helpers/tokenVerificacion";

const router = Router();
router.route("/").get( obtenerListaUsuarios)
router.route("/registro").post( validarRegistro, crearUsuarioProfesorOAlumno)
router.route("/login").post( validarLogin,loginUsuario)
router.route("/nuevoAdmin").post( validarUsuario, crearUsuarioAdmin)
router.route("/:id").delete( borrarUsuario).put( editarUsuario).get( obtenerUsuario)
router.route("/nuevopassword/:id").put( cambiarPassword)

export default router;