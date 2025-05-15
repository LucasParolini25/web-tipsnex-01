export interface Tip {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];  // Array opcional de URLs de imágenes
  category: string;
  subcategory?: string;
  whatsappLink?: string;
  price?: string;
  features?: string;
  location?: string;
  amenities?: string;
  fullDescription?: string;
  // Campos específicos para excursiones
  duration?: string;
  meetingPoint?: string;
  excursionType?: 'TERRESTRE' | 'LACUSTRE';
  recommendations?: string[];
  includes?: string[];
  notIncludes?: string[];
}

// Datos de ejemplo para las diferentes categorías
const TIPS_DATA: Record<string, Tip[]> = {
  'excursiones': [
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
      fullDescription: 'Paseo de increíbles vistas panorámicas. Bordeando, en gran parte de su recorrido, al magnífico lago Nahuel Huapi. Al llegar a la base del Cerro Campanario una aerosilla traslada al viajero hacia la cumbre, desde donde se aprecia una de las vistas más bonitas de la región. Al descenso, continúa el viaje con dirección a la zona del lago Moreno y Punto Panorámico, en el cual se destaca el gran hotel LLAO-LLAO y la capilla S. Eduardo, siendo éste, el punto más alejado del trayecto, comenzando así el regreso hacia el centro de la ciudad.',
      includes: [
        'Traslado en vehículo',
        'Guía profesional',
        'Parada en Cerro Campanario'
      ],
      notIncludes: [
        'Ascenso a la aerosilla del Cerro Campanario',
        'Comidas y bebidas'
      ],
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
      fullDescription: 'La famosa excursión por Los Siete lagos se inicia por la emblemática ruta nacional 40, el camino es sinuoso y rodeado por un paisaje increíble de bosques andino patagónicos, lagos y montañas. Se pasa por Villa la Angostura y a lo largo del camino se observan los lagos Correntoso, Espejo, Villarino, Falkner, Machonico y finalmente se arriba a la ciudad de San Martín de los Andes a orillas del Lago Lacar, uno de los poblados mas bellos por su arquitectura y diseño, además de los paisajes cordilleranos que la rodean. Tiempo libre para recorrer el centro de la ciudad y la costanera.',
      includes: [
        'Traslado en vehículo',
        'Guía profesional',
        'Tiempo libre en San Martín de los Andes'
      ],
      notIncludes: [
        'Comidas y bebidas',
        'Actividades opcionales'
      ],
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
      fullDescription: 'Recorriendo las márgenes de los lagos Gutiérrez y Mascardi, y atravesando el puente del río Manso, se llega a Pampa Linda, parada obligada para el almuerzo (no incluido). Cascadas y vertientes son el deleite de quienes hasta aquí llegan. Hacia el final del camino arribamos al pie del cerro más alto del Parque Nacional, caracterizado por el sonido producido por el rompimiento y desprendimiento de los glaciares alojados en sus cumbres. Desde este punto se aprecia el Glaciar Manso, que genera el "Ventisquero Negro" llegando así al final del recorrido.',
      includes: [
        'Traslado en vehículo',
        'Guía profesional',
        'Ingreso al Parque Nacional'
      ],
      notIncludes: [
        'Almuerzo',
        'Bebidas',
        'Actividades opcionales'
      ],
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
      fullDescription: 'Navegando durante 30 minutos por las azules aguas del lago Nahuel Huapi en una confortable embarcación, se llega a Puerto Anchorena, ubicado en la zona central de la isla y centro de servicios de la misma. Existen distintas opciones de caminatas por senderos demarcados. Allí se podrá realizar una visita recorriendo el vivero de coníferas y otras especies, miradores naturales y senderos que permiten apreciar la magnífica belleza del lugar. Uno de estos senderos nos conduce a la Playa del Toro, donde podremos ver pinturas rupestres y visitar una espléndida playa de arena volcánica. Continuando con la navegación, arribamos a la península de Quetrihué en donde se puede apreciar la magnificencia del paisaje del "único Bosque de Arrayanes del mundo".',
      includes: [
        'Navegación',
        'Guía profesional',
        'Ingreso al Parque Nacional'
      ],
      notIncludes: [
        'Traslado al puerto',
        'Comidas y bebidas'
      ],
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
      fullDescription: 'Saliendo de Puerto Pañuelo se navega aproximadamente 1 hora por el brazo más profundo del lago Nahuel Huapi: el Blest. Pasando por el islote Centinela, donde descansan los restos del Perito Francisco P. Moreno, arribando a la Cascada de los Cántaros. Ascendiendo por un sendero escalonado se recorre la exuberante vegetación de la selva Valdiviana, hasta llegar a los miradores de la cascada Los Cántaros, el lago Los Cántaros y a un alerce milenario. Luego de descender y después de una corta navegación (5 minutos) llegamos a Puerto Blest, pudiendo visitar la bahía y el río Frías, de particulares aguas verdes, provenientes de uno de los glaciares del Cerro Tronador.',
      includes: [
        'Navegación',
        'Guía profesional',
        'Ingreso al Parque Nacional'
      ],
      notIncludes: [
        'Traslado al puerto',
        'Navegación opcional al Lago Frías',
        'Comidas y bebidas'
      ],
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
      fullDescription: 'La excursión a El Bolsón y Lago Puelo se realiza los días jueves y sábados únicamente. Durante el trayecto el camino bordea los Lagos Gutiérrez, Mascardi y Guillelmo, y cruza los Ríos Villegas, Foyel y Quemquentreu. Ya en la localidad de El Bolsón es ineludible la visita a la famosa y más importante Feria Artesanal de la región. La misma reúne una cantidad enorme de productores locales y se realiza en la Plaza Pagano. Aquí se podrán adquirir frutas finas de la región, dulces, artesanías en plata y alpaca, así como también los famosos quesos y la cerveza artesanal. Luego se realiza una visita a una fábrica de dulces y frutos finos, y al criadero de truchas. Antes de retornar a Bariloche se realiza un paseo por Lago Puelo, Chubut.',
      includes: [
        'Traslado en vehículo',
        'Guía profesional',
        'Visita a la Feria Artesanal',
        'Visita a fábrica de dulces'
      ],
      notIncludes: [
        'Comidas y bebidas',
        'Compras en la feria'
      ],
      recommendations: [
        'Llevar dinero en efectivo para compras en la feria',
        'La excursión solo se realiza jueves y sábados'
      ],
      whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesa%20la%20excursión%20El%20Bolsón'
    }
  ],
  'hospedajes': [
    {
      id: '2',
      title: 'Hotel Boutique Bariloche',
      description: 'Elegancia Patagónica con Vistas al Nahuel Huapi',
      image: '/images/hospedajes/hotel-boutique/main.webp',
      gallery: [
        '/images/hospedajes/hotel-boutique/main.webp',
        '/images/hospedajes/hotel-boutique/room.webp',
        '/images/hospedajes/hotel-boutique/room2.webp',
        '/images/hospedajes/hotel-boutique/view.webp',
        '/images/hospedajes/hotel-boutique/lobby.webp'
      ],
      category: 'Hospedajes',
      subcategory: 'Hoteles',
      price: 'A consultar',
      features: '\n• Habitaciones con vista al lago\n• Departamentos amplios para familias\n• Full House (exclusividad para grupos)',
      location: 'Los Cerezos 5407, San Carlos de Bariloche',
      whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20vi%20tu%20web%20y%20estoy%20interesado%20en%20saber%20más'
    },
    {
      id: '5',
      title: 'Cabañas Pura Vida',
      description: 'Descanso y comodidad cerca del lago y la ciudad',
      image: '/images/hospedajes/cabanas-pura-vida/main.webp',
      gallery: [
        '/images/hospedajes/cabanas-pura-vida/main.webp',
        '/images/hospedajes/cabanas-pura-vida/interior.webp',
        '/images/hospedajes/cabanas-pura-vida/exterior.webp',
        '/images/hospedajes/cabanas-pura-vida/garden.webp'
      ],
      category: 'Hospedajes',
      subcategory: 'Cabañas',
      price: 'A consultar',
      amenities: 'Cabañas familiares con 2 habitaciones, Estilo dúplex con espacio verde',
      location: 'Cabildo 150, R8400 San Carlos de Bariloche',
      fullDescription: 'Viví la experiencia de Bariloche desde una cabaña cálida y cómoda, con parrilla y cochera propia. A metros del Lago Nahuel Huapi y con fácil acceso al centro, Cabañas Pura Visa es perfecta para familias, parejas o viajeros que buscan tranquilidad sin alejarse de todo.',
      whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesan%20las%20Cabañas%20Pura%20Vida'
    }
  ],
  'alquiler-autos': [
    {
      id: '3',
      title: 'Fiat Cronos',
      description: 'Sedán compacto ideal para la ciudad y viajes, con excelente consumo de combustible y amplio baúl.',
      image: '/images/autos/fiat-cronos.webp',
      gallery: [
        '/images/autos/fiat-cronos.webp',
        '/images/autos/fiat-cronos-2.webp',
        '/images/autos/fiat-cronos-3.webp',
        '/images/autos/fiat-cronos-4.webp'
      ],
      category: 'Alquiler de autos',
      subcategory: 'Sedán',
      price: 'A consultar',
      features: '\n• Aire acondicionado\n• Dirección asistida\n• ABS\n• Airbags\n• Radio con Bluetooth\n• Cierre centralizado',
      location: 'Canelo 390 y Aeropuerto Internacional de Bariloche',
      whatsappLink: 'https://wa.me/5492944674325?text=Consulta%20sobre%20alquiler%20de%20Fiat%20Cronos'
    },
    {
      id: '6',
      title: 'Peugeot 208',
      description: 'Hatchback moderno y dinámico, perfecto para moverse en la ciudad con estilo y comodidad.',
      image: '/images/autos/peugeot-208.webp',
      gallery: [
        '/images/autos/peugeot-208.webp',
        '/images/autos/peugeot-208-2.webp',
        '/images/autos/peugeot-208-3.webp',
        '/images/autos/peugeot-208-4.webp'
      ],
      category: 'Alquiler de autos',
      subcategory: 'Hatchback',
      price: 'A consultar',
      features: '\n• Aire acondicionado\n• Dirección asistida\n• ABS\n• Airbags\n• Radio con Bluetooth\n• Cierre centralizado',
      location: 'Canelo 390 y Aeropuerto Internacional de Bariloche',
      whatsappLink: 'https://wa.me/5492944674325?text=Consulta%20sobre%20alquiler%20de%20Peugeot%20208'
    }
  ]
};

const CATEGORY_TITLES: Record<string, string> = {
  'excursiones': 'Excursiones',
  'hospedajes': 'Hospedajes',
  'alquiler-autos': 'Alquiler de Autos',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'excursiones': 'Descubre las mejores actividades y circuitos para explorar la belleza natural de Bariloche.',
  'hospedajes': 'Encuentra el alojamiento perfecto para tu estadía en Bariloche, desde hoteles y cabañas hasta hosteles.',
  'alquiler-autos': 'Compara y elige el vehículo ideal para moverte con libertad durante tu visita a la Patagonia.',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'excursiones': 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
  'hospedajes': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'alquiler-autos': 'https://images.unsplash.com/photo-1504893524553-b855bce32c67',
};

export const getCategoryTitle = (categoryId: string): string => {
  return CATEGORY_TITLES[categoryId] || 'Categoría';
};

export const getCategoryDescription = (categoryId: string): string => {
  return CATEGORY_DESCRIPTIONS[categoryId] || '';
};

export const getCategoryImage = (categoryId: string): string => {
  return CATEGORY_IMAGES[categoryId] || '';
};

export const getTipsByCategory = (categoryId: string): Tip[] => {
  return TIPS_DATA[categoryId] || [];
};
