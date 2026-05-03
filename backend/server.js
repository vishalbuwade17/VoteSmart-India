import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

dotenv.config();

import logger from './services/logger.js';
import { getElectionBotResponse } from './services/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security & Efficiency Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for simple React serving without strict CSP setups
}));
app.use(compression());
app.use(cors({
  origin: '*', // In production, this should be restricted to specific domains
  methods: ['GET', 'POST']
}));
app.use(express.json());

// Rate Limiting to prevent spam/DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', apiLimiter);

// Gemini Setup
// API Endpoint for the AI Bot
app.post('/api/ask-election-bot', async (req, res) => {
  const { message, context, history } = req.body;
  
  // Basic Input Validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    logger.warn('Invalid request payload: Missing or empty message');
    return res.status(400).json({ error: 'Message is required and must be a string.' });
  }

  try {
    const text = await getElectionBotResponse(message, context, history);
    logger.info('Successfully generated AI response', { context });
    res.json({ response: text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process request. Please try again.' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for React Router (using app.use to avoid Express 5 wildcard regex errors)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled Server Error:', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, '0.0.0.0', () => logger.info(`Server running on port ${PORT}`));
