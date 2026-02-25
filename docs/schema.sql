-- AutoAtende Database Schema

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  hours TEXT,
  menu_summary TEXT,
  whatsapp_phone_id VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  customer_phone VARCHAR(50) NOT NULL,
  customer_name VARCHAR(255),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  party_size INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  customer_phone VARCHAR(50) NOT NULL,
  message_in TEXT,
  message_out TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
