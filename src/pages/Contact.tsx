import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from "@/components/layout/Footer";
import { Instagram, Mail, MapPin, Phone, Send, AlertCircle } from 'lucide-react';
import '@/styles/map.css';

const LOCATION = { lat: -41.134258, lng: -71.308525 }; // Coordenadas de Canelo 390, Bariloche

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message?: string;
  }>({
    status: 'idle'
  });
  
  useEffect(() => {
    // Cargar Leaflet CSS
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(linkElement);

    // Cargar Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(linkElement);
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initMap = () => {
    const L = (window as any).L;
    if (!L) return;

    // Crear el mapa
    const map = L.map('map').setView([LOCATION.lat, LOCATION.lng], 15);

    // Agregar el tema oscuro de OpenStreetMap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(map);

    // Agregar marcador personalizado
    const icon = L.divIcon({
      className: 'custom-marker',
      html: '<div class="marker-pin"></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });

    const marker = L.marker([LOCATION.lat, LOCATION.lng], { icon }).addTo(map);
    
    // Agregar popup
    marker.bindPopup(`
      <div class="popup-content">
        <div class="popup-title">Nex Rental</div>
        <div class="popup-address">Canelo 390, Bariloche</div>
      </div>
    `).openPopup();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ status: 'submitting' });
    
    // Redirigir a WhatsApp
    const message = `Hola, vi tu web y estoy interesado en saber más.\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nAsunto: ${formData.subject}\nMensaje: ${formData.message}`;
    window.open(`https://wa.me/5492944674325?text=${encodeURIComponent(message)}`, '_blank');
    
    // Resetear formulario
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Mostrar mensaje de éxito
    setFormStatus({
      status: 'success',
      message: '¡Mensaje enviado con éxito! Te redirigimos a WhatsApp para continuar la conversación.'
    });
    
    // Resetear estado después de 5 segundos
    setTimeout(() => {
      setFormStatus({ status: 'idle' });
    }, 5000);
  };
  
  return (
    <div className="min-h-screen bg-nextips-dark text-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="page-container">
          <div className="text-center mx-auto max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contáctanos
            </h1>
            <p className="text-gray-300">
              ¿Tienes alguna pregunta sobre nuestros tips o necesitas ayuda para planificar tu viaje a Bariloche? 
              Estamos aquí para ayudarte.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario de contacto */}
            <div className="bg-nextips-darkBlue/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 order-2 lg:order-1">
              <h2 className="text-2xl font-semibold text-nextips-aqua mb-8">
                Envíanos un mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-gray-200 text-sm font-medium">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-nextips-dark/50 border border-white/10 rounded-lg p-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nextips-aqua/50 focus:border-transparent text-base"
                      disabled={formStatus.status === 'submitting'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-200 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-nextips-dark/50 border border-white/10 rounded-lg p-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nextips-aqua/50 focus:border-transparent text-base"
                      disabled={formStatus.status === 'submitting'}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-gray-200 text-sm font-medium">
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-nextips-dark/50 border border-white/10 rounded-lg p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-nextips-aqua/50 focus:border-transparent text-base"
                    disabled={formStatus.status === 'submitting'}
                  >
                    <option value="" className="bg-nextips-dark text-gray-400">Selecciona un asunto</option>
                    <option value="Excursiones" className="bg-nextips-dark">Consulta sobre excursiones</option>
                    <option value="Hospedajes" className="bg-nextips-dark">Consulta sobre hospedajes</option>
                    <option value="Alquiler de autos" className="bg-nextips-dark">Consulta sobre alquiler de autos</option>
                    <option value="Otro" className="bg-nextips-dark">Otro</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-gray-200 text-sm font-medium">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-nextips-dark/50 border border-white/10 rounded-lg p-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nextips-aqua/50 focus:border-transparent text-base resize-none"
                    disabled={formStatus.status === 'submitting'}
                  ></textarea>
                </div>
                
                {formStatus.status === 'success' && (
                  <div className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-200 flex items-start">
                    <div className="mr-3 mt-0.5">
                      <Send className="h-5 w-5" />
                    </div>
                    <p className="text-sm">{formStatus.message}</p>
                  </div>
                )}
                
                {formStatus.status === 'error' && (
                  <div className="p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-200 flex items-start">
                    <div className="mr-3 mt-0.5">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <p className="text-sm">{formStatus.message}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-nextips-yellow hover:bg-yellow-400 text-nextips-dark font-medium py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center text-base"
                  disabled={formStatus.status === 'submitting'}
                >
                  {formStatus.status === 'submitting' ? (
                    <>
                      <svg className="animate-spin mr-2 h-5 w-5 text-nextips-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Información de contacto */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="bg-nextips-darkBlue/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-xl font-semibold text-nextips-aqua mb-6">
                  Información de contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-nextips-yellow" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-white">Nuestra ubicación</h3>
                      <p className="text-gray-300 mt-1">
                        Canelo 390<br />
                        San Carlos de Bariloche<br />
                        Río Negro, Argentina
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="h-6 w-6 text-nextips-yellow" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-white">Teléfono</h3>
                      <a 
                        href="tel:+5492944674325" 
                        className="text-gray-300 hover:text-white transition-colors mt-1 block"
                      >
                        +54 9 2944 67-4325
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-nextips-yellow" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-white">Email</h3>
                      <a 
                        href="mailto:nexrentalbrc@gmail.com" 
                        className="text-gray-300 hover:text-white transition-colors mt-1 block"
                      >
                        nexrentalbrc@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Instagram className="h-6 w-6 text-nextips-yellow" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-white">Instagram</h3>
                      <a 
                        href="https://www.instagram.com/tipsnex/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors mt-1 block"
                      >
                        @tipsnex
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="bg-nextips-darkBlue/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
                <div id="map" className="w-full h-[400px]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
