import Comision from "../models/comision";
import Inscripcion from "../models/inscripcion";
import Materia from '../models/materia';
import Usuario from '../models/usuario';

export const crearInscripcion = async (req, res) => {
  try {
    const { comision, materia, usuario, fechaInscripcion } = req.body;

    // Buscar las referencias
     const materiaDoc = await Materia.findById( materia );
    if (!materiaDoc) return res.status(404).json({ msg: 'Materia no encontrada' });

    const comisionDoc = await Comision.findById( comision );
    if (!comisionDoc) return res.status(404).json({ msg: 'Comisión no encontrada' });

    const usuarioDoc = await Usuario.findById( usuario );
    if (!usuarioDoc) return res.status(404).json({ msg: 'Usuario no encontrado' });

    // Crear inscripción
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

// export const obtenerListaInscripcionesAlumnos = async (req, res) => {
//   try {
//     const pedidos = await Pedido.find()
//       .populate({
//         path: "productos.producto",
//         select: "-_id -__v", 
//       })
//       .populate({
//         path: "usuario",
//         select: "-_id -password -estado -perfil -__v", 
//       });
//     res.status(200).json(pedidos);
//   } catch (error) {
//     res.status(404).json({
//       mensaje: "Error al intentar listar los pedidos",
//     });
//   }
// };

// export const obtenerPedido = async (req, res) => {
//   try {
//     const pedido = await Pedido.findById(req.params.id)
//       .populate({
//         path: "productos.producto",
//         select: "-_id -__v",
//       })
//       .populate({
//         path: "usuario",
//         select: "-_id -password -estado -perfil -__v",
//       });
//     res.status(200).json(pedido);
//   } catch (error) {
//     res.status(404).json({
//       mensaje: "Error, no se pudo obtener el pedido.",
//     });
//   }
// };

// export const entregarPedido = async (req, res) => {
//   const idPedido = req.params.id;
//   try {
//     const pedido = await Pedido.findById(idPedido);
//     if (!pedido) {
//       return res.status(404).json({ error: "Pedido no encontrado" });
//     }

//     if (pedido.estado === "Entregado") {
//       return res
//         .status(404)
//         .json({ error: "El pedido ya se encuentra en Entregado" });
//     }

//     pedido.estado = "Entregado";
//     await pedido.save();
//     res.status(200).json({
//       mensaje: "Se entregó el pedido correctamente.",
//     });
//   } catch (error) {
//     res.status(404).json({
//       mensaje: "Error, no se pudo pasar a entregado el pedido.",
//     });
//   }
// };

// export const pedidoEnProceso = async (req, res) => {
//   const idPedido = req.params.id;
//   try {
//     const pedido = await Pedido.findById(idPedido);
//     if (!pedido) {
//       return res.status(404).json({ error: "Pedido no encontrado" });
//     }
//     if (pedido.estado === "En proceso") {
//       return res
//         .status(404)
//         .json({ error: "El pedido ya se encuentra en proceso" });
//     }
//     pedido.estado = "En proceso";
//     await pedido.save();
//     res.status(200).json({
//       mensaje: "El pedido esta en proceso.",
//     });
//   } catch (error) {
//     res.status(404).json({
//       mensaje: 'Error, no se pudo pasar a "en proceso" el pedido.',
//      }); 
//    } 
// };


