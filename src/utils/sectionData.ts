export interface SectionData {
  image?: string;
  title: string;
  description: string;
}

export const SECTION_DATA: Record<string, SectionData> = {
  'excursiones': {
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Descubre Bariloche",
    description: "Explora los mejores destinos y actividades de la región"
  },
  'hospedajes': {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Hospedajes de ensueño",
    description: "Las mejores opciones para tu estadía en la Patagonia"
  },
  'alquiler-autos': {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    title: "Aventura sobre ruedas",
    description: "Alquila tu auto y recorre los paisajes a tu ritmo"
  },
  'tips': {
    title: "Tips y Consejos",
    description: "Consejos útiles y recomendaciones para tu viaje a Bariloche"
  }
}; 