
export interface Program {
  id: number;
  name: string;
  discipline: string;
  description: string;
  duration?: string;
  eligibility?: string;
  fees?: string;
  career?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  category: string;
}