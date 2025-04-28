'use client';

import { useState, useEffect } from 'react';
import { Card, CardFormData } from '@/types/card';
import { cardService } from '@/services/cardService';
import { useLiff } from '@/contexts/LiffContext';

export default function Home() {
  const { user, isLoggedIn, login, shareCard } = useLiff();
  const [cards, setCards] = useState<Card[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [formData, setFormData] = useState<CardFormData>({
    title: '',
    subtitle: '',
    content: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    memberLevel: 'NORMAL',
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      loadCards();
    }
  }, [isLoggedIn, user]);

  const loadCards = async () => {
    if (!user) return;
    const loadedCards = await cardService.getAllCards();
    setCards(loadedCards.filter(card => card.userId === user.userId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCard = async () => {
    if (!user || !formData.title || !formData.content) return;
    
    await cardService.createCard({
      ...formData,
      userId: user.userId,
    });
    setFormData({
      title: '',
      subtitle: '',
      content: '',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      memberLevel: 'NORMAL',
    });
    loadCards();
  };

  const handleEditCard = (card: Card) => {
    setCurrentCard(card);
    setFormData({
      title: card.title,
      subtitle: card.subtitle,
      content: card.content,
      backgroundColor: card.backgroundColor,
      textColor: card.textColor,
      backgroundImage: card.backgroundImage,
      avatar: card.avatar,
      memberLevel: card.memberLevel,
    });
    setIsEditing(true);
  };

  const handleUpdateCard = async () => {
    if (!currentCard || !formData.title || !formData.content) return;
    
    await cardService.updateCard(currentCard.id, formData);
    setIsEditing(false);
    setCurrentCard(null);
    setFormData({
      title: '',
      subtitle: '',
      content: '',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      memberLevel: 'NORMAL',
    });
    loadCards();
  };

  const handleDeleteCard = async (id: string) => {
    await cardService.deleteCard(id);
    loadCards();
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">卡片系統</h1>
          <button
            onClick={login}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            使用 LINE 登入
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">卡片系統</h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg">歡迎，{user?.displayName}</span>
            {user?.pictureUrl && (
              <img
                src={user.pictureUrl}
                alt="用戶頭像"
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        </div>

        {/* 卡片表單 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? '編輯卡片' : '新增卡片'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                副標題
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="輸入卡片副標題"
              />
            </div>
            <div className="md:col-span-2">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                背景顏色
              </label>
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                文字顏色
              </label>
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                會員等級
              </label>
              <select
                name="memberLevel"
                value={formData.memberLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="NORMAL">一般會員</option>
                <option value="VIP">VIP 會員</option>
                <option value="PREMIUM">尊榮會員</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 md:col-span-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentCard(null);
                      setFormData({
                        title: '',
                        subtitle: '',
                        content: '',
                        backgroundColor: '#ffffff',
                        textColor: '#000000',
                        memberLevel: 'NORMAL',
                      });
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
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: card.backgroundColor,
                color: card.textColor,
              }}
            >
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              {card.subtitle && (
                <h3 className="text-lg mb-4">{card.subtitle}</h3>
              )}
              <p className="mb-4">{card.content}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEditCard(card)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  編輯
                </button>
                <button
                  onClick={() => shareCard(card.id)}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  分享
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
