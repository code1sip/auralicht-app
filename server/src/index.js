import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import inquiriesRoutes from './routes/inquiries.js';
import statsRoutes from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Auralicht API', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🌿 Auralicht Backend Server running on http://localhost:${PORT}`);
});
