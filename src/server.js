require('dotenv').config();
const app = require('./app');
const { pool } = require('./config/db');
const initDB = require('./config/initDB');

const PORT = process.env.PORT || 4000;

pool.connect()
  .then(async () => {
    console.log('✅ Conexión a PostgreSQL exitosa');
    await initDB(); // crea tablas si no existen
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));
