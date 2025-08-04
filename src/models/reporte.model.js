const { pool } = require('../config/db');

const Reporte = {
  async totalRecaudadoPorMes() {
    const query = `
      SELECT mes, año, SUM(monto) AS total
      FROM mensualidades
      WHERE estado = 'pagado'
      GROUP BY mes, año
      ORDER BY año DESC, mes DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  async pendientesMesActual() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.toLocaleString('es-ES', { month: 'long' });

    const query = `
      SELECT COUNT(*) AS pendientes
      FROM mensualidades
      WHERE estado = 'pendiente'
      AND mes = $1 AND año = $2
    `;
    const { rows } = await pool.query(query, [mes, año]);
    return rows[0];
  },

  async historialPorEstudiante(id_estudiante) {
    const query = `
      SELECT mes, año, monto, estado, fecha_pago, fecha_vencimiento
      FROM mensualidades
      WHERE id_estudiante = $1
      ORDER BY año DESC, mes DESC
    `;
    const { rows } = await pool.query(query, [id_estudiante]);
    return rows;
  },

  async dashboardResumen() {
    const query = `
      SELECT
        SUM(CASE WHEN estado = 'pagado' THEN 1 ELSE 0 END) AS pagadas,
        SUM(CASE WHEN estado = 'pendiente' THEN 1 ELSE 0 END) AS pendientes,
        SUM(CASE WHEN estado = 'pagado' THEN monto ELSE 0 END) AS total_recaudado
      FROM mensualidades
    `;
    const { rows } = await pool.query(query);
    return rows[0];
  }
};

module.exports = Reporte;
