import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { model, messages, functions } = req.body.payload;

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        functions: functions
      });

      const message = chatCompletion.choices[0].message;
      res.status(200).json({ text: message });
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
