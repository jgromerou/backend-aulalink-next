import Comision from "../models/comision";
import Inscripcion from "../models/inscripcion";
import Materia from '../models/materia';
import Usuario from '../models/usuario';

export const crearInscripcion = async (req, res) => {
  try {
    const { comision, materia, usuario, fechaInscripcion } = req.body;

    const materiaDoc = await Materia.findById( materia );
    if (!materiaDoc) return res.status(404).json({ msg: 'Materia no encontrada' });

    const comisionDoc = await Comision.findById( comision );
    if (!comisionDoc) return res.status(404).json({ msg: 'Comisión no encontrada' });

    const usuarioDoc = await Usuario.findById( usuario );
    if (!usuarioDoc) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const inscripcion = new Inscripcion({
      comision: comisionDoc._id,
      materia: materiaDoc._id,
      usuario: usuarioDoc._id,
      fechaInscripcion: fechaInscripcion || Date.now(),
      estado: 1
    });

    await inscripcion.save();

    return res.status(201).json({
      msg: 'Inscripción creada correctamente',
      inscripcion
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al crear la inscripción' });
  }
};

export const listarInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.find()
      .populate('comision') 
      .populate('materia')  
      .populate('usuario', 'nombreUsuario apellidoUsuario dni email') 
      .exec();

    return res.status(200).json(inscripciones);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al obtener las inscripciones' });
  }
};

export const borrarInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findById(req.params.id);
    if (!inscripcion) {
      return res.status(404).json({
        mensaje: "La inscripción no fue encontrada.",
      });
    }
    await Inscripcion.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "La inscripción fue eliminada exitosamente.",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo eliminar la inscripción.",
    });
  }
};

export const obtenerInscripcion = async (req, res) =>{
  try{
     const inscripcion = await Inscripcion.findById(req.params.id);
     res.status(200).json(inscripcion);
  }catch(error){
      res.status(404).json({
          mensaje: "Error, no se pudo obtener la inscripción del alumno."
      })
  }
}

export const editarInscripcion = async (req, res) => {
  try {
    await Inscripcion.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: 'La inscripción fue editada correctamente.',
    });
  } catch (error) {
    if(error.code === 11000){
      return res.status(404).json({
        mensaje: 'Este nombre de inscripción ya existe. Intente con otro.',
      });
    }
    res.status(404).json({
      mensaje: 'Error, no se pudo editar la inscripción.',
    });
  }
};

export const verificarInscripcion = async (req, res) => {
  try {
    const { alumno, comision, materia } = req.body;

    const existe = await Inscripcion.findOne({
      alumno: alumno,
      comision: comision,
      materia: materia
    });

    if (existe) {
      return res.status(200).json({
        inscripto: true,
        mensaje: "El alumno ya está inscripto en esta comisión de la materia."
      });
    }

    return res.status(200).json({
      inscripto: false,
      mensaje: "El alumno no está inscripto."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al verificar la inscripción."
    });
  }
};