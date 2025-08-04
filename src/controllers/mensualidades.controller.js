const Mensualidad = require('../models/mensualidad.model');

const MensualidadesController = {
  async create(req, res) {
    try {
      const { id_estudiante, mes, año, monto, estado, fecha_pago } = req.body;
      const id_usuario = req.user.id; // viene del token

      if (!id_estudiante || !mes || !año || !monto) {
        return res.status(400).json({ message: 'Campos obligatorios: id_estudiante, mes, año, monto' });
      }

      const nueva = await Mensualidad.create(id_estudiante, id_usuario, mes, año, monto, estado, fecha_pago);
      res.status(201).json(nueva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la mensualidad' });
    }
  },

  async getAll(req, res) {
    try {
      const mensualidades = await Mensualidad.findAll();
      res.json(mensualidades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener mensualidades' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const mensualidad = await Mensualidad.findById(id);
      if (!mensualidad) return res.status(404).json({ message: 'Mensualidad no encontrada' });
      res.json(mensualidad);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener mensualidad' });
    }
  },

  async filter(req, res) {
    try {
      const { mes, año } = req.query;
      const resultados = await Mensualidad.findByFilter(mes, año);
      res.json(resultados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al filtrar mensualidades' });
    }
  },

  async patch(req, res) {
  try {
    const { id } = req.params;
    const { estado, fecha_pago } = req.body;

    if (!estado) return res.status(400).json({ message: 'Debe enviar el estado (pagado o pendiente)' });

    // Si está pagado, usamos fecha actual o la enviada
    const fecha = estado === 'pagado' ? (fecha_pago || new Date()) : null;

    const updated = await Mensualidad.updateEstado(id, estado, fecha);
    if (!updated) return res.status(404).json({ message: 'Mensualidad no encontrada' });

    res.json({ message: 'Mensualidad actualizada', mensualidad: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar mensualidad' });
  }
}
,

  async delete(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Mensualidad.delete(id);
      if (!eliminado) return res.status(404).json({ message: 'Mensualidad no encontrada' });

      res.json({ message: 'Mensualidad eliminada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar mensualidad' });
    }
  },
  async alerts(req, res) {
  try {
    const { vencidas, porVencer } = await Mensualidad.findAlerts();
    res.json({ vencidas, porVencer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener alertas' });
  }
}

};

module.exports = MensualidadesController;
