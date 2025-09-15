import resultadoValidacion from "./resultadoValidacion";
import { check } from "express-validator";

const validarMateria = [
    check(`nombreMateria`)
    .notEmpty()
    .withMessage("El nombre de la materia es obligatoria")
    .isString()
    .isLength({min:2, max:150})
    .withMessage("El nombre de la materia debe contener entre 2 y 150 caracteres"),
    check(`descripcion`)
    .notEmpty()
    .withMessage("La descripción de la materia es obligatoria")
    .isString()
    .isLength({min:2, max:255})
    .withMessage("La descripción de la materia debe contener entre 2 y 255 caracteres"),

    (req, res, next) => {resultadoValidacion(req, res, next)}
]

export default validarMateria; 