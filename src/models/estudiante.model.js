const { pool } = require('../config/db');

const Estudiante = {
  async create(nombre, apellido, edad, categoria, telefono) {
    const query = `
      INSERT INTO estudiantes (nombre, apellido, edad, categoria, telefono)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [nombre, apellido, edad, categoria, telefono];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findAll() {
    const { rows } = await pool.query('SELECT * FROM estudiantes ORDER BY id_estudiante ASC');
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = $1', [id]);
    return rows[0];
  },

  async update(id, nombre, apellido, edad, categoria, telefono) {
    const query = `
      UPDATE estudiantes SET nombre=$1, apellido=$2, edad=$3, categoria=$4, telefono=$5
      WHERE id_estudiante=$6 RETURNING *
    `;
    const values = [nombre, apellido, edad, categoria, telefono, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query('DELETE FROM estudiantes WHERE id_estudiante = $1 RETURNING *', [id]);
    return rows[0];
  }
};

module.exports = Estudiante;
