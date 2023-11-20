import { post } from './fetch';

const generateRequestPayload = (prompt: string) => ({
  model: 'dall-e-3',
  prompt
});

// TODO(Benson): Type the interface returned from open ai

function getFunctionCallArguments<T>(response: any) {
  return response.data[0].url;
}

async function createImageAsync(prompt: string): Promise<any> {
  const data = await post('/api/open-ai/image', generateRequestPayload(prompt));
  console.log('return payload of DALLE', data);
  return getFunctionCallArguments<string>(data);
}

export default { createImageAsync };
