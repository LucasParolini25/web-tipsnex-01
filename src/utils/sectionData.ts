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
    image: "https://plus.unsplash.com/premium_photo-1671737775599-b3d46ecaf78b?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Aventura sobre ruedas",
    description: "Alquila tu auto y recorre los paisajes a tu ritmo"
  },
  'tips': {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    title: "Tips y Consejos",
    description: "Consejos útiles y recomendaciones para tu viaje a Bariloche"
  }
}; 