const express = require('express');
const ReportesController = require('../controllers/reportes.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/total-por-mes', verifyToken, ReportesController.totalPorMes);
router.get('/pendientes-actual', verifyToken, ReportesController.pendientesMesActual);
router.get('/historial/:id', verifyToken, ReportesController.historialEstudiante);
router.get('/dashboard', verifyToken, ReportesController.dashboard);

module.exports = router;
