import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../../utils/logger';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  hours: string;
  menuSummary: string;
  phone: string;
  phoneNumberId: string;
}

export async function generateResponse(
  userMessage: string,
  restaurant: Restaurant,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const systemPrompt = `És o assistente virtual do restaurante "${restaurant.name}".

Informação do restaurante:
- Morada: ${restaurant.address}
- Horário: ${restaurant.hours}
- Menu: ${restaurant.menuSummary}

Instruções:
- Responde SEMPRE em português, de forma amigável e natural
- Podes fazer reservas pedindo: nome, data, hora e número de pessoas
- Para reservas, confirma sempre os detalhes antes de finalizar
- Responde a perguntas sobre o menu, horário e localização
- Se não souberes algo, diz que vais verificar e pedes para contactarem por telefone
- Mantém as respostas concisas (máximo 3-4 frases)`;

  const messages = [
    ...conversationHistory,
    { role: 'user' as const, content: userMessage }
  ];

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 500,
      system: systemPrompt,
      messages
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : '';
    logger.info('Claude AI response generated', { restaurantId: restaurant.id, tokens: response.usage });
    return reply;
  } catch (error) {
    logger.error('Claude AI error', { error });
    return 'Desculpe, estou com dificuldades técnicas. Por favor tente novamente em alguns minutos.';
  }
}

export async function extractBookingIntent(message: string): Promise<{
  isBooking: boolean;
  date?: string;
  time?: string;
  partySize?: number;
  name?: string;
}> {
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 200,
    system: 'Extract booking information from the message. Return JSON only.',
    messages: [{
      role: 'user',
      content: `Extract from: "${message}"\nReturn JSON: {"isBooking": bool, "date": "string|null", "time": "string|null", "partySize": number|null, "name": "string|null"}`
    }]
  });

  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
    return JSON.parse(text);
  } catch {
    return { isBooking: false };
  }
}
