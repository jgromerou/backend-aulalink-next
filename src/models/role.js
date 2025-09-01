import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
  nombreRol: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    unique: true, 
    enum: ['admin', 'alumno', 'profesor']
  },
  estado: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1]
    }
});

const Role = mongoose.model(`role`, roleSchema);

export default Role;
