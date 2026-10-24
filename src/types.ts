export type PageTab = 'cover' | 'about' | 'services';

export type ServiceCategory = 'pr' | 'manage' | 'code' | 'exposure' | 'aesthetic' | 'promo';

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  tag?: string;
  description?: string[];
  bonus?: string;
}

export interface ServiceData {
  id: ServiceCategory;
  name: string;
  englishTitle: string;
  gothicSymbol: string;
  subtitle: string;
  items: ServiceItem[];
  extraRates?: { label: string; value: string }[];
  noticeTitle: string;
  notices: string[];
}
