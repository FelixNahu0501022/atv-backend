const { pool } = require('../config/db');

const Usuario = {
  async create(nombre, email, passwordHash) {
    const query = `
      INSERT INTO usuarios (nombre, email, password)
      VALUES ($1, $2, $3) RETURNING id_usuario, nombre, email, rol, created_at
    `;
    const values = [nombre, email, passwordHash];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  async findById(id) {
    const query = 'SELECT id_usuario, nombre, email, rol, created_at FROM usuarios WHERE id_usuario = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async findAll() {
    const query = 'SELECT id_usuario, nombre, email, rol, created_at FROM usuarios ORDER BY id_usuario ASC';
    const { rows } = await pool.query(query);
    return rows;
  },

  async update(id, nombre, email, passwordHash = null) {
    let query;
    let values;

    if (passwordHash) {
      query = `
        UPDATE usuarios SET nombre = $1, email = $2, password = $3
        WHERE id_usuario = $4 RETURNING id_usuario, nombre, email, rol, created_at
      `;
      values = [nombre, email, passwordHash, id];
    } else {
      query = `
        UPDATE usuarios SET nombre = $1, email = $2
        WHERE id_usuario = $3 RETURNING id_usuario, nombre, email, rol, created_at
      `;
      values = [nombre, email, id];
    }

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Usuario;
