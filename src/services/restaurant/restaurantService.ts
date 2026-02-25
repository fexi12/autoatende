import { logger } from '../../utils/logger';
import { Restaurant } from '../ai/claudeService';

// In-memory store for MVP (replace with DB later)
const restaurants: Map<string, Restaurant> = new Map();

export function getRestaurantByPhoneId(phoneNumberId: string): Restaurant | null {
  const restaurant = restaurants.get(phoneNumberId);
  if (!restaurant) {
    logger.warn('Restaurant not found for phone ID', { phoneNumberId });
    return null;
  }
  return restaurant;
}

export function registerRestaurant(restaurant: Restaurant): void {
  restaurants.set(restaurant.phoneNumberId, restaurant);
  logger.info('Restaurant registered', { name: restaurant.name, phoneNumberId: restaurant.phoneNumberId });
}

// Seed with demo restaurant for MVP testing
registerRestaurant({
  id: 'demo-001',
  name: 'Restaurante Demo',
  address: 'Rua do Demo, 123, Porto',
  hours: 'Segunda a Domingo: 12h00-23h00',
  menuSummary: 'Cozinha portuguesa tradicional. Pratos do dia entre €8-15. Especializados em bacalhau e grelhados.',
  phone: '+351 220 000 001',
  phoneNumberId: process.env.DEMO_PHONE_ID || 'demo-phone-id'
});
