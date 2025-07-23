'use server';

/**
 * @fileOverview A flow that provides AI-powered rulings on Halal/Haram topics.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GetHalalHaramRulingInputSchema = z.object({
  topic: z.string().describe('The topic, product, or ingredient to be checked.'),
});
export type GetHalalHaramRulingInput = z.infer<typeof GetHalalHaramRulingInputSchema>;

export const HalalHaramRulingSchema = z.object({
  topic: z.string().describe('The topic that was analyzed.'),
  status: z.enum(['Halal', 'Haram', 'Disputed']).describe('The Islamic ruling on the topic.'),
  explanation: z.string().describe('A detailed explanation of the ruling, citing sources like Quran and Sunnah if possible. Explain the reasoning behind the classification.'),
  wisdom_benefits: z.string().describe('The wisdom and benefits behind the ruling, especially if it is Halal. What are the advantages of adhering to this ruling?'),
  consequences_violation: z.string().describe('The consequences and disadvantages of violating the ruling, especially if it is Haram. What are the spiritual, social, or physical harms to be avoided?'),
});
export type HalalHaramRuling = z.infer<typeof HalalHaramRulingSchema>;

export async function getHalalHaramRuling(input: GetHalalHaramRulingInput): Promise<HalalHaramRuling> {
  return getHalalHaramRulingFlow(input);
}

const getHalalHaramRulingPrompt = ai.definePrompt({
  name: 'getHalalHaramRulingPrompt',
  input: {schema: GetHalalHaramRulingInputSchema},
  output: {schema: HalalHaramRulingSchema},
  prompt: `You are an expert Islamic scholar (Mufti) specializing in Fiqh and Halal/Haram rulings. A user wants to know the Islamic status of a specific topic.

Provide a comprehensive and well-reasoned answer for the following topic: {{{topic}}}

Instructions:
1.  **Determine the Status**: Classify the topic as 'Halal', 'Haram', or 'Disputed'. If it's disputed, briefly mention the main opinions.
2.  **Provide a Detailed Explanation**: Explain the reasoning behind the ruling based on the Quran, Sunnah, and scholarly consensus (Ijma). Be clear and concise.
3.  **Explain the Wisdom/Benefits**: Describe the wisdom behind the ruling. If it's Halal, what are the benefits? If it's Haram, what wisdom is there in avoiding it?
4.  **Explain the Consequences/Disadvantages**: Describe the potential negative consequences of engaging in something Haram, or the disadvantages of avoiding something that is beneficial.
5.  **Maintain a Neutral, Scholarly Tone**: Your response should be informative and based on mainstream Islamic scholarship (Ahlus Sunnah wal Jama'ah). Avoid personal opinions.
6.  Populate all fields of the output schema.
`,
});

const getHalalHaramRulingFlow = ai.defineFlow(
  {
    name: 'getHalalHaramRulingFlow',
    inputSchema: GetHalalHaramRulingInputSchema,
    outputSchema: HalalHaramRulingSchema,
  },
  async input => {
    const {output} = await getHalalHaramRulingPrompt(input);
    return output!;
  }
);
