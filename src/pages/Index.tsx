import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import { ChevronRight } from 'lucide-react';
import { TIPS_DATA } from './category/utils/categoryData';
import ItemCard from '@/components/ui/ItemCard';
import { Item } from '@/types/category';

// Seleccionar un item de cada categoría para mostrar
const FEATURED_ITEMS = [
  // Excursiones
  TIPS_DATA['excursiones'][0],
  // Hospedajes
  TIPS_DATA['hospedajes'][0],
  // Autos
  TIPS_DATA['alquiler-autos'][0],
  // Tips
  TIPS_DATA['tips'][0],
  // Más excursiones
  TIPS_DATA['excursiones'][1],
  // Más hospedajes
  TIPS_DATA['hospedajes'][1],
].filter(item => item !== undefined);

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
      
      {/* Items Destacados */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Items <span className="text-nextips-yellow">Destacados</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre nuestras recomendaciones más populares para tu viaje a Bariloche
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_ITEMS.map((item, index) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              category={item.category}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
      
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
