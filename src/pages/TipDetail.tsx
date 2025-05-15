import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Share2, Instagram, MapPin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  category: string;
  subcategory?: string;
  whatsappLink?: string;
  price?: string;
  features?: string;
  location?: string;
  amenities?: string;
  fullDescription?: string;
  duration?: string;
  meetingPoint?: string;
  excursionType?: 'TERRESTRE' | 'LACUSTRE';
  recommendations?: string[];
  includes?: string[];
  notIncludes?: string[];
}

// Mock data de todos los tips
const ALL_TIPS: Tip[] = [
  {
    id: 'circuito-chico',
    title: 'Circuito Chico',
    description: 'Paseo de increíbles vistas panorámicas bordeando el lago Nahuel Huapi, incluyendo ascenso al Cerro Campanario.',
    fullDescription: 'Paseo de increíbles vistas panorámicas. Bordeando, en gran parte de su recorrido, al magnífico lago Nahuel Huapi. Al llegar a la base del Cerro Campanario una aerosilla traslada al viajero hacia la cumbre, desde donde se aprecia una de las vistas más bonitas de la región. Al descenso, continúa el viaje con dirección a la zona del lago Moreno y Punto Panorámico, en el cual se destaca el gran hotel LLAO-LLAO y la capilla S. Eduardo, siendo éste, el punto más alejado del trayecto, comenzando así el regreso hacia el centro de la ciudad.',
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
    fullDescription: 'La famosa excursión por Los Siete lagos se inicia por la emblemática ruta nacional 40, el camino es sinuoso y rodeado por un paisaje increíble de bosques andino patagónicos, lagos y montañas. Se pasa por Villa la Angostura y a lo largo del camino se observan los lagos Correntoso, Espejo, Villarino, Falkner, Machonico y finalmente se arriba a la ciudad de San Martín de los Andes a orillas del Lago Lacar, uno de los poblados mas bellos por su arquitectura y diseño, además de los paisajes cordilleranos que la rodean. Tiempo libre para recorrer el centro de la ciudad y la costanera.',
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
    fullDescription: 'Recorriendo las márgenes de los lagos Gutiérrez y Mascardi, y atravesando el puente del río Manso, se llega a Pampa Linda, parada obligada para el almuerzo (no incluido). Cascadas y vertientes son el deleite de quienes hasta aquí llegan. Hacia el final del camino arribamos al pie del cerro más alto del Parque Nacional, caracterizado por el sonido producido por el rompimiento y desprendimiento de los glaciares alojados en sus cumbres. Desde este punto se aprecia el Glaciar Manso, que genera el "Ventisquero Negro" llegando así al final del recorrido.',
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
    fullDescription: 'Navegando durante 30 minutos por las azules aguas del lago Nahuel Huapi en una confortable embarcación, se llega a Puerto Anchorena, ubicado en la zona central de la isla y centro de servicios de la misma. Existen distintas opciones de caminatas por senderos demarcados. Allí se podrá realizar una visita recorriendo el vivero de coníferas y otras especies, miradores naturales y senderos que permiten apreciar la magnífica belleza del lugar. Uno de estos senderos nos conduce a la Playa del Toro, donde podremos ver pinturas rupestres y visitar una espléndida playa de arena volcánica. Continuando con la navegación, arribamos a la península de Quetrihué en donde se puede apreciar la magnificencia del paisaje del "único Bosque de Arrayanes del mundo".',
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
    fullDescription: 'Saliendo de Puerto Pañuelo se navega aproximadamente 1 hora por el brazo más profundo del lago Nahuel Huapi: el Blest. Pasando por el islote Centinela, donde descansan los restos del Perito Francisco P. Moreno, arribando a la Cascada de los Cántaros. Ascendiendo por un sendero escalonado se recorre la exuberante vegetación de la selva Valdiviana, hasta llegar a los miradores de la cascada Los Cántaros, el lago Los Cántaros y a un alerce milenario. Luego de descender y después de una corta navegación (5 minutos) llegamos a Puerto Blest, pudiendo visitar la bahía y el río Frías, de particulares aguas verdes, provenientes de uno de los glaciares del Cerro Tronador.',
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
    fullDescription: 'La excursión a El Bolsón y Lago Puelo se realiza los días jueves y sábados únicamente. Durante el trayecto el camino bordea los Lagos Gutiérrez, Mascardi y Guillelmo, y cruza los Ríos Villegas, Foyel y Quemquentreu. Ya en la localidad de El Bolsón es ineludible la visita a la famosa y más importante Feria Artesanal de la región. La misma reúne una cantidad enorme de productores locales y se realiza en la Plaza Pagano. Aquí se podrán adquirir frutas finas de la región, dulces, artesanías en plata y alpaca, así como también los famosos quesos y la cerveza artesanal. Luego se realiza una visita a una fábrica de dulces y frutos finos, y al criadero de truchas. Antes de retornar a Bariloche se realiza un paseo por Lago Puelo, Chubut.',
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
  },
  {
    id: '2',
    title: 'Hotel Boutique Bariloche',
    description: 'Elegancia Patagónica con Vistas al Nahuel Huapi',
    fullDescription: 'Disfruta de una experiencia única con vistas panorámicas al Nahuel Huapi y servicios premium como spa y piscina climatizada. Ideal para parejas, familias o viajes en grupo, nuestro hotel combina elegancia con la calidez patagónica. ¡Reserva ahora y vive Bariloche con todo el confort!',
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
    amenities: 'Habitaciones con vista al lago, Departamentos amplios para familias, Full House (exclusividad para grupos)',
    location: 'Los Cerezos 5407, San Carlos de Bariloche',
    whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20estoy%20interesado%20en%20el%20Hotel%20Boutique%20Bariloche'
  },
  {
    id: '5',
    title: 'Cabañas Pura Vida',
    description: 'Descanso y comodidad cerca del lago y la ciudad',
    fullDescription: 'Viví la experiencia de Bariloche desde una cabaña cálida y cómoda, con parrilla y cochera propia. A metros del Lago Nahuel Huapi y con fácil acceso al centro, Cabañas Pura Visa es perfecta para familias, parejas o viajeros que buscan tranquilidad sin alejarse de todo.',
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
    whatsappLink: 'https://wa.me/5492944674325?text=Hola%2C%20me%20interesan%20las%20Cabañas%20Pura%20Vida'
  },
  {
    id: '3',
    title: 'Fiat Cronos',
    description: 'Sedán compacto ideal para la ciudad y viajes, con excelente consumo de combustible y amplio baúl.',
    fullDescription: 'El Fiat Cronos es la opción perfecta para quienes buscan un sedán moderno y eficiente. Con un amplio baúl de 525 litros, es ideal para viajes y equipaje. Su motor eficiente ofrece un excelente consumo de combustible, mientras que su equipamiento incluye aire acondicionado, dirección asistida, y sistemas de seguridad modernos. El interior espacioso garantiza comodidad tanto para el conductor como para los pasajeros.',
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
    fullDescription: 'El Peugeot 208 combina diseño moderno con tecnología de vanguardia. Su tamaño compacto lo hace perfecto para la ciudad, mientras que su interior premium ofrece una experiencia de conducción superior. Equipado con la última tecnología en seguridad y conectividad, incluyendo pantalla táctil con Android Auto y Apple CarPlay. Su eficiente motor garantiza un excelente rendimiento de combustible sin sacrificar potencia.',
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
  },
  // ... puedes agregar el resto de los tips aquí
];

