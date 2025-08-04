const express = require('express');
const MensualidadesController = require('../controllers/mensualidades.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', verifyToken, MensualidadesController.create);
router.get('/', verifyToken, MensualidadesController.getAll);
router.get('/filter', verifyToken, MensualidadesController.filter);
router.get('/:id', verifyToken, MensualidadesController.getById);
router.get('/alertas', verifyToken, MensualidadesController.alerts);
router.patch('/:id', verifyToken, MensualidadesController.patch);
router.delete('/:id', verifyToken, MensualidadesController.delete);


module.exports = router;
