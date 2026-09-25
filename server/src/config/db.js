import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'inquiries.db');
const db = new DatabaseSync(dbPath);

// Initialize schema if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    vorname    TEXT NOT NULL,
    nachname   TEXT NOT NULL,
    email      TEXT NOT NULL,
    telefon    TEXT,
    thema      TEXT,
    nachricht  TEXT NOT NULL,
    status     TEXT NOT NULL DEFAULT 'new',
    notes      TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