const TipDetail = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Buscar el tip por ID
  const tip = ALL_TIPS.find(t => t.id === tipId);
  
  useEffect(() => {
    // Resetear la página al principio
    window.scrollTo(0, 0);
    
    if (tip) {
      setCurrentImageIndex(0);
    } else {
      // Si no se encuentra el tip, redirigir a la página de inicio
      navigate('/');
    }
  }, [tipId, navigate, tip]);
  
  if (!tip) {
    return null; // O un componente de carga
  }
  
  // Obtener todas las imágenes disponibles
  const images = tip.gallery || [tip.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const shareOnWhatsApp = () => {
    if (tip.whatsappLink) {
      window.open(tip.whatsappLink, '_blank');
    } else {
      const text = `¡Mira este tip sobre ${tip.title} en Bariloche! ${window.location.origin}/tip/${tip.id}`;
      window.open(`https://wa.me/5492944674325?text=${encodeURIComponent(text)}`, '_blank');
    }
  };
  
  const shareOnInstagram = () => {
    // Como Instagram no permite compartir directamente, abrimos el perfil de la empresa
    window.open('https://www.instagram.com/tipsnex/', '_blank');
  };
  
  return (
    <div className="min-h-screen bg-nextips-dark text-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="page-container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Botón de regreso */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver
            </button>

            {tip && (
              <div>
                {/* Carrusel de imágenes */}
                <div className="relative rounded-xl overflow-hidden mb-8">
                  <div className="relative aspect-video">
                    {/* Imagen actual */}
                    <img
                      src={images[currentImageIndex]}
                      alt={`${tip.title} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Botones de navegación */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Miniaturas */}
                  {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? 'bg-nextips-aqua'
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                          aria-label={`Ir a imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Contenido del tip */}
                <div className="space-y-6">
                  <div className="mb-6">
                    <div className="inline-block px-3 py-1 rounded bg-nextips-aqua/90 text-white text-sm mb-3">
                      {tip.category}
                      {tip.subcategory && ` - ${tip.subcategory}`}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {tip.title}
                    </h1>
                    <p className="text-lg text-gray-300">
                      {tip.description}
                    </p>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    {tip.price && (
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-lg text-gray-300">Precio:</span>
                        <span className="font-medium text-xl text-white">{tip.price}</span>
                      </div>
                    )}
                    
                    {tip.features && tip.category === 'Alquiler de autos' && (
                      <div className="border-b border-white/10 pb-4">
                        <span className="text-lg text-gray-300 block mb-3">Características:</span>
                        <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                          <div className="grid grid-cols-1 gap-2 text-white">
                            {tip.features.split('\n').filter(Boolean).map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                <span>{feature.replace('•', '').trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sección específica para Hospedajes */}
                    {tip.category === 'Hospedajes' && (
                      <>
                        {tip.amenities && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">Habitaciones:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="space-y-2">
                                {tip.amenities.split(',').map((amenity, index) => (
                                  <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                    <span className="text-white">{amenity.trim()}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {tip.location && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">Ubicación:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 mt-1 text-nextips-aqua shrink-0" />
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                    <span className="text-white">Los Cerezos 5407, San Carlos de Bariloche</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Sección específica para Alquiler de autos */}
                    {tip.category === 'Alquiler de autos' && tip.location && (
                      <div className="border-b border-white/10 pb-4">
                        <span className="text-lg text-gray-300 block mb-3">Ubicación:</span>
                        <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 mt-1 text-nextips-aqua shrink-0" />
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                <span className="text-white">Canelo 390</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                <span className="text-white">Aeropuerto Internacional de Bariloche</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sección específica para Excursiones */}
                    {tip.category === 'Excursiones' && (
                      <>
                        {tip.duration && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">Duración:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                <span className="text-white">{tip.duration}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {tip.meetingPoint && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">Punto de encuentro:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 mt-1 text-nextips-aqua shrink-0" />
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                    <span className="text-white">{tip.meetingPoint}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {tip.includes && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">Incluye:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="space-y-2">
                                {tip.includes.map((item, index) => (
                                  <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                    <span className="text-white">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {tip.notIncludes && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">No incluye:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="space-y-2">
                                {tip.notIncludes.map((item, index) => (
                                  <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-nextips-yellow rounded-full mr-3"></div>
                                    <span className="text-white">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {tip.recommendations && (
                          <div className="border-b border-white/10 pb-4">
                            <span className="text-lg text-gray-300 block mb-3">Recomendaciones:</span>
                            <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                              <div className="space-y-2">
                                {tip.recommendations.map((item, index) => (
                                  <div key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-nextips-yellow rounded-full mr-3"></div>
                                    <span className="text-white">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={shareOnWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-2px]"
                    >
                      <Share2 className="h-5 w-5 mr-2" />
                      Consultar por WhatsApp
                    </button>
                    
                    <button
                      onClick={shareOnInstagram}
                      className="w-full bg-nextips-dark border border-white/20 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-2px] hover:bg-pink-600/20 hover:border-pink-500/40"
                    >
                      <Instagram className="h-5 w-5 mr-2" />
                      Compartir en Instagram
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Descripción completa */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                {tip.category === 'Alquiler de autos' ? 'Requisitos para alquilar' : 
                 tip.category === 'Hospedajes' ? 'Sobre el alojamiento' :
                 tip.category === 'Excursiones' ? `Sobre la excursión` : 
                 `Sobre ${tip.title}`}
              </h2>
              <div className="bg-nextips-darkBlue/20 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                {tip.category === 'Alquiler de autos' ? (
                  <div className="space-y-4 text-gray-200 leading-relaxed">
                    <p className="font-medium text-nextips-aqua mb-2">Documentación necesaria:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>DNI o Pasaporte vigente</li>
                      <li>Licencia de conducir vigente</li>
                      <li>Tarjeta de crédito para bloqueo de garantía</li>
                    </ul>
                    <p className="mt-4 text-sm bg-nextips-darkBlue/30 p-4 rounded-lg">
                      <span className="text-nextips-yellow">Nota importante:</span> El monto de garantía bloqueado en la tarjeta de crédito puede disminuir al contratar un seguro adicional con la rentadora.
                    </p>
                  </div>
                ) : tip.category === 'Hospedajes' ? (
                  <div className="space-y-4 text-gray-200 leading-relaxed">
                    <p className="font-medium text-nextips-aqua mb-2">Información del alojamiento:</p>
                    <div className="space-y-4">
                      <p>{tip.fullDescription}</p>
                      <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>Check-in: 14:00 hs</li>
                        <li>Check-out: 10:00 hs</li>
                        <li>Se aceptan mascotas (consultar condiciones)</li>
                        <li>WiFi gratuito en todas las instalaciones</li>
                      </ul>
                    </div>
                  </div>
                ) : tip.category === 'Excursiones' ? (
                  <div className="space-y-4 text-gray-200 leading-relaxed">
                    <p className="font-medium text-nextips-aqua mb-2">Detalles de la excursión:</p>
                    <div className="space-y-4">
                      <p>{tip.fullDescription}</p>
                      <div className="mt-4 bg-nextips-darkBlue/30 p-4 rounded-lg">
                        <p className="font-medium text-nextips-yellow mb-2">Recomendaciones:</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Ropa y calzado cómodo</li>
                          <li>Protector solar</li>
                          <li>Agua y snacks</li>
                          <li>Cámara fotográfica</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-200 leading-relaxed">{tip.fullDescription}</p>
                )}
                
                {tip.whatsappLink && (
                  <div className="mt-8 flex justify-center">
                    <a
                      href={tip.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-nextips-aqua hover:bg-nextips-lightAqua text-nextips-dark font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Solicitar más información
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TipDetail;
