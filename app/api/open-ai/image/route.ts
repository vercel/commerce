// pages/api/agent.js
//This is the API route called by front end to generate text (story, DALLE descriptors, etc.)
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method === 'POST') {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { prompt } = await req.json();

    try {
      const imageCompletion = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        size: '1024x1024'
      });

      const { data } = imageCompletion;
      console.log({ data });

      return new NextResponse(JSON.stringify({ text: data }), {
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
