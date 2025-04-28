'use client';

import { useState, useEffect } from 'react';
import { Card, CardFormData } from '@/types/card';
import { cardService } from '@/services/cardService';

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [formData, setFormData] = useState<CardFormData>({
    title: '',
    content: '',
  });

  // 載入卡片
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const loadedCards = await cardService.getAllCards();
    setCards(loadedCards);
  };

  // 處理表單輸入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 創建新卡片
  const handleCreateCard = async () => {
    if (!formData.title || !formData.content) return;
    
    await cardService.createCard(formData);
    setFormData({ title: '', content: '' });
    loadCards();
  };

  // 編輯卡片
  const handleEditCard = (card: Card) => {
    setCurrentCard(card);
    setFormData({
      title: card.title,
      content: card.content,
    });
    setIsEditing(true);
  };

  // 更新卡片
  const handleUpdateCard = async () => {
    if (!currentCard || !formData.title || !formData.content) return;
    
    await cardService.updateCard(currentCard.id, formData);
    setIsEditing(false);
    setCurrentCard(null);
    setFormData({ title: '', content: '' });
    loadCards();
  };

  // 刪除卡片
  const handleDeleteCard = async (id: string) => {
    await cardService.deleteCard(id);
    loadCards();
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          卡片系統
        </h1>

        {/* 卡片表單 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? '編輯卡片' : '新增卡片'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                標題
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="輸入卡片標題"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                內容
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                placeholder="輸入卡片內容"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentCard(null);
                      setFormData({ title: '', content: '' });
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleUpdateCard}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    更新
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreateCard}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  創建
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* 卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <div key={card.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
              <p className="text-gray-600 mb-4">{card.content}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditCard(card)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  編輯
                </button>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
