import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from './logger.js';

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Service to interact with Google's Gemini AI model.
 * Handles the construction of the prompt and the API call.
 * 
 * @param {string} message - The user's input message.
 * @param {string} context - The context of the user (e.g., First-time voter).
 * @param {Array} history - The chat history array containing role and text.
 * @returns {Promise<string>} The AI's response text.
 */
export const getElectionBotResponse = async (message, context, history) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
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
    return response.text();
  } catch (error) {
    logger.error('Error fetching response from Gemini AI:', { error: error.message, stack: error.stack });
    throw new Error('Failed to generate AI response');
  }
};
