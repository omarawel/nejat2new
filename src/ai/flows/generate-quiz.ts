
'use server';
/**
 * @fileOverview A flow that generates a multiple-choice quiz on a given Islamic topic.
 *
 * - generateQuiz - A function that takes a topic and returns a list of questions.
 */

import { ai } from '@/ai/genkit';
import {
    GenerateQuizInputSchema,
    GenerateQuizOutputSchema,
    type GenerateQuizInput,
    type GenerateQuizOutput
} from '@/ai/flows/generate-quiz-types';


const generateQuizPrompt = ai.definePrompt({
    name: 'generateQuizPrompt',
    input: { schema: GenerateQuizInputSchema },
    output: { schema: GenerateQuizOutputSchema },
    prompt: `You are an expert Islamic studies teacher creating a multiple-choice quiz.
    The quiz should be about the following topic: {{{topic}}}
    
    Instructions:
    1.  Generate exactly {{{count}}} multiple-choice questions about the topic.
    2.  Each question must have exactly four options.
    3.  One of the options must be the correct answer.
    4.  The questions should be clear, accurate, and suitable for a general audience.
    5.  Ensure the correct answer is present in the options array for each question.
    6.  Vary the position of the correct answer within the options array.
    7.  The final output must be only the list of questions in the specified JSON format.
    `,
});


const generateQuizFlow = ai.defineFlow(
    {
        name: 'generateQuizFlow',
        inputSchema: GenerateQuizInputSchema,
        outputSchema: GenerateQuizOutputSchema,
    },
    async (input) => {
        const { output } = await generateQuizPrompt(input);
        return output!;
    }
);

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
    return generateQuizFlow(input);
}
