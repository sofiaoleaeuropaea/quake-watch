export type PromptFilters = {
  minMagnitude?: number;
  regionText?: string;
  hours?: number;
};

const INSTRUCTIONS = `
Convert a user prompt about the latest earthquakes into a JSON.
Must return only json with these optional keys:
- minMagnitude: number
- regionText: string
- hours: number (corresponding to the time window in hours)
Examples:
"earthquakes above magnitude 6 in Japan on last 3 days" -> {"minMagnitude":6,"regionText":"Japan","hours":72}
">=5 Chile last 24h" -> {"minMagnitude":5,"regionText":"Chile","hours":24}
Respond with JSON only and give no explanations.
`;

const normalizePromptFilters = (obj: any): PromptFilters => {
  const data: PromptFilters = {};
  if (typeof obj?.minMagnitude === 'number' && isFinite(obj.minMagnitude)) data.minMagnitude = obj.minMagnitude;
  if (typeof obj?.regionText === 'string' && obj.regionText.trim()) data.regionText = obj.regionText.trim();
  if (typeof obj?.hours === 'number' && isFinite(obj.hours)) data.hours = Math.max(1, Math.floor(obj.hours));
  return data;
}

export const parsePromptWithGemini = async (prompt: string): Promise<PromptFilters> => {
  const geminikey = import.meta.env.VITE_GEMINI_API_KEY!;
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminikey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${INSTRUCTIONS}\n\nUser: ${prompt}` }]}],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message ?? res.statusText);
  }

  const apiResponse = await res.json();
  const modelOutputText: string = apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

  const filtersJson = modelOutputText.match(/\{[\s\S]*\}/)?.[0] ?? '{}';
  try {
    return normalizePromptFilters(JSON.parse(filtersJson));
  } catch {
    return {};
  }
}
