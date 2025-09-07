import mongoose, { Schema } from 'mongoose';

const comisionSchema = new Schema({
  nombreComision: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 150,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaFin: {
    type: String,
    required: true,
  },
  diasDictado: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 40,
  },
  cupo: {
    type: Number,
    required: true,
    minLength:1,
    maxLength:5
  },
  estado: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1]
  },
  materia: { type: mongoose.Schema.Types.ObjectId, ref: 'materia' },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
});

const Comision = mongoose.model(`comision`, comisionSchema);

export default Comision;
