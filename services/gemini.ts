
import { GoogleGenAI, Type } from "@google/genai";
import { CAMPUS_KNOWLEDGE_BASE } from "../constants";
import { Issue } from "../types";

export const chatWithGemini = async (prompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Switched to Pro for higher reasoning accuracy on rules
    contents: [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: {
      systemInstruction: CAMPUS_KNOWLEDGE_BASE,
      temperature: 0.2, // Lower temperature for factual accuracy on regulations
      topP: 0.8,
    },
  });

  return response.text || "I'm sorry, I couldn't process that. Please try again.";
};

export const getAdminSummary = async (issues: Issue[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const issuesSummary = issues.map(i => `- [${i.category}] ${i.title}: ${i.description} (Status: ${i.status})`).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following student complaints, provide a concise summary of the top 5 most critical problems currently affecting students and suggest one actionable improvement for the administration.\n\nIssues:\n${issuesSummary}`,
    config: {
      systemInstruction: "You are a senior campus administrator summarizing student issues.",
    },
  });

  return response.text || "Unable to generate summary at this time.";
};

export const analyzeSentiment = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the sentiment of this student complaint: "${text}". Categorize it as "Frustrated", "Neutral", or "Urgent". Reply with ONLY the category name.`,
  });
  return response.text?.trim() || "Neutral";
};
