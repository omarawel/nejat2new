/**
 * @fileOverview Types and schemas for the AI quiz generation flow.
 */
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
