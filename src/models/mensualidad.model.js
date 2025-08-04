const Mensualidad = {
  async create(id_estudiante, id_usuario, mes, año, monto, estado = 'pendiente', fecha_pago = null) {
    // Si tiene fecha de pago, vencimiento es +1 mes
    let fecha_vencimiento;
    if (estado === 'pagado' && fecha_pago) {
      fecha_vencimiento = new Date(fecha_pago);
      fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1);
    } else {
      // Si no está pagado, calculamos desde el 1 del mes
      const inicioMes = new Date(año, getMonthNumber(mes), 1);
      fecha_vencimiento = new Date(inicioMes);
      fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1);
    }

    const query = `
      INSERT INTO mensualidades (id_estudiante, id_usuario, mes, año, monto, estado, fecha_pago, fecha_vencimiento)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `;
    const values = [id_estudiante, id_usuario, mes, año, monto, estado, fecha_pago, fecha_vencimiento];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async updateEstado(id, estado, fecha_pago) {
    let fecha_vencimiento = null;
    if (estado === 'pagado') {
      fecha_vencimiento = new Date(fecha_pago || new Date());
      fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1);
    }

    const query = `
      UPDATE mensualidades
      SET estado = $1, fecha_pago = $2, fecha_vencimiento = $3
      WHERE id_mensualidad = $4 RETURNING *
    `;
    const values = [estado, fecha_pago, fecha_vencimiento, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findAlerts() {
    const hoy = new Date();
    const query = `
      SELECT m.*, e.nombre AS estudiante_nombre, e.apellido AS estudiante_apellido
      FROM mensualidades m
      INNER JOIN estudiantes e ON m.id_estudiante = e.id_estudiante
      WHERE m.estado = 'pendiente'
    `;
    const { rows } = await pool.query(query);

    const vencidas = [];
    const porVencer = [];

    rows.forEach(row => {
      const vencimiento = new Date(row.fecha_vencimiento);
      const diffDays = Math.ceil((vencimiento - hoy) / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) {
        vencidas.push(row);
      } else if (diffDays <= 5) {
        porVencer.push({ ...row, dias_restantes: diffDays });
      }
    });

    return { vencidas, porVencer };
  }
};

// Helper para convertir mes en número
function getMonthNumber(mes) {
  const meses = {
    Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
    Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11
  };
  return meses[mes] || 0;
}

module.exports = Mensualidad;
