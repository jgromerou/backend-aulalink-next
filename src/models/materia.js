import mongoose, { Schema } from 'mongoose';

const materiaSchema = new Schema({
  nombreMateria: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 150,
  },
  descripcion: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  nivel: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 3
  },
  estado: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1]
  }
});

const Materia = mongoose.model(`materia`, materiaSchema);

export default Materia;
