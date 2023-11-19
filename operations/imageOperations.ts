import { post } from './fetch';

const generateRequestPayload = (prompt: string) => ({
  model: 'dall-e-3',
  prompt
});

// TODO(Benson): Type the interface returned from open ai

async function createImageAsync(prompt: string): Promise<any> {
  const data = await post('/api/open-ai/image', generateRequestPayload(prompt));
  console.log({ data });
  // return getFunctionCallArguments<any>(data);
  return data;
}

export default { createImageAsync };
