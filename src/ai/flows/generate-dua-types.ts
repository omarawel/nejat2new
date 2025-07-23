/**
 * @fileOverview Types and schemas for the dua generation flow.
 */
import { z } from 'genkit';

export const GenerateDuaInputSchema = z.object({
  topic: z.string().describe('The main subject or reason for the supplication. For example: "success in an exam", "healing for a sick family member", "gratitude for a new job".'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length of the supplication. "short" should be 1-2 sentences, "medium" 3-4 sentences, and "long" a full paragraph.'),
  language: z.enum(['en', 'de', 'ar']).describe('The desired language of the dua. "en" for English, "de" for German, "ar" for Arabic.'),
});
export type GenerateDuaInput = z.infer<typeof GenerateDuaInputSchema>;

export const GenerateDuaOutputSchema = z.object({
  dua: z.string().describe('The generated supplication text.'),
});
export type GenerateDuaOutput = z.infer<typeof GenerateDuaOutputSchema>;
