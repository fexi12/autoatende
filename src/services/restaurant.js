const { pool } = require('../models/db');

async function getRestaurantByPhone(phoneNumberId) {
  const result = await pool.query(
    'SELECT * FROM restaurants WHERE whatsapp_phone_id = $1',
    [phoneNumberId]
  );
  return result.rows[0] || null;
}

module.exports = { getRestaurantByPhone };
