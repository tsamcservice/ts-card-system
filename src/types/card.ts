export interface Card {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardFormData {
  title: string;
  content: string;
} 