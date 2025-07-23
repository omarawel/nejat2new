
'use server';
/**
 * @fileOverview A flow that generates a personalized dua (supplication).
 *
 * - generateDua - A function that takes a topic, length, and language and returns a dua.
 * - GenerateDuaInput - The input type for the generateDua function.
 * - GenerateDuaOutput - The return type for the generateDua function.
 */

import { ai } from '@/ai/genkit';
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


const generateDuaPrompt = ai.definePrompt({
    name: 'generateDuaPrompt',
    input: { schema: GenerateDuaInputSchema },
    output: { schema: GenerateDuaOutputSchema },
    prompt: `You are a knowledgeable and pious Muslim scholar. A user wants you to compose a beautiful and heartfelt supplication (dua).

    The user's need is about: {{{topic}}}
    The desired length is: {{{length}}}
    The dua should be in this language: {{{language}}}
    
    Instructions:
    1.  Craft a dua that is sincere, humble, and uses appropriate Islamic terminology.
    2.  If the requested language is Arabic, provide the dua in Arabic script.
    3.  If the requested language is German or English, provide the dua in that language.
    4.  The dua should directly address Allah (e.g., "O Allah", "Mein Herr").
    5.  Ensure the dua aligns with the Quran and Sunnah.
    6.  The final output must only be the text of the dua itself.
    `,
});


const generateDuaFlow = ai.defineFlow(
    {
        name: 'generateDuaFlow',
        inputSchema: GenerateDuaInputSchema,
        outputSchema: GenerateDuaOutputSchema,
    },
    async (input) => {
        const { output } = await generateDuaPrompt(input);
        return output!;
    }
);

export async function generateDua(input: GenerateDuaInput): Promise<GenerateDuaOutput> {
    return generateDuaFlow(input);
}
