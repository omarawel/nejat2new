'use server';
/**
 * @fileOverview A flow that generates a multiple-choice quiz on a given Islamic topic.
 *
 * - generateQuiz - A function that takes a topic and returns a list of questions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for the quiz. Can be broad (e.g., "The Prophets") or specific (e.g., "The life of Prophet Musa").'),
  count: z.number().int().min(3).max(10).default(5).describe('The number of questions to generate for the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

export const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question text.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four possible answers (strings). One of them must be the correct answer.'),
  correctAnswer: z.string().describe('The correct answer from the options array.'),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe('An array of generated quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;


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
