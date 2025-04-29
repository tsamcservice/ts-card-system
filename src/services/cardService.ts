import { Card, CardFormData } from '@/types/card';

// 預設卡片模板
const DEFAULT_TEMPLATES: Card[] = [
  {
    id: 'template-1',
    userId: 'system',
    title: '基本會員卡',
    subtitle: '尊榮會員',
    content: '感謝您成為我們的會員',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    memberLevel: 'NORMAL',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    templateType: 'member'
  },
  {
    id: 'template-2',
    userId: 'system',
    title: 'VIP 會員卡',
    subtitle: 'VIP 尊榮會員',
    content: '感謝您成為我們的 VIP 會員',
    backgroundColor: '#ffd700',
    textColor: '#000000',
    memberLevel: 'VIP',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    templateType: 'member'
  }
];

class CardService {
  private readonly cards: Card[] = [...DEFAULT_TEMPLATES];

  async getAllCards(): Promise<Card[]> {
    return this.cards;
  }

  async getCard(id: string): Promise<Card | null> {
    return this.cards.find(card => card.id === id) || null;
  }

  async createCard(cardData: CardFormData & { userId: string }): Promise<Card> {
    const newCard: Card = {
      id: Date.now().toString(),
      ...cardData,
      memberLevel: cardData.memberLevel || 'NORMAL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.cards.push(newCard);
    return newCard;
  }

  async updateCard(id: string, cardData: Partial<CardFormData>): Promise<Card | null> {
    const index = this.cards.findIndex(card => card.id === id);
    if (index === -1) return null;

    const updatedCard: Card = {
      ...this.cards[index],
      ...cardData,
      updatedAt: new Date().toISOString()
    };
    this.cards[index] = updatedCard;
    return updatedCard;
  }

  async deleteCard(id: string): Promise<boolean> {
    const index = this.cards.findIndex(card => card.id === id);
    if (index === -1) return false;

    this.cards.splice(index, 1);
    return true;
  }
}

export const cardService = new CardService(); 