import { useMutation, useQueryClient } from '@tanstack/react-query';
import { parsePromptWithGemini } from '../lib/gemini';
import type { PromptFilters } from '../lib/gemini';

export const usePromptFilters = () => {
  const queryClient = useQueryClient();

  return useMutation<PromptFilters, Error, string>({
    mutationKey: ['gemini-parse'],
    mutationFn: (prompt: string) => parsePromptWithGemini(prompt),
    onSuccess(filters, prompt) {
      queryClient.setQueryData(['gemini-parse', prompt], filters);
    },
  });
}