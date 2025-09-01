import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  apellidoUsuario: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  dni: {
    type: Number,
    required: true,
    minLength: 5,
    maxLength: 10,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 60,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
   
  },
  estado: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1]
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' }
});

const Usuario = mongoose.model(`usuario`, usuarioSchema);

export default Usuario;
