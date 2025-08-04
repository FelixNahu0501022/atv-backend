const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const AuthController = {
  async register(req, res) {
    try {
      const { nombre, email, password } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const userExist = await Usuario.findByEmail(email);
      if (userExist) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await Usuario.create(nombre, email, passwordHash);

      res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
      }

      const user = await Usuario.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
      }

      const token = jwt.sign(
        { id: user.id_usuario, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ message: 'Login exitoso', token, user: { id: user.id_usuario, nombre: user.nombre, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};

module.exports = AuthController;
