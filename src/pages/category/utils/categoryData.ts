import { Item, CategoryType } from '@/types/category';
import excursionesData from '@/data/excursiones.json';
import hospedajesData from '@/data/hospedajes.json';
import autosData from '@/data/autos.json';
import tipsData from '@/data/tips.json';

// Función para mapear excursiones
const mapExcursiones = (data: any): Item[] => {
  return data.excursiones.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    fullDescription: item.fullDescription || '',
    gallery: item.gallery || [],
    category: item.category,
    subcategory: item.subcategory,
    price: item.price,
    duration: item.duration,
    excursionType: item.excursionType,
    meetingPoint: item.meetingPoint,
    includes: item.includes || [],
    notIncludes: item.notIncludes || [],
    recommendations: item.recommendations || [],
    whatsappLink: item.whatsappLink
  }));
};

// Función para mapear hospedajes
const mapHospedajes = (data: any): Item[] => {
  return data.hospedajes.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    fullDescription: item.fullDescription,
    gallery: item.gallery,
    category: item.category,
    subcategory: item.subcategory,
    price: item.price,
    amenities: item.amenities,
    location: item.location,
    whatsappLink: item.whatsappLink
  }));
};

// Función para mapear autos
const mapAutos = (data: any): Item[] => {
  return data.autos.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    fullDescription: item.fullDescription,
    gallery: item.gallery,
    category: item.category,
    subcategory: item.subcategory,
    price: item.price,
    features: item.features,
    location: item.location,
    whatsappLink: item.whatsappLink
  }));
};

// Función para mapear tips
const mapTips = (data: any): Item[] => {
  return data.tips.map((item: any) => ({
    id: item.id,
    title: item.titulo,
    description: item.descripcion,
    image: item.image || '',
    fullDescription: item.descripcion || '',
    details: item.detalles || [],
    gallery: [],
    category: item.categoria,
    subcategory: item.subcategoria,
    whatsappLink: item.contacto ? `https://wa.me/${item.contacto.replace(/\D/g, '')}` : undefined
  }));
};

export const TIPS_DATA: Record<CategoryType, Item[]> = {
  'excursiones': mapExcursiones(excursionesData),
  'hospedajes': mapHospedajes(hospedajesData),
  'alquiler-autos': mapAutos(autosData),
  'tips': mapTips(tipsData)
};

export const getItemsByCategory = (categoryId: CategoryType): Item[] => {
  switch (categoryId) {
    case 'excursiones':
      return mapExcursiones(excursionesData);
    case 'hospedajes':
      return mapHospedajes(hospedajesData);
    case 'alquiler-autos':
      return mapAutos(autosData);
    case 'tips':
      return mapTips(tipsData);
    default:
      return [];
  }
};

export const CATEGORY_TITLES: Record<CategoryType, string> = {
  'excursiones': 'Excursiones en Bariloche',
  'hospedajes': 'Hospedajes en Bariloche',
  'alquiler-autos': 'Alquiler de Autos en Bariloche',
  'tips': 'Tips para tu viaje'
};

export const CATEGORY_DESCRIPTIONS: Record<CategoryType, string> = {
  'excursiones': 'Descubre las mejores excursiones y actividades en Bariloche',
  'hospedajes': 'Encuentra el alojamiento perfecto para tu estadía',
  'alquiler-autos': 'Alquila un auto para explorar Bariloche a tu ritmo',
  'tips': 'Consejos útiles para aprovechar al máximo tu viaje'
};

export const CATEGORY_IMAGES: Record<CategoryType, string> = {
  'excursiones': '/images/categories/excursiones.jpg',
  'hospedajes': '/images/categories/hospedajes.jpg',
  'alquiler-autos': '/images/categories/autos.jpg',
  'tips': '/images/categories/tips.jpg'
};
