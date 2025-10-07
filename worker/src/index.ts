export interface Env {
  GEMINI_API_KEY: string;
}

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const ORIGINS = new Set([
  'https://sofiaoleaeuropaea.github.io',
  'http://localhost:5173',
]);

function cors(req: Request) {
  const origin = req.headers.get('Origin') || '';
  const allow = ORIGINS.has(origin) ? origin : '';
  return {
    'Access-Control-Allow-Origin': allow || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(request) });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: cors(request),
      });
    }

    const body = await request.text();

    const upstream = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body,
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: { 'content-type': 'application/json', ...cors(request) },
    });
  },
};
