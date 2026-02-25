# AutoAtende - Technical Architecture

## 🎯 Product Overview
**AutoAtende** is an AI-powered WhatsApp bot for Portuguese restaurants that handles:
- 24/7 customer service in natural Portuguese
- Automatic reservations with Google Calendar integration
- FAQ responses and menu queries
- Customer data collection and analytics

---

## 🏗️ Technical Stack

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Queue:** Bull/Redis for message processing
- **AI:** Claude API for natural language processing

### WhatsApp Integration
- **Provider:** WhatsApp Business API (via 360dialog or Meta)
- **Webhook handling:** Express endpoints
- **Message templates:** Pre-approved business templates
- **Media support:** Images, PDFs for menus

### Frontend Dashboard
- **Framework:** Next.js 14 with TypeScript
- **UI Library:** Shadcn/ui + Tailwind CSS
- **Charts:** Recharts for analytics
- **Authentication:** NextAuth.js

### Infrastructure
- **Hosting:** Railway.app or Render
- **Domain:** autoatende.pt
- **SSL:** Let's Encrypt (automatic)
- **Monitoring:** Sentry for error tracking
- **Payments:** Stripe for subscriptions

---

## 🗄️ Database Schema

```sql
-- Restaurants
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  address TEXT,
  whatsapp_number VARCHAR(20) UNIQUE NOT NULL,
  status ENUM('trial', 'active', 'suspended') DEFAULT 'trial',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Restaurant Settings
CREATE TABLE restaurant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  opening_hours JSONB, -- {"monday": {"open": "12:00", "close": "22:00"}}
  max_capacity INTEGER DEFAULT 50,
  table_sizes JSONB, -- [2, 4, 6, 8] available table sizes
  booking_rules JSONB, -- advance notice, max party size, etc
  auto_responses JSONB, -- custom FAQ responses
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255),
  party_size INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  special_requests TEXT,
  created_via ENUM('whatsapp', 'dashboard') DEFAULT 'whatsapp',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages Log
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  customer_phone VARCHAR(20) NOT NULL,
  direction ENUM('inbound', 'outbound') NOT NULL,
  message_type ENUM('text', 'image', 'document') DEFAULT 'text',
  content TEXT NOT NULL,
  ai_response BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  plan ENUM('basic') DEFAULT 'basic',
  status ENUM('active', 'cancelled', 'past_due') DEFAULT 'active',
  stripe_subscription_id VARCHAR(255),
  current_period_start DATE,
  current_period_end DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints

### WhatsApp Webhook
```
POST /webhook/whatsapp
- Receives messages from WhatsApp Business API
- Processes with AI for intent recognition
- Routes to appropriate handler (reservation, FAQ, etc)
- Sends response back via WhatsApp API
```

### Dashboard API
```
GET /api/restaurants/:id/analytics
GET /api/restaurants/:id/reservations
POST /api/restaurants/:id/reservations
PUT /api/restaurants/:id/settings
GET /api/messages/:restaurantId
```

### Stripe Webhooks
```
POST /webhook/stripe
- Handles subscription events
- Updates restaurant status
- Sends notifications
```

---

## 🤖 AI Processing Pipeline

### Message Flow
1. **Receive WhatsApp message** → Express webhook
2. **Intent classification** → Claude API determines intent:
   - Reservation request
   - Menu inquiry
   - General question
   - Complaint/feedback
3. **Context building** → Include restaurant info, hours, availability
4. **Response generation** → Claude generates natural Portuguese response
5. **Action execution** → Create reservation, send menu, etc
6. **Send reply** → WhatsApp Business API

### Sample AI Prompts
```
System: You are AutoAtende, an AI assistant for [Restaurant Name]. 
Respond in natural Portuguese. Current time: [TIME], Restaurant status: [OPEN/CLOSED]

Available actions:
- CREATE_RESERVATION: {date, time, party_size, customer_name, phone}
- SEND_MENU: Send restaurant menu
- CHECK_AVAILABILITY: Check table availability
- FAQ: Answer common questions

Customer message: [MESSAGE]
Restaurant context: [HOURS, CAPACITY, RULES]
```

---

## 📱 WhatsApp Business API Integration

### Setup Requirements
- WhatsApp Business Account verification
- Phone number ownership verification  
- Business profile completion
- Message templates approval (24h process)

### Message Templates (Pre-approved)
```
RESERVATION_CONFIRMED: 
"Olá {{1}}! A sua reserva para {{2}} pessoas no dia {{3}} às {{4}} está confirmada. Até breve! 
- {{restaurant_name}}"

RESERVATION_CANCELLED:
"A sua reserva para {{1}} foi cancelada. Para reagendar, responda a esta mensagem.
- {{restaurant_name}}"
```

---

## 🚀 Deployment Pipeline

### Development
```bash
# Local development
npm run dev          # Next.js frontend
npm run server       # Express backend
npm run db:migrate   # Prisma migrations
```

### Production (Railway)
```yaml
# railway.json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "healthcheckPath": "/health"
  }
}
```

### Environment Variables
```
DATABASE_URL=postgresql://...
CLAUDE_API_KEY=sk-ant-...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_VERIFY_TOKEN=...
STRIPE_SECRET_KEY=sk_...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://autoatende.pt
```

---

## 💰 Pricing & Business Model

### Customer Pricing
- **Setup Fee:** €199 (first customer FREE)
- **Monthly:** €29/month
- **Includes:** Unlimited messages, reservations, analytics, support

### Cost Structure (per customer)
- WhatsApp API: ~€5-8/month (depends on message volume)
- Claude API: ~€2-3/month  
- Infrastructure: ~€2/month (shared hosting)
- **Total Cost:** ~€10/month per customer
- **Gross Margin:** ~€19/month (65%)

---

## 🎯 MVP Timeline (4 weeks)

### Week 1: Core Backend
- Database setup & migrations
- WhatsApp webhook integration  
- Basic AI message processing
- Reservation creation logic

### Week 2: AI Enhancement  
- Advanced intent recognition
- Context-aware responses
- Menu handling & FAQ system
- Message templates setup

### Week 3: Dashboard
- Restaurant onboarding flow
- Reservation management UI
- Analytics dashboard
- Settings configuration

### Week 4: Launch Preparation
- First customer pilot testing
- Payment integration (Stripe)
- Production deployment
- Documentation & support materials

---

## 🔒 Security & Compliance

### Data Protection
- GDPR compliant data handling
- Customer phone number encryption
- Message retention policy (30 days)
- Secure webhook endpoints (HTTPS + signature validation)

### WhatsApp Compliance
- Business messaging guidelines
- Template message approval process
- Opt-out mechanisms
- 24-hour messaging window rules

---

## 📊 Success Metrics

### Technical KPIs
- Response time < 3 seconds
- 99.9% uptime
- AI accuracy > 95% for reservations
- Customer satisfaction > 4.5/5

### Business KPIs  
- Customer acquisition cost < €50
- Monthly churn rate < 5%
- Average revenue per customer = €29
- Break-even at 15 customers

---

*AutoAtende - The first AI-managed SaaS in Portugal 🇵🇹*
*Built by: Jarvis (Tech), Wall-E (Backend), Barney (Marketing)*