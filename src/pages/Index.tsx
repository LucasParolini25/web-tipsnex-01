import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import TipCard from '@/components/ui/TipCard';
import { ChevronRight } from 'lucide-react';
import { categoryData } from '@/pages/admin/utils/adminData';

// Seleccionar un tip de cada categoría para mostrar
const FEATURED_TIPS = [
  // Excursión destacada
  categoryData.find(cat => cat.id === 'excursiones')?.tips[0],
  // Hospedaje destacado
  categoryData.find(cat => cat.id === 'hospedajes')?.tips[0],
  // Auto destacado
  categoryData.find(cat => cat.id === 'alquiler-autos')?.tips[0],
  // Otra excursión
  categoryData.find(cat => cat.id === 'excursiones')?.tips[1],
  // Otro hospedaje
  categoryData.find(cat => cat.id === 'hospedajes')?.tips[1],
  // Otro auto
  categoryData.find(cat => cat.id === 'alquiler-autos')?.tips[1],
].filter(tip => tip !== undefined);

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-nextips-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Categorías */}
      <CategorySection />
      
      {/* Tips Destacados */}
      <section className="section-p relative">
        <div className="page-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tips <span className="text-nextips-yellow">Destacados</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Nuestras recomendaciones más populares elegidas por viajeros como tú.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_TIPS.map((tip, index) => (
              <TipCard
                key={tip.id}
                id={tip.id}
                title={tip.title}
                description={tip.description}
                image={tip.image}
                category={tip.category}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="Paisaje de Bariloche" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-nextips-dark/80 backdrop-blur-sm"></div>
        </div>
        
        <div className="page-container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para vivir la experiencia <span className="text-nextips-aqua">Bariloche</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Contacta con nosotros y planifica tu viaje perfecto con ayuda de expertos locales.
          </p>
          <a 
            href="/contacto" 
            className="inline-flex items-center bg-nextips-yellow hover:bg-yellow-400 text-nextips-dark font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Contáctanos
            <ChevronRight className="ml-1 h-5 w-5" />
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
