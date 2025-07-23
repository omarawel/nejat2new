
'use server';
/**
 * @fileOverview A flow that generates a personalized dua (supplication).
 *
 * - generateDua - A function that takes a topic, length, and language and returns a dua.
 */

import { ai } from '@/ai/genkit';
import { GenerateDuaInputSchema, GenerateDuaOutputSchema, type GenerateDuaInput, type GenerateDuaOutput } from '@/ai/flows/generate-dua-types';


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
