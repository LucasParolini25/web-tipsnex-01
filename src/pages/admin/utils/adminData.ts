import { Tip } from "../../category/utils/categoryData";

// Estructura para las categorías con subcategorías
export interface Category {
  id: string;
  name: string;
  subcategories?: string[];
  tips: Tip[];
}

// Datos de ejemplo para las diferentes categorías
export const categoryData: Category[] = [
  {
    id: 'excursiones',
    name: 'Excursiones',
    subcategories: ['Circuitos', 'Aventura', 'Gastronomía'],
    tips: [
      {
        id: 'circuito-chico',
        title: 'Circuito Chico',
        description: 'Paseo de increíbles vistas panorámicas bordeando el lago Nahuel Huapi, incluyendo ascenso al Cerro Campanario.',
        image: '/images/excursiones/circuito-chico/main.webp',
        gallery: [
          '/images/excursiones/circuito-chico/main.webp',
          '/images/excursiones/circuito-chico/campanario.webp',
          '/images/excursiones/circuito-chico/llao-llao.webp',
          '/images/excursiones/circuito-chico/panoramica.webp'
        ],
        category: 'Excursiones',
        subcategory: 'Circuitos',
        price: '$40.000',
        duration: '5 horas',
        excursionType: 'TERRESTRE',
        meetingPoint: 'Centro Cívico',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20Circuito%20Chico'
      },
      {
        id: 'siete-lagos',
        title: 'Ruta 7 Lagos',
        description: 'Recorrido por la emblemática ruta 40 atravesando los más bellos lagos de la Patagonia hasta San Martín de los Andes.',
        image: '/images/excursiones/siete-lagos/main.webp',
        gallery: [
          '/images/excursiones/siete-lagos/main.webp',
          '/images/excursiones/siete-lagos/san-martin.webp',
          '/images/excursiones/siete-lagos/lagos.webp',
          '/images/excursiones/siete-lagos/ruta.webp'
        ],
        category: 'Excursiones',
        subcategory: 'Circuitos',
        price: '$70.000',
        duration: 'De 08:00 a 18:30 hs',
        excursionType: 'TERRESTRE',
        meetingPoint: 'Hotel del pasajero',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20Siete%20Lagos'
      },
      {
        id: 'tronador',
        title: 'Cerro Tronador y Ventisquero Negro',
        description: 'Excursión al pie del cerro más alto del Parque Nacional, con vista al impresionante Ventisquero Negro.',
        image: '/images/excursiones/tronador/main.webp',
        gallery: [
          '/images/excursiones/tronador/main.webp',
          '/images/excursiones/tronador/ventisquero.webp',
          '/images/excursiones/tronador/cascada.webp',
          '/images/excursiones/tronador/pampa.webp'
        ],
        category: 'Excursiones',
        subcategory: 'Montaña',
        price: '$70.000',
        duration: 'De 09:00 a 18:00 hs',
        excursionType: 'TERRESTRE',
        meetingPoint: 'Hotel del pasajero',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20Cerro%20Tronador'
      },
      {
        id: 'isla-victoria',
        title: 'Isla Victoria y Bosque de Arrayanes',
        description: 'Navegación por el Nahuel Huapi visitando la Isla Victoria y el único bosque de arrayanes del mundo.',
        image: '/images/excursiones/isla-victoria/main.webp',
        gallery: [
          '/images/excursiones/isla-victoria/main.webp',
          '/images/excursiones/isla-victoria/arrayanes.webp',
          '/images/excursiones/isla-victoria/playa.webp',
          '/images/excursiones/isla-victoria/navegacion.webp'
        ],
        category: 'Excursiones',
        subcategory: 'Navegación',
        price: '$140.000',
        duration: '5 horas',
        excursionType: 'LACUSTRE',
        meetingPoint: 'Puerto Pañuelo',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20Isla%20Victoria'
      },
      {
        id: 'puerto-blest',
        title: 'Puerto Blest y Cascada de los Cantaros',
        description: 'Navegación por el brazo Blest del Nahuel Huapi, visitando la Cascada de los Cántaros y la selva Valdiviana.',
        image: '/images/excursiones/puerto-blest/main.webp',
        gallery: [
          '/images/excursiones/puerto-blest/main.webp',
          '/images/excursiones/puerto-blest/cascada.webp',
          '/images/excursiones/puerto-blest/selva.webp',
          '/images/excursiones/puerto-blest/navegacion.webp'
        ],
        category: 'Excursiones',
        subcategory: 'Navegación',
        price: '$140.000',
        duration: 'De 09:00 a 17:30 hs',
        excursionType: 'LACUSTRE',
        meetingPoint: 'Puerto Pañuelo',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20Puerto%20Blest'
      },
      {
        id: 'bolson',
        title: 'El Bolsón y Lago Puelo',
        description: 'Visita a la famosa Feria Artesanal de El Bolsón y al hermoso Lago Puelo.',
        image: '/images/excursiones/bolson/main.webp',
        gallery: [
          '/images/excursiones/bolson/main.webp',
          '/images/excursiones/bolson/feria.webp',
          '/images/excursiones/bolson/lago-puelo.webp',
          '/images/excursiones/bolson/productos.webp'
        ],
        category: 'Excursiones',
        subcategory: 'Circuitos',
        price: '$70.000',
        duration: 'De 08:30 a 18:30 hs',
        excursionType: 'TERRESTRE',
        meetingPoint: 'Hotel del pasajero',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20El%20Bolsón'
      }
    ]
  },
  {
    id: 'hospedajes',
    name: 'Hospedajes',
    subcategories: ['Hoteles', 'Cabañas', 'Hosteles'],
    tips: [
      {
        id: '2',
        title: 'Hotel Boutique Bariloche',
        description: 'Elegancia Patagónica con Vistas al Nahuel Huapi',
        image: '/images/hospedajes/hotel-boutique/main.webp',
        category: 'Hospedajes',
        subcategory: 'Hoteles',
        features: 'Habitaciones con vista al lago, Departamentos amplios para familias, Full House (exclusividad para grupos)',
        location: 'Los Cerezos 5407, San Carlos de Bariloche',
        price: 'A consultar',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20vi%20tu%20web%20y%20estoy%20interesado%20en%20saber%20más'
      },
      {
        id: '5',
        title: 'Cabañas Pura Vida',
        description: 'Descanso y comodidad cerca del lago y la ciudad',
        image: '/images/hospedajes/cabanas-pura-vida/main.webp',
        category: 'Hospedajes',
        subcategory: 'Cabañas',
        price: 'A consultar',
        amenities: 'Cabañas familiares con 2 habitaciones, Estilo dúplex con espacio verde',
        location: 'Cabildo 150, R8400 San Carlos de Bariloche',
        fullDescription: 'Viví la experiencia de Bariloche desde una cabaña cálida y cómoda, con parrilla y cochera propia. A metros del Lago Nahuel Huapi y con fácil acceso al centro, Cabañas Pura Visa es perfecta para familias, parejas o viajeros que buscan tranquilidad sin alejarse de todo.',
        whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesan%20las%20Cabañas%20Pura%20Vida'
      }
    ]
  },
  {
    id: 'alquiler-autos',
    name: 'Alquiler de autos',
    subcategories: ['Sedán', 'Hatchback'],
    tips: [
      {
        id: '3',
        title: 'Fiat Cronos',
        description: 'Sedán compacto ideal para la ciudad y viajes, con excelente consumo de combustible y amplio baúl.',
        image: '/images/autos/fiat-cronos.webp',
        category: 'Alquiler de autos',
        subcategory: 'Sedán',
        whatsappLink: 'https://wa.me/5492944674325?text=Consulta%20sobre%20alquiler%20de%20Fiat%20Cronos'
      },
      {
        id: '6',
        title: 'Peugeot 208',
        description: 'Hatchback moderno y dinámico, perfecto para moverse en la ciudad con estilo y comodidad.',
        image: '/images/autos/peugeot-208.webp',
        category: 'Alquiler de autos',
        subcategory: 'Hatchback',
        whatsappLink: 'https://wa.me/5492944674325?text=Consulta%20sobre%20alquiler%20de%20Peugeot%20208'
      }
    ]
  }
];
