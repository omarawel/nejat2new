
'use server';
/**
 * @fileOverview A flow that generates Islamic name suggestions based on user criteria.
 */

import { ai } from '@/ai/genkit';
import { GenerateIslamicNameInputSchema, GenerateIslamicNameOutputSchema, type GenerateIslamicNameInput, type GenerateIslamicNameOutput } from '@/ai/flows/generate-islamic-name-types';

const generateNamePrompt = ai.definePrompt({
    name: 'generateIslamicNamePrompt',
    input: { schema: GenerateIslamicNameInputSchema },
    output: { schema: GenerateIslamicNameOutputSchema },
    prompt: `You are an expert in Islamic names and their etymology. A user is looking for a name for their child.

    Generate {{{count}}} Islamic names for a {{{gender}}} based on the following desired meaning: "{{{meaning}}}"
    
    Instructions:
    1.  For each name, provide the common transliteration, the name in Arabic script, and a clear, concise meaning.
    2.  Ensure the names are authentic and have positive, noble meanings suitable for a Muslim child.
    3.  Do not repeat names in the list.
    4.  The output must be only the list of names in the specified format.
    `,
});


const generateIslamicNameFlow = ai.defineFlow(
    {
        name: 'generateIslamicNameFlow',
        inputSchema: GenerateIslamicNameInputSchema,
        outputSchema: GenerateIslamicNameOutputSchema,
    },
    async (input) => {
        const { output } = await generateNamePrompt(input);
        return output!;
    }
);

export async function generateIslamicName(input: GenerateIslamicNameInput): Promise<GenerateIslamicNameOutput> {
    return generateIslamicNameFlow(input);
}
