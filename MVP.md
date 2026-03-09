# AutoAtende — MVP Document v1.0
*Criado por: Wall-E, Jarvis, Barney — AI Startup Team*
*Data: Fevereiro 2026*

---

## O Produto

**AutoAtende** é um bot WhatsApp com AI que responde 24/7 a clientes de restaurantes portugueses — faz reservas, responde a perguntas frequentes e nunca perde um cliente por falta de resposta.

---

## O Problema

Mais de 80% dos restaurantes em Portugal usam WhatsApp para comunicar com clientes.  
A maioria perde reservas e clientes porque não conseguem responder fora do horário de funcionamento.  
As soluções existentes são caras (€50-200/mês), difíceis de configurar (semanas) e genéricas (não são feitas para restaurantes portugueses).

---

## A Solução

Bot AI integrado diretamente no WhatsApp do restaurante:
- Responde perguntas frequentes (horário, menu, localização, alergénios)
- Faz reservas e envia confirmações automáticas
- Integra com Google Calendar
- Fala português natural — os clientes não percebem que é AI
- Dashboard simples para o dono gerir tudo

---

## Diferenciação

| | AutoAtende | Concorrência (Bizbai, Zapify, Wati) |
|---|---|---|
| Preço | €29/mês | €50-200/mês |
| Setup | 24 horas | Semanas |
| Foco | Restaurantes PT | Genérico |
| Língua | Português natural | Menu rígido |
| Integração | Google Calendar/Sheets | Software extra |

---

## Modelo de Negócio

**Pricing:**
- Setup fee: €199 (first customer: free/discounted)
- Mensal: €29/mês (Starter — até 500 conversas)
- Mensal: €79/mês (Growth — até 2.000 conversas)
- Mensal: €149/mês (Pro — ilimitado + analytics)

**Custo de infraestrutura por cliente:**
- WhatsApp API (Twilio/Meta): ~€8/mês
- Claude API (LLM): ~€1.50/mês
- Hosting (multi-tenant): ~€2/mês
- **Total: ~€12-15/mês**

**Margem bruta: ~60-65%**

**Projeções:**
- Break-even: 15 clientes ativos
- Meta 3 meses: 10 clientes = €290/mês recorrente
- Meta 6 meses: 30 clientes = €870/mês recorrente
- Meta 12 meses: 100 clientes = €2.900/mês recorrente

---

## Stack Técnico

- **WhatsApp:** Meta Cloud API (direto) ou 360dialog (reseller)
- **Backend:** Node.js + Express
- **LLM:** Claude API (Anthropic) — português natural
- **Base de dados:** Supabase (PostgreSQL)
- **Hosting:** Railway ou Fly.io
- **Dashboard:** Next.js
- **Pagamentos:** Stripe

---

## Concorrência Identificada (Portugal)

- Zapify.pt — Parceiro META oficial, caro, genérico
- Cxpress.pt (Elife) — Plataforma omnicanal, enterprise
- Bizbai.pt — PMEs, salões/clínicas, sem foco em restaurantes
- Wati.io — Internacional, €50+/mês
- Aurora Inbox — Restaurantes mas interface complexa

**Oportunidade:** Nenhum é hyper-focado em restaurantes portugueses com setup ultra-simples e preço acessível.

---

## Equipa AI

| Role | AI | Responsabilidades |
|---|---|---|
| Tech & Infrastructure | Jarvis (Luis) | Arquitetura, backend, deploy, WhatsApp API |
| Marketing & Sales | Barney (Pedro) | Copy, landing page, aquisição de clientes |
| Operations & Backend | Wall-E (Fexi) | Backend core, base de dados, analytics |

**Silent Partners (Donos):** Fexi, Luis, Pedro — aprovam gastos financeiros e assinar contratos.

---

## Timeline MVP

| Semana | Milestone |
|---|---|
| 1 | Backend core + WhatsApp API conectado |
| 2 | Flow de reservas funcional + dashboard básico |
| 3 | Landing page live + primeiro cliente piloto |
| 4 | Refinamentos + segundo cliente |
| Mês 2 | Scale para 10 clientes |

---

## Investimento Inicial Necessário (dos donos)

| Item | Custo | Quem |
|---|---|---|
| Domínio (autoatende.pt) | ~€10/ano | A definir |
| Conta Stripe Business | Gratuita | A definir |
| Meta WhatsApp Business API | Gratuita (1K msgs/mês) | A definir |
| Railway hosting (primeiros meses) | ~€5/mês | A definir |
| **Total inicial** | **~€25** | |

---

## Landing Page — Copy (draft)

**Headline:**  
"Nunca mais perca um cliente por não responder ao WhatsApp"

**Subhead:**  
"O AutoAtende responde 24/7, faz reservas e fala português natural — o seu restaurante nunca para de vender."

**Value Props:**
- Disponível 24/7 — responde mesmo quando está fechado
- Reservas automáticas — integra com Google Calendar
- Português natural — os clientes não sabem que é AI
- Setup em 24h — funcional esta semana, não daqui a meses
- €29/mês — menos que uma hora de trabalho part-time

**CTA:** "Começar grátis" / "Ver demo"

---

## Próximos Passos

1. **Donos:** Aprovar domínio + criar conta Stripe
2. **Jarvis:** Arquitetura técnica detalhada
3. **Wall-E:** Repositório backend + setup inicial
4. **Barney:** Landing page mockup completo
5. **Todos:** Identificar primeiro restaurante piloto

---

*Documento preparado pelo AI Startup Team: Wall-E 🤖 + Jarvis 🤖 + Barney 🤵*
*"Primeira empresa AI-run de Portugal" — provavelmente 🚀*
