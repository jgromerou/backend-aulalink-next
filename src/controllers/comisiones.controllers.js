import Comision from "../models/comision";
import Materia from "../models/materia";
import Usuario from "../models/usuario";
import Inscripcion from "../models/inscripcion";


export const crearComision = async (req, res) => {
    try{
        const idmateria = req.body.materia;
        const idusuario = req.body.usuario;

        const resto = {
          nombreComision: req.body.nombreComision,
          fechaInicio: req.body.fechaInicio,
          fechaFin: req.body.fechaFin,
          horaInicio: req.body.horaInicio,
          horaFin: req.body.horaFin,
          diasDictado: req.body.diasDictado,
          cupo: req.body.cupo,
          estado: req.body.estado
        };

        const materiaDoc = await Materia.findOne({ _id: idmateria });
        if (!materiaDoc) {
          return res.status(400).json({ error: `Materia '${materiaDoc.nombreMateria}' no encontrada` });
        }

        const usuarioDoc = await Usuario.findOne({ _id: idusuario });
        if (!usuarioDoc) {
          return res.status(400).json({ error: `Usuario con '${usuarioDoc.nombreUsuario}' '${usuarioDoc.apellidoUsuario}' no encontrado` });
        }

        const nuevaComision = new Comision({
          nombreComision: resto.nombreComision,
          fechaInicio: resto.fechaInicio,
          fechaFin: resto.fechaFin,
          horaInicio: resto.horaInicio,
          horaFin: resto.horaFin,
          diasDictado: resto.diasDictado,
          cupo: resto.cupo,
          materia: materiaDoc._id,
          usuario: usuarioDoc._id
        });

        await nuevaComision.save();

        res.status(201).json(nuevaComision);
    }catch(error){
      console.log(error)
        res.status(404).json({
            mensaje: "Error. No se pudo crear la comisión"
        })
    }
}

export const obtenerListaComisiones = async (req, res) =>{
    try{
      const comisiones = await Comision.find()
      .populate('materia', 'nombreMateria')
      .populate('usuario', 'nombreUsuario apellidoUsuario dni email');
        res.status(200).json(comisiones);
    } catch(error){
        res.status(404).json({
            mensaje: "Error. No se pudo obtener la lista de comisiones"
        })
    }
}

export const editarComision = async (req, res) => {
  try {
    await Comision.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: 'La comisión fue editada correctamente.',
    });
  } catch (error) {
    if(error.code === 11000){
      return res.status(404).json({
        mensaje: 'Este nombre de comisión ya existe. Intente con otro.',
      });
    }
    res.status(404).json({
      mensaje: 'Error, no se pudo editar la comisión.',
    });
  }
};

export const obtenerComision = async (req, res) =>{
  try{
     const comision = await Comision.findById(req.params.id);
     res.status(200).json(comision);
  }catch(error){
      res.status(404).json({
          mensaje: "Error, no se pudo obtener la comisión."
      })
  }
}

export const borrarComision = async (req, res) => {
  try {
    const { id } = req.params
    const comision = await Comision.findById(id);
    if (!comision) {
      return res.status(404).json({
        mensaje: "La comisión no fue encontrada.",
      });
    }
    const inscripcionesConComision = await Inscripcion.find({ comision: id });

    if (inscripcionesConComision.length > 0) {
      return res.status(400).json({
        mensaje: "No se puede borrar esta comision porque está asignada a una o más inscripciones",
      });
    }
    await Comision.findByIdAndDelete(id);
    res.status(200).json({
      mensaje: "La comisión fue eliminada correctamente"
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      mensaje: "Error, la comisión no se pudo borrar"
    })
  }
};

export const consultaComisionesPorMateria = async (req, res) => {
  try {
    const comision = await Comision.find({categoria: req.params.materia, estado: 1});
    res.status(200).json(comision);
  } catch (error) {
    res.status(404).json({
      mensaje: 'Error al intentar obtener la/s comision/es por materia y en estado activos',
    });
  }
};

export const activarComision = async (req, res) => {
  const idComision = req.params.id;
  try {
    const comision = await Comision.findById(idComision);
    if (!comision) {
      return res.status(404).json({ error: 'Comisión no encontrada' });
    }
    if (comision.estado === 1) {
      return res
        .status(404)
        .json({ error: 'La comisión ya se encuentra activa' });
    }
    comision.estado = 1;
    await comision.save();
    res.status(200).json({
      mensaje: 'Se activó la comision correctamente.',
    });
  } catch (error) {
    res.status(404).json({
      mensaje: 'Error, no se pudo activar la comisión.',
    });
  }
};

export const desactivarComisión = async (req, res) => {
  const idComision = req.params.id;
  try {
    const comision = await Comision.findById(idComision);
    if (!comision) {
      return res.status(404).json({ error: 'Comisión no encontrada' });
    }
    if (comision.estado === 0) {
      return res
        .status(404)
        .json({ error: 'La comisión ya se encuentra inactivo.' });
    }
    producto.estado = 0;
    await producto.save();
    res.status(200).json({
      mensaje: 'Se desactivó la comisión correctamente.',
    });
  } catch (error) {
    res.status(404).json({
      mensaje: 'Error, no se pudo desactivar la comisión.',
    });
  }
};

export const obtenerComisionesActivas = async (req, res) => {
  try {
    const comisionesActivas = await Producto.find({ estado: 1 });
    res.status(200).json(comisionesActivas);
  } catch (error) {
    res.status(404).json({
      mensaje:
        'Error. No se pudo obtener la lista de comisiones en estado Activo.',
    });
  }
};

export const obtenerComisionesPorMateria = async (req, res) => {
  try {
    const { id } = req.params;

    const comisionesPorMateria = await Comision.find({ materia: id });

    if (!comisionesPorMateria || comisionesPorMateria.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron comisiones para esta materia."
      });
    }

    res.status(200).json(comisionesPorMateria);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener las comisiones de la materia."
    });
  }
};