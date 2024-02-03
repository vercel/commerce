import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getCart } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
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
  let text = await pitch.text();
  if (!text) return null;
  text = text.trim().replace(/^"/, '').replace(/"$/, '');
  return <div className="mt-6 text-sm leading-tight dark:text-white/[60%]">{text}</div>;
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

  // Request the Fireworks API for the response based on the prompt
  const response = await fireworks.chat.completions.create({
    model: 'accounts/fireworks/models/mistral-7b-instruct-4k',
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    temperature: 0.75,
    top_p: 1,
    frequency_penalty: 1
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
