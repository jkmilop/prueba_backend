const Usuario = require('../models/usuario.js');
const handleError = require('../utils/errorHandler.js');

// Funciones CRUD implementadas directamente
const addUsuario = async (req, res) => {
    try {
        const { id, ...body } = req.body;
        const existingUser = await Usuario.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({
                message: `Ya existe un usuario con el email ${body.email}`,
                usuarioExistente: existingUser
            });
        }
        const newUsuario = await Usuario.create(body);
        const usuarioId = newUsuario.id || newUsuario._id;
        res.status(201).json({
            id: usuarioId,
            ...body
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findOne({ id: parseInt(id) });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.json(usuario);
    } catch (error) {
        handleError(res, error);
    }
};

const getUsuarios = async (req, res) => {
    const { page = 1, limit = 10, ...filters } = req.query;
    const skip = (page - 1) * limit;
    const mongooseFilters = {};
    
    Object.entries(filters).forEach(([key, value]) => {
        if (key === 'id' || key === 'cedula') {
            mongooseFilters[key] = parseInt(value);
        } else {
            mongooseFilters[key] = value;
        }
    });
    
    const usuarios = await Usuario.find(mongooseFilters)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();
    const count = await Usuario.countDocuments(mongooseFilters);
    
    res.json({
        usuarios,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalRecords: count
    });
};

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        let usuario = await Usuario.findOne({ id: parseInt(id) });
        if (!usuario) {
            usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        } else {
            Object.assign(usuario, req.body);
            await usuario.save();
            res.json(usuario);
        }
    } catch (error) {
        handleError(res, error);
    }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Usuario.deleteOne({ id: parseInt(id) });
        if (deletedCount.deletedCount === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        handleError(res, error);
    }
};

const buscarUsuario = async (req, res) => {
    try {
      const ciudad = req.query.ciudad || req.params.ciudad;
  
      if (!ciudad) {
        return res.status(400).json({ error: "Se requiere el parámetro 'ciudad'" });
      }
  
      const usuario = await Usuario.findOne({
        where: {},
        include: [
          {
            association: "direcciones",
            where: { ciudad },
          },
        ],
      });
  
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      res.json(usuario);
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
module.exports = {
    addUsuario,
    getUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
    buscarUsuario
};