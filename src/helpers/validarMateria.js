import resultadoValidacion from "./resultadoValidacion";
import { check } from "express-validator";

const validarMateria = [
    check(`nombreMateria`)
    .notEmpty()
    .withMessage("El nombre de la materia es obligatoria")
    .isString()
    .isLength({min:2, max:30})
    .withMessage("El nombre de la materia debe contener entre 2 y 30 caracteres"),
    check(`descripcion`)
    .notEmpty()
    .withMessage("La descripción de la materia es obligatoria")
    .isString()
    .isLength({min:2, max:150})
    .withMessage("La descripción de la materia debe contener entre 2 y 150 caracteres"),
    // check(`estado`)
    // .notEmpty()
    // .withMessage("El estado es un dato obligatorio")
    // .isIn([1,0])
    // .withMessage("Debe elegir una opción válida"),

    (req, res, next) => {resultadoValidacion(req, res, next)}
]

export default validarMateria; 