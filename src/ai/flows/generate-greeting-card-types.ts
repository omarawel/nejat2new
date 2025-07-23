/**
 * @fileOverview Types for the greeting card generation flow.
 */
import { z } from 'genkit';

export const GenerateGreetingCardInputSchema = z.object({
  occasion: z.string().describe('The occasion for the greeting card, e.g., "Eid", "Ramadan", "Nikah".'),
  customPrompt: z.string().optional().describe('An optional custom prompt from the user to guide the generation of the message and image.'),
});
export type GenerateGreetingCardInput = z.infer<typeof GenerateGreetingCardInputSchema>;

export const GenerateGreetingCardOutputSchema = z.object({
  message: z.string().describe('The AI-generated greeting message for the card.'),
  imageUrl: z.string().describe("The data URI of the AI-generated background image for the card. Format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateGreetingCardOutput = z.infer<typeof GenerateGreetingCardOutputSchema>;
