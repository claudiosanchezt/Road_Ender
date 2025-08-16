import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Mock user for login demo
const mockUser = { id: 1, username: 'admin', password: bcrypt.hashSync('admin123', 8) };

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === mockUser.username && bcrypt.compareSync(password, mockUser.password)) {
    const token = jwt.sign({ id: mockUser.id, username: mockUser.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

authRouter.post('/register', (req, res) => {
  // Solo demo, no persiste
  res.status(201).json({ message: 'Usuario registrado (mock)' });
});

export default authRouter;
