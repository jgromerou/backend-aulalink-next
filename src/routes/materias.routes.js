import { Router } from 'express';
import { crearMateria, obtenerListaMaterias, obtenerListaMateriasActivas } from '../controllers/materias.controllers';
import validarMateria from '../helpers/validarMateria';
import validarJWT from '../helpers/tokenVerificacion';
const router = Router();
router.route('/').post([validarJWT,validarMateria],crearMateria).get(obtenerListaMaterias);
router.route('/activas').get(obtenerListaMateriasActivas);

export default router;
