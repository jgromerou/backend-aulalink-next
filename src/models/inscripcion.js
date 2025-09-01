import mongoose, { Schema } from 'mongoose';

const inscripcionSchema = new Schema({
  comision: { type: mongoose.Schema.Types.ObjectId, ref: 'comision' },
  materia: { type: mongoose.Schema.Types.ObjectId, ref: 'materia' },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
  fechaInscripcion: {
    type: 'Date',
    required: true,
    default: Date.now(),
  },
  estado: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1]
  },
});

const Inscripcion = mongoose.model('inscripcion', inscripcionSchema);
export default Inscripcion;