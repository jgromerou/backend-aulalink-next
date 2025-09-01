import Role from "../models/role";

export const crearRol = async (req, res) => {
  try {
    const { nombreRol } = req.body;
    let rol = await Role.findOne({ nombreRol }); 
    if (rol) {
      return res.status(400).json({
        mensaje: "ya existe un rol con dicho nombre",
      });
    }
    rol = new Role(req.body);

    await rol.save();
    res.status(201).json({
      mensaje: "rol creado",
      nombre: rol.nombreRol,
      uid: rol._id,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      mensaje: "El Rol no se creó",
    });
  }
};


export const editarRol = async (req, res) => {
  try {
    const {  nombreRol, estado } = req.body;
    const rol = await Role.findById(req.params.id);
    if (!rol) {
      return res.status(404).json({
        mensaje: "El rol no fue encontrado.",
      });
    }
 
    rol.nombreRol = nombreRol;
    rol.estado = estado;

    await rol.save();
    res.status(200).json({
      mensaje: "Rol actualizado exitosamente.",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo actualizar el Rol correctamente.",
    });
  }
};

export const borrarRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) {
      return res.status(404).json({
        mensaje: "El rol no fue encontrado.",
      });
    }
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "Rol eliminado exitosamente.",
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "No se pudo eliminar el rol.",
    });
  }
};

export const obtenerListaRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(404).json({
      mensaje: "Error. No se pudo obtener la lista de roles",
    });
  }
};

export const obtenerRol = async (req, res) => {
  try {
    const rol = await Role.findById(req.params.id);
    res.status(200).json(rol);
  } catch (error) {
    res.status(404).json({
      mensaje: "Error. No se pudo obtener el rol",
    });
  }
};
