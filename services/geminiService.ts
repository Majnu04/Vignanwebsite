import { GoogleGenAI, Type } from "@google/genai";
import type { Program } from '../types';

// Check for API key and provide more user-friendly handling
const API_KEY = process.env.API_KEY || '';

// Only create the AI client if we have an API key
let ai: any;
try {
  if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
  } else {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
} catch (error) {
  console.error("Error initializing Google Genai:", error);
}

const programSchema = {
  type: Type.OBJECT,
  properties: {
    programName: {
      type: Type.STRING,
      description: 'The full name of the recommended academic program.',
    },
    reason: {
        type: Type.STRING,
        description: 'A brief explanation of why this program is a good fit for the user\'s query.'
    }
  },
  required: ['programName', 'reason'],
};

const responseSchema = {
    type: Type.ARRAY,
    items: programSchema,
};

export const findPrograms = async (query: string, availablePrograms: Program[]): Promise<{ programName: string; reason: string }[]> => {
  // If AI client is not initialized, return default recommendations
  if (!ai) {
    console.warn("AI client not available. Returning sample recommendations.");
    return [
      { 
        programName: availablePrograms[0]?.name || "Computer Science Engineering", 
        reason: "This is a default recommendation. Please set up the GEMINI_API_KEY in your Vercel environment variables for AI-powered recommendations." 
      },
      { 
        programName: availablePrograms[1]?.name || "Electronics & Communication Engineering", 
        reason: "This is a default recommendation. AI features are currently disabled." 
      }
    ];
  }

  const programList = availablePrograms.map(p => `"${p.name}"`).join(', ');

  const prompt = `
    You are an expert academic advisor for Vignan College Vizag.
    A prospective student has described their interests: "${query}".
    Based on their interest, recommend the most suitable academic programs from the following list ONLY.
    Do not invent any programs. Your recommendations must be a subset of this list.

    Available programs: [${programList}]

    For each recommended program, provide the name and a brief reason why it matches the student's interest.
    Return a JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        console.warn("Gemini API returned an empty response.");
        return [];
    }

    const parsedResponse = JSON.parse(jsonText);
    return parsedResponse as { programName: string; reason: string }[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // In a real app, you might want to throw a more specific error
    throw new Error("Failed to get recommendations from AI service.");
  }
};