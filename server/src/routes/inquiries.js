import express from 'express';
import db from '../config/db.js';
import { requireAdmin } from './auth.js';

const router = express.Router();

// Public: Submit inquiry
router.post('/', (req, res) => {
  const { vorname, nachname, email, telefon, thema, nachricht } = req.body;

  if (!vorname || !nachname || !email || !nachricht) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO inquiries (vorname, nachname, email, telefon, thema, nachricht, status)
      VALUES (?, ?, ?, ?, ?, ?, 'new')
    `);
    const info = stmt.run(
      vorname.trim(),
      nachname.trim(),
      email.trim(),
      (telefon || '').trim(),
      (thema || '').trim(),
      nachricht.trim()
    );

    res.status(201).json({
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich gesendet!',
      id: Number(info.lastInsertRowid)
    });
  } catch (err) {
    console.error('Error inserting inquiry:', err);
    res.status(500).json({ error: 'Datenbankfehler beim Speichern der Anfrage.' });
  }
});

// Admin: Get all inquiries with optional search & filter
router.get('/', requireAdmin, (req, res) => {
  const { status, q } = req.query;

  let query = 'SELECT * FROM inquiries';
  const conditions = [];
  const params = [];

  if (status && status !== 'all') {
    conditions.push('status = ?');
    params.push(status);
  }

  if (q && q.trim()) {
    const search = `%${q.trim()}%`;
    conditions.push('(vorname LIKE ? OR nachname LIKE ? OR email LIKE ? OR thema LIKE ? OR nachricht LIKE ?)');
    params.push(search, search, search, search, search);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  try {
    const stmt = db.prepare(query);
    const rows = stmt.all(...params);
    res.json(rows);
  } catch (err) {
    console.error('Error querying inquiries:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Anfragen.' });
  }
});

// Admin: Toggle or update status
router.patch('/:id/status', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['new', 'read', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Ungültiger Status.' });
  }

  try {
    const stmt = db.prepare('UPDATE inquiries SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true, id: Number(id), status });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Status.' });
  }
});

// Admin: Delete inquiry
router.delete('/:id', requireAdmin, (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare('DELETE FROM inquiries WHERE id = ?');
    stmt.run(id);
    res.json({ success: true, message: 'Anfrage gelöscht.' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ error: 'Fehler beim Löschen der Anfrage.' });
  }
});

export default router;
