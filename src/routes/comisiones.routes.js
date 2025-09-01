import { Router } from "express";
//import validarProducto from "../helpers/validarProducto";
import { activarComision, borrarComision, consultaComisionesPorMateria, crearComision, desactivarComisión, editarComision, obtenerComision, obtenerComisionesActivas, obtenerListaComisiones } from "../controllers/comisiones.controllers";
import validarJWT from "../helpers/tokenVerificacion";


const router = Router();
router.route("/").post([validarJWT], crearComision).get(obtenerListaComisiones)
router.route("/activos").get(obtenerComisionesActivas)
router.route("/:id").get(obtenerComision).delete(validarJWT, borrarComision).put([validarJWT], editarComision)
router.route("/comision/:materia").get(consultaComisionesPorMateria)
router.route("/activar/:id").put(validarJWT, activarComision)
router.route("/desactivar/:id").put(validarJWT, desactivarComisión)

export default router;