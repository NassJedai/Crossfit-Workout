import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { programming} = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(programming),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(programming) {
  return `generate a ${programming}-focused CrossFit program, 
          generate the stretching, mobility, warm-up, workout of the day, and finisher. 
          indicates the number of minutes for each party.
          if there are bar or bumbell weights, indicates the weight in kg or in maximum percentage
          `;
}