const Estudiante = require('../models/estudiante.model');

const EstudiantesController = {
  async create(req, res) {
    try {
      const { nombre, apellido, edad, categoria, telefono } = req.body;
      if (!nombre || !apellido) return res.status(400).json({ message: 'Nombre y apellido son obligatorios' });

      const nuevo = await Estudiante.create(nombre, apellido, edad, categoria, telefono);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear estudiante' });
    }
  },

  async getAll(req, res) {
    try {
      const estudiantes = await Estudiante.findAll();
      res.json(estudiantes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener estudiantes' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const estudiante = await Estudiante.findById(id);
      if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' });
      res.json(estudiante);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el estudiante' });
    }
  },

  async patch(req, res) {
    try {
      const { id } = req.params;
      const { nombre, apellido, edad, categoria, telefono } = req.body;

      const estudianteExist = await Estudiante.findById(id);
      if (!estudianteExist) return res.status(404).json({ message: 'Estudiante no encontrado' });

      const updated = await Estudiante.update(
        id,
        nombre || estudianteExist.nombre,
        apellido || estudianteExist.apellido,
        edad || estudianteExist.edad,
        categoria || estudianteExist.categoria,
        telefono || estudianteExist.telefono
      );

      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar estudiante' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Estudiante.delete(id);
      if (!eliminado) return res.status(404).json({ message: 'Estudiante no encontrado' });

      res.json({ message: 'Estudiante eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar estudiante' });
    }
  }
};

module.exports = EstudiantesController;
