const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function generateAIResponse(userMessage, restaurant, customerPhone) {
  const systemPrompt = `És o assistente virtual do restaurante "${restaurant.name}".
Localização: ${restaurant.address}
Horário: ${restaurant.hours}
Menu: ${restaurant.menu_summary}

Responde sempre em português, de forma amigável e natural.
Podes fazer reservas, responder perguntas e ajudar os clientes.
Quando um cliente quiser fazer uma reserva, pede: nome, data, hora e número de pessoas.`;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 500,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }]
  });

  return response.content[0].text;
}

module.exports = { generateAIResponse };
