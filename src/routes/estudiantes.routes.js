const express = require('express');
const EstudiantesController = require('../controllers/estudiantes.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas las rutas protegidas
router.post('/', verifyToken, EstudiantesController.create);
router.get('/', verifyToken, EstudiantesController.getAll);
router.get('/:id', verifyToken, EstudiantesController.getById);
router.patch('/:id', verifyToken, EstudiantesController.patch);
router.delete('/:id', verifyToken, EstudiantesController.delete);

module.exports = router;
