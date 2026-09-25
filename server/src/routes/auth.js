import express from 'express';
import crypto from 'node:crypto';

const router = express.Router();

// Simple in-memory session token store (or deterministic session token)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'auralicht2026';
const activeTokens = new Set();

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!activeTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }
  next();
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = crypto.randomBytes(32).toString('hex');
    activeTokens.add(token);
    return res.json({
      success: true,
      token,
      user: { username: ADMIN_USER, role: 'administrator' }
    });
  }
  return res.status(401).json({ error: 'Benutzername oder Passwort falsch.' });
});

router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '');
    activeTokens.delete(token);
  }
  res.json({ success: true });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ user: { username: ADMIN_USER, role: 'administrator' } });
});

export default router;
