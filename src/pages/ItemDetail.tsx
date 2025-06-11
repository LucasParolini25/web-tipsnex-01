import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, Share2, Instagram, MapPin, ExternalLink, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Item } from '@/types/category';
import { getItemsByCategory } from '@/pages/category/utils/categoryData';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import MainLayout from '@/components/layout/MainLayout';

const ItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [item, setItem] = useState<Item | null>(null);
  
  useEffect(() => {
    // Resetear la página al principio
    window.scrollTo(0, 0);
    
    // Buscar el item en todas las categorías
    const allItems = Object.values(getItemsByCategory('excursiones'))
      .concat(Object.values(getItemsByCategory('hospedajes')))
      .concat(Object.values(getItemsByCategory('alquiler-autos')))
      .concat(Object.values(getItemsByCategory('tips')));
    
    const foundItem = allItems.find(t => t.id === itemId);
    
    if (foundItem) {
      setItem(foundItem);
      setCurrentImageIndex(0);
    } else {
      // Si no se encuentra el item, redirigir a la página de inicio
      navigate('/');
    }
  }, [itemId, navigate]);
  
  if (!item) {
    return null; // O un componente de carga
  }
  
  // Obtener todas las imágenes disponibles
  const images = (item.gallery && item.gallery.length > 0) ? item.gallery : [item.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: item?.title,
        text: item?.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  };
  
  const handleWhatsApp = () => {
    const defaultNumber = '5492944674325';
    const whatsappLink = item?.whatsappLink || `https://wa.me/${defaultNumber}`;
    window.open(whatsappLink, '_blank');
  };
  
  const handleInstagram = () => {
    // Aquí iría la lógica para compartir en Instagram
    toast.info('Compartir en Instagram próximamente');
  };
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-nextips-dark text-white">      
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

                <div>
                  {/* Carrusel de imágenes */}
                  <div className="relative rounded-xl overflow-hidden mb-8">
                    <div className="relative aspect-video">
                      {/* Imagen actual */}
                      <img
                        src={images[currentImageIndex]}
                        alt={`${item.title} - Imagen ${currentImageIndex + 1}`}
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

                  {/* Contenido del item */}
                  <div className="space-y-6">
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 rounded bg-nextips-aqua/90 text-white text-sm mb-3">
                        {item.category}
                        {item.subcategory && ` - ${item.subcategory}`}
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {item.title}
                      </h1>
                      <p className="text-lg text-gray-300">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="space-y-6 mb-8">
                      {item.price && (
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="text-lg text-gray-300">Precio:</span>
                          <span className="font-medium text-xl text-white">{item.price}</span>
                        </div>
                      )}
                      
                      {item.features && item.category === 'Alquiler de autos' && (
                        <div className="border-b border-white/10 pb-4">
                          <span className="text-lg text-gray-300 block mb-3">Características:</span>
                          <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                            <div className="grid grid-cols-1 gap-2 text-white">
                              {item.features.map((feature, index) => (
                                <div key={index} className="flex items-center">
                                  <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sección específica para Hospedajes */}
                      {item.category === 'Hospedajes' && (
                        <>
                          {item.amenities && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">Habitaciones:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="space-y-2">
                                  {item.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                      <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                      <span className="text-white">{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {item.location && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">Ubicación:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="flex items-start">
                                  <MapPin className="h-5 w-5 mr-3 mt-1 text-nextips-aqua shrink-0" />
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                    <span className="text-white">{item.location}</span>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Sección específica para Alquiler de autos */}
                      {item.category === 'Alquiler de autos' && item.location && (
                        <div className="border-b border-white/10 pb-4">
                          <span className="text-lg text-gray-300 block mb-3">Ubicación:</span>
                          <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 mr-3 mt-1 text-nextips-aqua shrink-0" />
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                <span className="text-white">{item.location}</span>
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sección específica para Excursiones */}
                      {item.category === 'Excursiones' && (
                        <>
                          {item.duration && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">Duración:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                  <span className="text-white">{item.duration}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {item.meetingPoint && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">Punto de encuentro:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="flex items-start">
                                  <MapPin className="h-5 w-5 mr-3 mt-1 text-nextips-aqua shrink-0" />
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                      <span className="text-white">{item.meetingPoint}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {item.includes && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">Incluye:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="space-y-2">
                                  {item.includes.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                      <div className="w-2 h-2 bg-nextips-aqua rounded-full mr-3"></div>
                                      <span className="text-white">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {item.notIncludes && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">No incluye:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="space-y-2">
                                  {item.notIncludes.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                      <div className="w-2 h-2 bg-nextips-yellow rounded-full mr-3"></div>
                                      <span className="text-white">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {item.recommendations && (
                            <div className="border-b border-white/10 pb-4">
                              <span className="text-lg text-gray-300 block mb-3">Recomendaciones:</span>
                              <div className="bg-nextips-darkBlue/30 rounded-lg p-4">
                                <div className="space-y-2">
                                  {item.recommendations.map((item, index) => (
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
                      <Button
                        onClick={handleWhatsApp}
                        variant="outline"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-2px]"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Whatsapp
                      </Button>
                      <Button
                        onClick={() => window.open('https://www.instagram.com/tipsnex/', '_blank')}
                        variant="outline"
                        className="w-full bg-nextips-dark border border-white/20 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-2px] hover:bg-pink-600/20 hover:border-pink-500/40"
                      >
                        <Instagram className="h-5 w-5 mr-2" />
                        Instagram
                      </Button>
                    </div>
                  </div>
                </div>

              {/* Descripción completa */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {item.category === 'Alquiler de autos' ? 'Requisitos para alquilar' : 
                   item.category === 'Hospedajes' ? 'Sobre el alojamiento' :
                   item.category === 'Excursiones' ? `Sobre la excursión` : 
                   `Sobre ${item.title}`}
                </h2>
                <div className="bg-nextips-darkBlue/20 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                  {item.category === 'Alquiler de autos' ? (
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
                  ) : item.category === 'Hospedajes' ? (
                    <div className="space-y-4 text-gray-200 leading-relaxed">
                      <p className="font-medium text-nextips-aqua mb-2">Información del alojamiento:</p>
                      <div className="space-y-4">
                        <p>{item.fullDescription}</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                          <li>Check-in: 14:00 hs</li>
                          <li>Check-out: 10:00 hs</li>
                          <li>Se aceptan mascotas (consultar condiciones)</li>
                          <li>WiFi gratuito en todas las instalaciones</li>
                        </ul>
                      </div>
                    </div>
                  ) : item.category === 'Excursiones' ? (
                    <div className="space-y-4 text-gray-200 leading-relaxed">
                      <p className="font-medium text-nextips-aqua mb-2">Detalles de la excursión:</p>
                      <div className="space-y-4">
                        <p>{item.fullDescription}</p>
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
                    <div className="space-y-4 text-gray-200 leading-relaxed">
                      {item.details && item.details.length > 0 && (
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                          {item.details.map((detalle, index) => (
                            <li key={index}>{detalle}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {item.whatsappLink && (
                    <div className="mt-8 flex justify-center">
                      <a
                        href={item.whatsappLink}
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
      </div>
    </MainLayout>
  );
};

export default ItemDetail;
