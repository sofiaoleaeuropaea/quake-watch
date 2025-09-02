export type PromptFilters = {
  magnitudeBt?: number;
  magnitudeBte?: number;
  magnitudeLt?: number;
  magnitudeLte?: number;
  regionText?: string;
  hours?: number;
};

const INSTRUCTIONS = `
Convert a user prompt about the latest earthquakes into a JSON.
Must return only json with these optional keys:
- magnitudeBt: number (strictly bigger than)
- magnitudeBte: number (bigger than or equal to)
- magnitudeLt: number (strictly less than)
- magnitudeLte: number (less than or equal to)
- regionText: string
- hours: number (corresponds to the time window in hours)

- For "exactly X" or "equal X", set both magnitudeBte and magnitudeLte to X.

Examples:
"above 5 in Japan last 3 days"
-> {"magnitudeBt":5,"regionText":"Japan","hours":72}

">=5 Chile last 24h"
-> {"magnitudeBte":5,"regionText":"Chile","hours":24}

"below 4.5 worldwide past 12 hours"
-> {"magnitudeLt":4.5,"hours":12}

"magnitude 5 only in Italy"
-> {"magnitudeBte":5,"magnitudeLte":5,"regionText":"Italy"}

Respond with JSON only and give no explanations.
`;
const normalizePromptFilters = (obj: any): PromptFilters => {
  const normalizedFilters: PromptFilters = {};
  const isNum = (val: any) => typeof val === 'number' && Number.isFinite(val);

  if (isNum(obj?.magnitudeBt)) {
    normalizedFilters.magnitudeBt = obj.magnitudeBt;
  }
  if (isNum(obj?.magnitudeBte)) {
    normalizedFilters.magnitudeBte = obj.magnitudeBte;
  }
  if (isNum(obj?.magnitudeLt)) {
    normalizedFilters.magnitudeLt = obj.magnitudeLt;
  }
  if (isNum(obj?.magnitudeLte)) {
    normalizedFilters.magnitudeLte = obj.magnitudeLte;
  }

  if (typeof obj?.regionText === 'string' && obj.regionText.trim()) {
    normalizedFilters.regionText = obj.regionText.trim();
  }

  if (isNum(obj?.hours)) {
    normalizedFilters.hours = Math.max(1, Math.floor(obj.hours));
  }

  return normalizedFilters;
};

export const parsePromptWithGemini = async (
  prompt: string,
): Promise<PromptFilters> => {
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
        contents: [{ parts: [{ text: `${INSTRUCTIONS}\n\nUser: ${prompt}` }] }],
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message ?? res.statusText);
  }

  const apiResponse = await res.json();
  const modelOutputText: string =
    apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

  const filtersJson = modelOutputText.match(/\{[\s\S]*\}/)?.[0] ?? '{}';
  try {
    return normalizePromptFilters(JSON.parse(filtersJson));
  } catch {
    return {};
  }
};
