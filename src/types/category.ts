export interface BaseCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  whatsappLink?: string;
}

export interface Item extends BaseCategory {
  fullDescription: string;
  gallery: string[];
  category: string;
  subcategory: string;
  price?: string;
  features?: string[];
  location?: string;
  amenities?: string[];
  duration?: string;
  meetingPoint?: string;
  excursionType?: 'TERRESTRE' | 'LACUSTRE';
  recommendations?: string[];
  includes?: string[];
  notIncludes?: string[];
}

export interface ExcursionItem extends Item {
  price: string;
  duration: string;
  excursionType: 'TERRESTRE' | 'LACUSTRE';
  meetingPoint: string;
  includes: string[];
  notIncludes: string[];
  recommendations?: string[];
}

export interface HospedajeItem extends Item {
  price: string;
  amenities: string[];
  location: string;
}

export interface AutoItem extends Item {
  price: string;
  features: string[];
  location: string;
}

export interface TipItem extends Item {
  // Propiedades específicas de tips si las hubiera
}

export type CategoryType = 'excursiones' | 'hospedajes' | 'alquiler-autos' | 'tips'; 