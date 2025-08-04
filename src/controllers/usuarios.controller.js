const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario.model');

const UsuariosController = {
  async getAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);
      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
  },

  async patch(req, res) {
    try {
      const { id } = req.params;
      const { nombre, email, password } = req.body;

      // Primero obtenemos el usuario para verificar existencia
      const existingUser = await Usuario.findById(id);
      if (!existingUser) return res.status(404).json({ message: 'Usuario no encontrado' });

      // Si no se envía ningún dato para actualizar
      if (!nombre && !email && !password) {
        return res.status(400).json({ message: 'Debe enviar al menos un campo para actualizar' });
      }

      // Mantener los valores anteriores si no se envían
      const updatedNombre = nombre || existingUser.nombre;
      const updatedEmail = email || existingUser.email;

      let passwordHash = null;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(password, salt);
      }

      const updatedUser = await Usuario.update(id, updatedNombre, updatedEmail, passwordHash);

      res.json({ message: 'Usuario actualizado parcialmente', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await Usuario.delete(id);
      if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });

      res.json({ message: 'Usuario eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  }
};

module.exports = UsuariosController;
