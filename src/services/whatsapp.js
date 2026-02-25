const axios = require('axios');
const { generateAIResponse } = require('./ai');
const { getRestaurantByPhone } = require('./restaurant');

async function sendMessage(to, text, phoneNumberId) {
  await axios.post(
    `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
    {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text }
    },
    { headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` } }
  );
}

async function handleWhatsAppMessage(msg, metadata) {
  if (msg.type !== 'text') return;

  const from = msg.from;
  const text = msg.text.body;
  const phoneNumberId = metadata.phone_number_id;

  // Get restaurant context
  const restaurant = await getRestaurantByPhone(phoneNumberId);
  if (!restaurant) return;

  // Generate AI response
  const reply = await generateAIResponse(text, restaurant, from);
  await sendMessage(from, reply, phoneNumberId);
}

module.exports = { sendMessage, handleWhatsAppMessage };
