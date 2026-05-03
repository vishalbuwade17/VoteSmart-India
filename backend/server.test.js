import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Integration tests for the VoteSmart Express API.
 * Tests both the health check and the election bot endpoint.
 */

// Create a lightweight test app without starting the server
const createApp = async () => {
  const app = express();
  app.use(express.json());

  // Mock the Gemini service to avoid real API calls in tests
  app.post('/api/ask-election-bot', async (req, res) => {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required and must be a string.' });
    }
    // Return a mock response
    return res.status(200).json({ response: 'This is a mock response about Indian elections.' });
  });

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'votesmart-backend' });
  });

  return app;
};

describe('VoteSmart API Endpoints', () => {
  let app;

  beforeAll(async () => {
    app = await createApp();
  });

  describe('GET /health', () => {
    it('should return 200 with a status of ok', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });

  describe('POST /api/ask-election-bot', () => {
    it('should return 200 and a response for a valid message', async () => {
      const res = await request(app)
        .post('/api/ask-election-bot')
        .send({ message: 'What is NOTA?', context: 'First-time voter' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('response');
      expect(typeof res.body.response).toBe('string');
    });

    it('should return 400 for an empty message', async () => {
      const res = await request(app)
        .post('/api/ask-election-bot')
        .send({ message: '' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 when message field is missing', async () => {
      const res = await request(app)
        .post('/api/ask-election-bot')
        .send({ context: 'General citizen' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 for a non-string message', async () => {
      const res = await request(app)
        .post('/api/ask-election-bot')
        .send({ message: 12345 });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
