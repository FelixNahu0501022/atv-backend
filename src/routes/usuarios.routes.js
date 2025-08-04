const express = require('express');
const UsuariosController = require('../controllers/usuarios.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Todas requieren autenticación
router.get('/', verifyToken, UsuariosController.getAll);
router.get('/:id', verifyToken, UsuariosController.getById);
router.patch('/:id', verifyToken, UsuariosController.patch);
router.delete('/:id', verifyToken, UsuariosController.delete);

module.exports = router;
