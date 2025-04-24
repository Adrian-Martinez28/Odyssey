import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash-exp", {
      useSearchGrounding: true
    }),
    messages,
  });

  return result.toDataStreamResponse();
}