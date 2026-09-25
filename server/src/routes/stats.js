import express from 'express';
import db from '../config/db.js';
import { requireAdmin } from './auth.js';

const router = express.Router();

router.get('/', requireAdmin, (req, res) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM inquiries');
    const newStmt = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'");
    const readStmt = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'read'");

    const total = totalStmt.get().count;
    const newCount = newStmt.get().count;
    const readCount = readStmt.get().count;

    res.json({
      total,
      new: newCount,
      read: readCount
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Statistiken.' });
  }
});

export default router;
