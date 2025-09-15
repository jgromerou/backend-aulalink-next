import Materia from '../models/materia';
import Comision from '../models/comision';

export const crearMateria = async (req, res) => {
  try {
    const materiaNueva = new Materia(req.body);
    await materiaNueva.save();
    res.status(201).json({
      mensaje: 'La materia fue creada correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: 'Error. No se pudo crear la materia',
    });
  }
};

export const obtenerListaMaterias = async (req, res) => {
  try {
    // Obtener query param
    const { search } = req.query;

    let materias;

    if (search) {
      // Si viene el parámetro search, filtramos por nombre (o campo que quieras)
      materias = await Materia.find({
        nombreMateria: { $regex: search, $options: "i" } // "i" = case insensitive
      });
    } else {
      // Si no hay search, traer todas
      materias = await Materia.find();
    }

    res.status(200).json(materias);
  } catch (error) {
    res.status(404).json({
      mensaje: "Error. No se pudo obtener la lista de materias",
    });
  }
};

export const obtenerListaMateriasActivas = async (req, res) => {
  try {
    const materiasActivas = await Categoria.find({ estado: 1 });
    res.status(200).json(materiasActivas);
  } catch (error) {
    res.status(404).json({
      mensaje:
        'Error. No se pudo obtener la lista de materias en estado Activo.',
    });
  }
};

export const obtenerMateria = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id)

    if (!materia) return res.status(404).json({ mensaje: "Materia no encontrada" });

    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error. No se pudo obtener la materia",
      error: error.message
    });
  }
};

export const editarMateria = async (req, res) => {
  try {
    const { nombreMateria, descripcion, nivel, estado } = req.body;
    console.log({nombreMateria, descripcion, nivel, estado})
    const materia = await Materia.findById(req.params.id);
    if (!materia) {
      return res.status(404).json({
        mensaje: "La materia no fue encontrada.",
      });
    }
    materia.nombreMateria = nombreMateria;
    materia.descripcion = descripcion;
    materia.nivel = nivel;
    materia.estado = estado;
    await materia.save();
    res.status(200).json({
      mensaje: "Materia actualizada exitosamente.",
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: "No se pudo actualizar la materia correctamente.",
    });
  }
};

export const borrarMateria = async (req, res) => {
  try {

    const { id } = req.params

    const materia = await Materia.findById(id);
    if (!materia) {
      return res.status(404).json({
        mensaje: "La materia no fue encontrada.",
      });
    }

    const comisionesConMaterias = await Comision.find({ materia: id });

    if (comisionesConMaterias.length > 0) {
      return res.status(400).json({
        mensaje: "No se puede borrar esta materia porque está asignada a una o más comisiones",
      });
    }
    await Materia.findByIdAndDelete(id);
    res.status(200).json({
      mensaje: "Materia eliminada exitosamente.",
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: "No se pudo eliminar la materia.",
    });
  }
};