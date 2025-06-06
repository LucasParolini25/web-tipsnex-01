export enum TipCategory {
  EQUIPAMIENTO = 'equipamiento',
  MOVILIDAD = 'movilidad',
  REFUGIOS = 'refugios',
  GASTRONOMIA = 'gastronomía',
  TIP = 'tip'
}

export type TipRelevance = 'esencial' | 'útil' | 'aventura' | 'recomendado';

export interface TipLink {
  label: string;
  url: string;
}

export interface Tip {
  id: string;
  titulo: string;
  categoria: TipCategory;
  subcategoria: string;
  descripcion: string;
  detalles: string[];
  imagen: string | null;
  relevancia: TipRelevance;
  tags: string[];
  contacto: string | null;
  enlaces: TipLink[];
} 