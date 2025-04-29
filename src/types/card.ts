export interface Card {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  backgroundImage?: string;
  avatar?: string;
  memberLevel: 'NORMAL' | 'VIP' | 'PREMIUM';
  createdAt: string;
  updatedAt: string;
  templateType?: 'member' | 'event';
  templateData?: Record<string, unknown>;
}

export interface CardFormData {
  title: string;
  subtitle?: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  backgroundImage?: string;
  avatar?: string;
  memberLevel?: 'NORMAL' | 'VIP' | 'PREMIUM';
  templateType?: 'member' | 'event';
}

export interface User {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  memberLevel: 'NORMAL' | 'VIP' | 'PREMIUM';
} 