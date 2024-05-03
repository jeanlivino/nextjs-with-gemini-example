import { GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_AI_API_KEY || ''
);

export const geminiPro = genAI.getGenerativeModel({
  model: 'gemini-pro',
});
