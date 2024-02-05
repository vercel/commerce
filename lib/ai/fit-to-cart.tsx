import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getCart } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { Suspense } from 'react';

async function getCartFromCookies() {
  const cartId = cookies().get('cartId')?.value;
  if (cartId) {
    return getCart(cartId);
  }
  return null;
}

export async function FitToCart({ currentProduct }: { currentProduct: Product }) {
  return (
    <Suspense fallback={null}>
      <FitToCartInternal currentProduct={currentProduct} />
    </Suspense>
  );
}

async function FitToCartInternal({ currentProduct }: { currentProduct: Product }) {
  const pitch = await getPitch({ currentProduct });
  if (!pitch) return null;
  return <div className="mt-6 text-sm leading-tight dark:text-white/[60%]">{pitch}</div>;
}

const fireworks = new OpenAI({
  baseURL: 'https://api.fireworks.ai/inference/v1',
  apiKey: process.env.FIREWORKS_API_KEY!
});

function buildPrompt(prompt: string) {
  return prompt.split('\n').map((message) => ({
    role: 'user' as const,
    content: message
  }));
}

export async function getPitch({ currentProduct }: { currentProduct: Product }) {
  const cart = await getCartFromCookies();
  if (!cart) return null;
  const products = cart.lines
    .filter((line) => line.merchandise.product.id !== currentProduct.id)
    .map((line) => `"${line.merchandise.product.title}"`);
  if (!products.length) return null;

  const prompt = `Write a 30 word pitch for why a person who has ${products.join(
    ' and '
  )} in their shopping cart should also purchase the "${currentProduct.title}"`;

  const query = {
    model: 'accounts/fireworks/models/mistral-7b-instruct-4k',
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    temperature: 0.75,
    top_p: 1,
    frequency_penalty: 1
  } as const;

  return unstable_cache(async () => {
    // Request the Fireworks API for the response based on the prompt
    const response = await fireworks.chat.completions.create(query);

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    const streamingResponse = new StreamingTextResponse(stream);
    let text = await streamingResponse.text();
    // Remove the quotes from the response tht the LLM sometimes adds.
    text = text.trim().replace(/^"/, '').replace(/"$/, '');
    return text;
  }, [
    JSON.stringify(query),
    '1.0',
    process.env.VERCEL_BRANCH_URL || '',
    process.env.NODE_ENV || ''
  ])();
}
