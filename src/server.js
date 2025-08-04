require('dotenv').config();
const app = require('./app');
const { pool } = require('./config/db');

const PORT = process.env.PORT || 4000;

// Probar conexión a BD antes de levantar el servidor
pool.connect()
  .then(() => {
    console.log('✅ Conexión a PostgreSQL exitosa');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));
