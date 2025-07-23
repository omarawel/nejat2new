import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { summarizeIslamicHistory } from "./flows/summarize-islamic-history";

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
  flows: {
    summarizeIslamicHistory,
  },
});
