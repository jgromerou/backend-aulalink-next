//import envioEmail from "../helpers/envioEmailRegistrarse";
import generarJWT from "../helpers/tokenLogin";
import Role from "../models/role";
import Usuario from "../models/usuario";
import bcrypt from "bcrypt";

export const crearUsuarioAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let usuario = await Usuario.findOne({ email }); 
    if (usuario) {
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }
    let roleId;
    // Buscar el ObjectId del rol "admin" en la colección de roles
    if (role === 'admin') {
      const adminRole = await Role.findOne({ nombreRol: 'admin' });
      if (!adminRole) {
        return res.status(400).json({
          mensaje: "Rol admin no encontrado"
        });
      }
      roleId = adminRole._id;
    }
       // Buscar el ObjectId del rol "profesor" en la colección de roles
    if (role === 'profesor') {
      const profesorRole = await Role.findOne({ nombreRol: 'profesor' });
      if (!profesorRole) {
        return res.status(400).json({
          mensaje: "Rol profesor no encontrado"
        });
      }
      roleId = profesorRole._id;
    }
    // Buscar el ObjectId del rol "alumno" en la colección de roles
    if (role === 'alumno') {
      const alumnoRole = await Role.findOne({ nombreRol: 'alumno' });
      if (!alumnoRole) {
        return res.status(400).json({
          mensaje: "Rol alumno no encontrado"
        });
      }
      roleId = alumnoRole._id;
    }
    const usuarioData = Object.assign({}, req.body, { role: roleId });
    //console.log(usuarioData);
    usuario = new Usuario(usuarioData);
    const salt = bcrypt.genSaltSync(10);
    if (!salt) {
      throw new Error("Error al generar el salt");
    }
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
      mensaje: "usuario creado",
      nombre: usuario.nombreUsuario,
      uid: usuario._id,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: "El usuario no se creó",
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    const { nombreUsuario } = usuario;
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Email o password no válido - email",
      });
    }
    if (usuario.estado !== 1) {
      return res.status(400).json({
        mensaje: "El usuario no se encuentra activo - estado",
      });
    }

    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Email o password no válido - password",
      });
    }
    const token = await generarJWT({ nombreUsuario, email });

    res.status(200).json({
      mensaje: "El usuario es correcto",
      nombreUsuario: usuario.nombreUsuario,
      _id: usuario._id,
      email: usuario.email,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({
      mensaje: "Usuario o Password incorrecto",
    });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        mensaje: "El usuario no fue encontrado.",
      });
    }
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "Usuario eliminado exitosamente.",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo eliminar el usuario.",
    });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const { email, password, nombreUsuario, apellidoUsuario, estado, perfil } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        mensaje: "El usuario no fue encontrado.",
      });
    }
    usuario.email = email;
    usuario.nombreUsuario = nombreUsuario;
    usuario.apellidoUsuario =apellidoUsuario;
    usuario.estado = estado;
    usuario.perfil = perfil;
    await usuario.save();
    res.status(200).json({
      mensaje: "Usuario actualizado exitosamente.",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo actualizar el usuario correctamente.",
    });
  }
};

export const obtenerListaUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate("role","_id nombreRol");
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error)
    res.status(404).json({
      mensaje: "Error. No se pudo obtener la lista de usuarios",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .populate("role", "nombreRol")
      .lean(); // devuelve un objeto plano ya, no un documento Mongoose

    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const { _id, nombreUsuario, apellidoUsuario, dni, email, password, estado } = usuario;
    const usuarioConRolNombre = {
      _id,
      nombreUsuario,
      apellidoUsuario,
      dni,
      email,
      password,
      estado,
      role: usuario.role.nombreRol
    };

    res.status(200).json(usuarioConRolNombre);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error. No se pudo obtener el usuario",
      error: error.message
    });
  }
};

export const crearUsuarioProfesorOAlumno = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        mensaje: "El email ya se encuentra registrado.",
      });
    }
    console.log(usuario);
    let roleId;
        // Buscar el ObjectId del rol "profesor" en la colección de roles
    if (role === 'profesor') {
      const profesorRole = await Role.findOne({ nombreRol: 'profesor' });
      if (!profesorRole) {
        return res.status(400).json({
          mensaje: "Rol profesor no encontrado"
        });
      }
      roleId = profesorRole._id;
    }
    // Buscar el ObjectId del rol "alumno" en la colección de roles
    if (role === 'alumno') {
      const alumnoRole = await Role.findOne({ nombreRol: 'alumno' });
      if (!alumnoRole) {
        return res.status(400).json({
          mensaje: "Rol alumno no encontrado"
        });
      }
      roleId = alumnoRole._id;
    }
    const usuarioData = Object.assign({}, req.body, { role: roleId });
    console.log(usuarioData);
    usuario = new Usuario(usuarioData);
    const salt = bcrypt.genSaltSync(10);
    if (!salt) {
      throw new Error("Error al generar el salt");
    }
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
      mensaje: "usuario creado",
      nombre: usuario.nombreUsuario,
      uid: usuario._id,
    });
    //envioEmail(usuario.nombreUsuario, usuario.email);
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: "El usuario no pudo ser registrado.",
    });
  }
};

export const cambiarPassword = async (req, res) => {
  const idUsuario = req.params.id
  const {password} = req.body
  try{
    const usuario = await Usuario.findById(idUsuario)
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if(password) {
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    }
    await usuario.save()
    res.status(200).json({
      mensaje: "La contraseña se cambió correctamente.",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "La contraseña no se pudo cambiar.",
    });
  }
}
