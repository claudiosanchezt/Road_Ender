"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postgres_1 = require("../../database/postgres");
const authRouter = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
// Helper to sign tokens
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
// POST /auth/login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email y password son requeridos' });
        const normalizedEmail = String(email).toLowerCase();
        const q = 'SELECT id, email, password_hash, first_name, last_name, user_type FROM users WHERE email = $1 LIMIT 1';
        const result = await postgres_1.pgPool.query(q, [normalizedEmail]);
        if (!result || !result.rows || result.rows.length === 0)
            return res.status(401).json({ error: 'Credenciales inválidas' });
        const user = result.rows[0];
        const match = bcryptjs_1.default.compareSync(password, user.password_hash);
        if (!match)
            return res.status(401).json({ error: 'Credenciales inválidas' });
        const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.user_type });
        // Minimal refresh token stub
        const refreshToken = signAccessToken({ id: user.id, t: 'refresh' });
        res.json({ data: { tokens: { accessToken, refreshToken }, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, userType: user.user_type } } });
    }
    catch (err) {
        console.error('Login error', err && err.message);
        res.status(500).json({ error: 'Error interno' });
    }
});
// POST /auth/register
authRouter.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, userType } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email y password son requeridos' });
        const hash = bcryptjs_1.default.hashSync(password, 10);
        const q = `INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type, email_verified) VALUES ($1,$2,$3,$4,$5,$6,true) RETURNING id, email, first_name, last_name, user_type`;
        const normalizedEmail = String(email).toLowerCase();
        const result = await postgres_1.pgPool.query(q, [normalizedEmail, hash, firstName || '', lastName || '', phone || '', userType || 'client']);
        const user = result.rows[0];
        const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.user_type });
        const refreshToken = signAccessToken({ id: user.id, t: 'refresh' });
        res.status(201).json({ data: { tokens: { accessToken, refreshToken }, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, userType: user.user_type } } });
    }
    catch (err) {
        console.error('Register error', err && err.message);
        if (err && err.code === '23505') {
            // Idempotent behavior: fetch existing user and return tokens instead of error
            try {
                const q2 = 'SELECT id, email, first_name, last_name, user_type FROM users WHERE email = $1 LIMIT 1';
                const normalizedEmail = String(req.body.email || '').toLowerCase();
                const existing = await postgres_1.pgPool.query(q2, [normalizedEmail]);
                const user = existing.rows[0];
                if (user) {
                    const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.user_type });
                    const refreshToken = signAccessToken({ id: user.id, t: 'refresh' });
                    return res.status(201).json({ data: { tokens: { accessToken, refreshToken }, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, userType: user.user_type } } });
                }
            }
            catch (e) {
                console.error('Register fallback error', e && e.message);
            }
            return res.status(201).json({ error: 'Email ya registrado' });
        }
        res.status(500).json({ error: 'Error interno' });
    }
});
// POST /auth/refresh (simple implementation)
authRouter.post('/refresh', async (req, res) => {
    try {
        // Accept different payload shapes for refreshToken
        let refreshToken = req.body?.refreshToken || req.body?.data?.tokens?.refreshToken || req.headers['x-refresh-token'];
        if (!refreshToken)
            return res.status(400).json({ error: 'refreshToken requerido' });
        try {
            const decoded = jsonwebtoken_1.default.verify(String(refreshToken), JWT_SECRET);
            const accessToken = signAccessToken({ id: decoded.id });
            return res.json({ data: { accessToken } });
        }
        catch (e) {
            return res.status(401).json({ error: 'Refresh token inválido' });
        }
    }
    catch (err) {
        console.error('Refresh error', err && err.message);
        res.status(500).json({ error: 'Error interno' });
    }
});
// GET /auth/profile
authRouter.get('/profile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ error: 'No autorizado' });
        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (e) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        const q = 'SELECT id, email, first_name, last_name, user_type FROM users WHERE id = $1 LIMIT 1';
        const result = await postgres_1.pgPool.query(q, [decoded.id]);
        if (!result || !result.rows || result.rows.length === 0)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        const user = result.rows[0];
        res.json({ data: { user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, userType: user.user_type } } });
    }
    catch (err) {
        console.error('Profile error', err && err.message);
        res.status(500).json({ error: 'Error interno' });
    }
});
// PUT /auth/profile
authRouter.put('/profile', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ error: 'No autorizado' });
        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (e) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        const { firstName, lastName, phone } = req.body;
        const q = `UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), phone = COALESCE($3, phone) WHERE id = $4 RETURNING id, email, first_name, last_name, user_type`;
        const result = await postgres_1.pgPool.query(q, [firstName || null, lastName || null, phone || null, decoded.id]);
        if (!result || !result.rows || result.rows.length === 0)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        const user = result.rows[0];
        res.json({ data: { user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, userType: user.user_type } } });
    }
    catch (err) {
        console.error('Profile update error', err && err.message);
        res.status(500).json({ error: 'Error interno' });
    }
});
exports.default = authRouter;
