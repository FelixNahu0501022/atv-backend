const Reporte = require('../models/reporte.model');

const ReportesController = {
  async totalPorMes(req, res) {
    try {
      const data = await Reporte.totalRecaudadoPorMes();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener total recaudado por mes' });
    }
  },

  async pendientesMesActual(req, res) {
    try {
      const data = await Reporte.pendientesMesActual();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener pendientes del mes actual' });
    }
  },

  async historialEstudiante(req, res) {
    try {
      const { id } = req.params;
      const data = await Reporte.historialPorEstudiante(id);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener historial del estudiante' });
    }
  },

  async dashboard(req, res) {
    try {
      const data = await Reporte.dashboardResumen();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener dashboard' });
    }
  }
};

module.exports = ReportesController;
