import Materia from '../models/materia';

export const crearMateria = async (req, res) => {
  try {
    const materiaNueva = new Materia(req.body);
    await materiaNueva.save();
    res.status(201).json({
      mensaje: 'La materia fue creada correctamente',
    });
  } catch (error) {
    res.status(404).json({
      mensaje: 'Error. No se pudo crear la materia',
    });
  }
};

export const obtenerListaMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.status(200).json(materias);
  } catch (error) {
    res.status(404).json({
      mensaje: 'Error. No se pudo obtener la lista de materias',
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
