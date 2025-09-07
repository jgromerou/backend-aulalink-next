import { Router } from "express";
//import validarProducto from "../helpers/validarProducto";
import { activarComision, borrarComision, consultaComisionesPorMateria, crearComision, desactivarComisión, editarComision, obtenerComision, obtenerComisionesActivas, obtenerListaComisiones } from "../controllers/comisiones.controllers";
import validarJWT from "../helpers/tokenVerificacion";


const router = Router();
router.route("/").get(obtenerListaComisiones)
router.route("/activos").get(obtenerComisionesActivas)
router.route("/nuevo").post(crearComision)
router.route("/:id").get(obtenerComision).delete( borrarComision).put( editarComision)
router.route("/comision/:materia").get(consultaComisionesPorMateria)
router.route("/activar/:id").put( activarComision)
router.route("/desactivar/:id").put( desactivarComisión)

export default router;