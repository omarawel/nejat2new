/**
 * @fileOverview Types and schemas for the Islamic name generation flow.
 */
import { z } from 'genkit';

export const GenerateIslamicNameInputSchema = z.object({
  gender: z.enum(['male', 'female']).describe('The gender for which to generate names.'),
  meaning: z.string().describe('A keyword or phrase describing the desired meaning of the name. For example: "courageous", "light", "patient", "beautiful flower".'),
  count: z.number().int().min(1).max(10).default(5).describe('The number of name suggestions to generate.'),
});
export type GenerateIslamicNameInput = z.infer<typeof GenerateIslamicNameInputSchema>;

export const NameSuggestionSchema = z.object({
    name: z.string().describe('The suggested name in its common transliteration.'),
    arabic: z.string().describe('The name written in Arabic script.'),
    meaning: z.string().describe('The detailed meaning and origin of the name.'),
});

export const GenerateIslamicNameOutputSchema = z.object({
  names: z.array(NameSuggestionSchema).describe('An array of generated name suggestions.'),
});
export type GenerateIslamicNameOutput = z.infer<typeof GenerateIslamicNameOutputSchema>;
