-- Crear tabla usuarios (profesores)
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'profesor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla estudiantes
CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    edad INT,
    categoria VARCHAR(50), -- Ej: Sub-15, Sub-17
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla mensualidades
CREATE TABLE mensualidades (
    id_mensualidad SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL REFERENCES estudiantes(id_estudiante) ON DELETE CASCADE,
    id_usuario INT REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    mes VARCHAR(20) NOT NULL,
    año INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente/pagado
    fecha_pago DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario (profesor)
INSERT INTO usuarios (nombre, email, password)
VALUES ('Profesor Juan', 'juan@example.com', 'hash_password');

-- Insertar estudiantes
INSERT INTO estudiantes (nombre, apellido, edad, categoria, telefono)
VALUES
('Carlos', 'Pérez', 14, 'Sub-15', '76543210'),
('María', 'Gómez', 16, 'Sub-17', '76543211');

-- Insertar mensualidad
INSERT INTO mensualidades (id_estudiante, id_usuario, mes, año, monto, estado, fecha_pago)
VALUES
(1, 1, 'Enero', 2025, 150.00, 'pagado', '2025-01-05'),
(2, 1, 'Enero', 2025, 150.00, 'pendiente', NULL);

ALTER TABLE mensualidades ADD COLUMN fecha_vencimiento DATE;

select * from estudiantes
