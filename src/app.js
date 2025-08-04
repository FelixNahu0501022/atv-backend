const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const estudiantesRoutes = require('./routes/estudiantes.routes');
const mensualidadesRoutes = require('./routes/mensualidades.routes');
const reportesRoutes = require('./routes/reportes.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/mensualidades', mensualidadesRoutes);
app.use('/api/reportes', reportesRoutes);

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'API ATV funcionando ✅' });
});

module.exports = app;
