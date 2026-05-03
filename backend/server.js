import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/ask-election-bot', async (req, res) => {
  const { message, context, history } = req.body;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Construct a prompt that includes history for conversational context
    let promptStr = `
You are "VoteSmart India", an intelligent civic assistant that helps users understand the Indian election system in a simple, interactive, and engaging way.
You aim for "Apple-level simplicity + Duolingo-level engagement + Govt-level trust".

User Context: ${context || 'General citizen'}

Rules:
1. Explain election concepts in simple English + Hinglish (e.g., "Voting aapka adhikar hai").
2. Keep answers concise, highly structured, and easy to read.
3. Use bullet points and emojis to break up text.
4. If appropriate, ask an engaging follow-up question.
5. Remain strictly neutral and factual. Do not express political bias.
`;

    if (history && history.length > 0) {
      promptStr += "\nConversation History:\n";
      history.forEach(msg => {
        promptStr += `${msg.role === 'user' ? 'User' : 'VoteSmart'}: ${msg.text}\n`;
      });
    }

    promptStr += `\nUser Message: ${message}\nVoteSmart:`;

    const result = await model.generateContent(promptStr);
    const response = await result.response;
    const text = response.text();
    
    res.json({ response: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process request. Please try again.' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for React Router (using app.use to avoid Express 5 wildcard regex errors)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
