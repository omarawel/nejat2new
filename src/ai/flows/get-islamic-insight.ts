'use server';

/**
 * @fileOverview A flow that provides AI-powered insights about Islamic texts.
 *
 * - getIslamicInsight - A function that takes a question about Islamic texts and returns an AI-powered insight.
 * - GetIslamicInsightInput - The input type for the getIslamicInsight function.
 * - GetIslamicInsightOutput - The return type for the getIslamicInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetIslamicInsightInputSchema = z.object({
  question: z.string().describe('The question about Islamic texts.'),
});
export type GetIslamicInsightInput = z.infer<typeof GetIslamicInsightInputSchema>;

const GetIslamicInsightOutputSchema = z.object({
  insight: z.string().describe('The AI-powered insight about Islamic texts.'),
});
export type GetIslamicInsightOutput = z.infer<typeof GetIslamicInsightOutputSchema>;

export async function getIslamicInsight(input: GetIslamicInsightInput): Promise<GetIslamicInsightOutput> {
  return getIslamicInsightFlow(input);
}

const getIslamicInsightPrompt = ai.definePrompt({
  name: 'getIslamicInsightPrompt',
  input: {schema: GetIslamicInsightInputSchema},
  output: {schema: GetIslamicInsightOutputSchema},
  prompt: `You are an AI assistant specializing in providing insights about Islamic texts.  A user will ask a question about Islam, and you will provide a detailed and informative answer.

Question: {{{question}}}`,
});

const getIslamicInsightFlow = ai.defineFlow(
  {
    name: 'getIslamicInsightFlow',
    inputSchema: GetIslamicInsightInputSchema,
    outputSchema: GetIslamicInsightOutputSchema,
  },
  async input => {
    const {output} = await getIslamicInsightPrompt(input);
    return output!;
  }
);
