import { Router } from 'express';
import { borrarMateria, crearMateria, editarMateria, obtenerListaMaterias, obtenerListaMateriasActivas, obtenerMateria } from '../controllers/materias.controllers';
import validarMateria from '../helpers/validarMateria';
import validarJWT from '../helpers/tokenVerificacion';
const router = Router();
router.route('/').get(obtenerListaMaterias);
router.route("/nuevo").post(crearMateria)
router.route('/activas').get(obtenerListaMateriasActivas);
router.route("/:id").get( obtenerMateria).put(editarMateria).delete(borrarMateria)

export default router;
