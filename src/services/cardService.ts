import { Card, CardFormData } from '@/types/card';

// 模擬數據庫
let cards: Card[] = [];

export const cardService = {
  // 獲取所有卡片
  getAllCards: async (): Promise<Card[]> => {
    return cards;
  },

  // 創建新卡片
  createCard: async (data: CardFormData): Promise<Card> => {
    const newCard: Card = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    cards.push(newCard);
    return newCard;
  },

  // 更新卡片
  updateCard: async (id: string, data: CardFormData): Promise<Card | null> => {
    const index = cards.findIndex(card => card.id === id);
    if (index === -1) return null;

    const updatedCard = {
      ...cards[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    cards[index] = updatedCard;
    return updatedCard;
  },

  // 刪除卡片
  deleteCard: async (id: string): Promise<boolean> => {
    const initialLength = cards.length;
    cards = cards.filter(card => card.id !== id);
    return cards.length !== initialLength;
  },
}; 