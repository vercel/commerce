import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method === 'POST') {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { model, messages, functions } = await req.json();

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        functions: functions
      });

      const message = chatCompletion.choices[0].message;
      return new NextResponse(JSON.stringify({ text: message }), {
        status: 200
      });
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
          status: 400
        });
      }
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500
      });
    }
  }
  const response = NextResponse.next();
  response.headers.set('Allow', 'POST');

  // Return a 405 response with a custom message
  return new NextResponse(`Method ${req.method} Not Allowed`, {
    status: 405,
    headers: {
      Allow: 'POST'
    }
  });
}
