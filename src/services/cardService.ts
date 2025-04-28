import { Card, CardFormData } from '@/types/card';

// 預設卡片模板
const DEFAULT_CARDS: Card[] = [
  {
    id: '1',
    userId: 'system',
    title: '會員卡',
    subtitle: '尊榮會員',
    content: '感謝您成為我們的會員',
    backgroundColor: '#E1E6E0',
    textColor: '#A4924A',
    memberLevel: 'NORMAL',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'system',
    title: '英文小旅行',
    subtitle: '心靈大冒險',
    content: '5/19(一)10:00~12:00',
    backgroundColor: '#E1E6E0',
    textColor: '#A4924A',
    memberLevel: 'NORMAL',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 模擬數據庫
let cards: Card[] = [...DEFAULT_CARDS];

export const cardService = {
  // 獲取所有卡片
  async getAllCards(): Promise<Card[]> {
    return [...cards];
  },

  // 創建新卡片
  async createCard(cardData: CardFormData & { userId: string }): Promise<Card> {
    const newCard: Card = {
      id: Date.now().toString(),
      ...cardData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    cards.push(newCard);
    return newCard;
  },

  // 更新卡片
  async updateCard(id: string, cardData: CardFormData): Promise<Card> {
    const index = cards.findIndex(card => card.id === id);
    if (index === -1) {
      throw new Error('Card not found');
    }
    const updatedCard = {
      ...cards[index],
      ...cardData,
      updatedAt: new Date().toISOString(),
    };
    cards[index] = updatedCard;
    return updatedCard;
  },

  // 刪除卡片
  async deleteCard(id: string): Promise<void> {
    const index = cards.findIndex(card => card.id === id);
    if (index === -1) {
      throw new Error('Card not found');
    }
    cards.splice(index, 1);
  },
}; 