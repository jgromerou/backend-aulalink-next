import { Router } from "express";
import { activarComision, borrarComision, consultaComisionesPorMateria, crearComision, desactivarComisión, editarComision, obtenerComision, obtenerComisionesActivas, obtenerComisionesPorMateria, obtenerListaComisiones } from "../controllers/comisiones.controllers";


const router = Router();
router.route("/").get(obtenerListaComisiones)
router.route("/activos").get(obtenerComisionesActivas)
router.route("/nuevo").post(crearComision)
router.route("/:id").get(obtenerComision).delete( borrarComision).put( editarComision)
router.route("/comision/:materia").get(consultaComisionesPorMateria)
router.route("/activar/:id").put( activarComision)
router.route("/desactivar/:id").put( desactivarComisión)
router.get("/materia/:id", obtenerComisionesPorMateria);

export default router;