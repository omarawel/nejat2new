
'use server';
/**
 * @fileOverview A flow that generates content and an image for a greeting card.
 *
 * - generateGreetingCard - A function that takes an occasion and prompt and returns a message and image URL.
 */

import { ai } from '@/ai/genkit';
import { GenerateGreetingCardInputSchema, GenerateGreetingCardOutputSchema, type GenerateGreetingCardInput, type GenerateGreetingCardOutput } from './generate-greeting-card-types';
import { z } from 'zod';


const cardGenerationPrompt = ai.definePrompt({
    name: 'generateGreetingCardPrompt',
    input: {
        schema: z.object({
            occasion: GenerateGreetingCardInputSchema.shape.occasion,
            customPrompt: GenerateGreetingCardInputSchema.shape.customPrompt,
        }),
    },
    output: {
        schema: z.object({
            message: GenerateGreetingCardOutputSchema.shape.message,
            imagePrompt: z.string().describe('A descriptive DALL-E prompt for an image generation model, capturing the essence of the occasion. The image should be beautiful, artistic, and suitable for a greeting card. Use Islamic geometric patterns, calligraphy, or symbols related to the occasion.'),
        })
    },
    prompt: `You are an AI assistant creating content for an Islamic greeting card.
    The occasion is: {{{occasion}}}.
    The user provided the following guidance: "{{{customPrompt}}}"
    
    1.  Generate a heartfelt and appropriate greeting message.
    2.  Create a detailed prompt for an image generation model to create a beautiful, artistic background image. The image should be visually appealing and themed around the occasion (e.g., lanterns for Ramadan, crescent moon for Eid).
    `,
});


const generateGreetingCardFlow = ai.defineFlow(
    {
        name: 'generateGreetingCardFlow',
        inputSchema: GenerateGreetingCardInputSchema,
        outputSchema: GenerateGreetingCardOutputSchema,
    },
    async (input) => {
        // 1. Generate text content and an image prompt
        const { output } = await cardGenerationPrompt(input);
        if (!output) {
            throw new Error("Failed to generate card content.");
        }
        
        const { message, imagePrompt } = output;

        // 2. Generate the image
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: imagePrompt,
             config: {
                responseModalities: ['TEXT', 'IMAGE'],
            },
        });

        if (!media?.url) {
            throw new Error("Failed to generate image.");
        }

        return {
            message,
            imageUrl: media.url,
        };
    }
);

export async function generateGreetingCard(input: GenerateGreetingCardInput): Promise<GenerateGreetingCardOutput> {
    return generateGreetingCardFlow(input);
}
