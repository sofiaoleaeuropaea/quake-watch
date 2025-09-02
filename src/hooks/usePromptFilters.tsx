import { useMutation } from '@tanstack/react-query';
import { parsePromptWithGemini } from '../lib/gemini';
import type { PromptFilters } from '../lib/gemini';

export const usePromptFilters = () => {

  return useMutation<PromptFilters, Error, string>({
    mutationKey: ['gemini-parse'],
    mutationFn: (prompt: string) => parsePromptWithGemini(prompt),
    
  });
}