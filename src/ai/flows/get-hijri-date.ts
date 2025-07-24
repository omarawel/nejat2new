
'use server';
/**
 * @fileOverview An AI flow to convert Gregorian dates to Hijri dates.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GetHijriDateInputSchema = z.object({
  date: z.string().describe('The Gregorian date in YYYY-MM-DD format.'),
  language: z.enum(['de', 'en']).describe('The desired output language for the month name (de for German, en for English).'),
});
export type GetHijriDateInput = z.infer<typeof GetHijriDateInputSchema>;

export const GetHijriDateOutputSchema = z.object({
  hijriDate: z.string().describe('The calculated Hijri date as a formatted string, e.g., "15 Muharram 1446 AH".'),
});
export type GetHijriDateOutput = z.infer<typeof GetHijriDateOutputSchema>;


const getHijriDatePrompt = ai.definePrompt({
    name: 'getHijriDatePrompt',
    input: { schema: GetHijriDateInputSchema },
    output: { schema: GetHijriDateOutputSchema },
    prompt: `You are an expert in Islamic calendar conversions. Convert the given Gregorian date to the corresponding Hijri date.

    Gregorian Date: {{{date}}}
    
    Instructions:
    1.  Calculate the precise Hijri date (day, month, year).
    2.  Format the output as a string: "[Day] [Month Name] [Year] AH".
    3.  The month name should be in the language specified: {{{language}}}. For 'de', use German month names (e.g., "Muharram", "Safar", "Dschumada al-ula"). For 'en', use English month names (e.g., "Muharram", "Safar", "Jumada al-ula").
    4.  The final output must be only the formatted string.
    `,
});

const getHijriDateFlow = ai.defineFlow(
    {
        name: 'getHijriDateFlow',
        inputSchema: GetHijriDateInputSchema,
        outputSchema: GetHijriDateOutputSchema,
    },
    async (input) => {
        const { output } = await getHijriDatePrompt(input);
        return output!;
    }
);

export async function getHijriDate(input: GetHijriDateInput): Promise<GetHijriDateOutput> {
    return getHijriDateFlow(input);
}
