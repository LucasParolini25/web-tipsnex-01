
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronRight, Map, Hotel, Car } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  link: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'excursiones',
    title: 'Excursiones',
    description: 'Descubre los mejores circuitos y actividades al aire libre para disfrutar de los paisajes de la Patagonia.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    icon: <Map className="h-8 w-8" />,
    link: '/categoria/excursiones'
  },
  {
    id: 'hospedajes',
    title: 'Hospedajes',
    description: 'Encuentra alojamientos con las mejores vistas y servicios para tu estadía perfecta en Bariloche.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    icon: <Hotel className="h-8 w-8" />,
    link: '/categoria/hospedajes'
  },
  {
    id: 'alquiler-autos',
    title: 'Alquiler de Autos',
    description: 'Compara opciones y consigue el mejor vehículo para explorar la región a tu propio ritmo.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67',
    icon: <Car className="h-8 w-8" />,
    link: '/categoria/alquiler-autos'
  }
];

const CategorySection = () => {
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.category-card');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="section-p bg-nextips-dark relative">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-nextips-dark to-transparent"></div>
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explora Bariloche por <span className="text-nextips-aqua">Categorías</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre nuestras recomendaciones organizadas por categorías para que encuentres exactamente lo que estás buscando.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              id={category.id}
              className={cn(
                "category-card relative group rounded-xl overflow-hidden transition-all duration-700 transform",
                visibleCategories.includes(category.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              )}
            >
              <div className="absolute inset-0 bg-nextips-darkBlue/30 group-hover:bg-nextips-darkBlue/10 transition-all duration-500"></div>
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-60 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-nextips-dark via-nextips-dark/80 to-transparent"></div>
              
              {/* Contenido */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="bg-nextips-darkBlue/60 backdrop-blur-sm p-4 rounded-lg glass border border-white/10 transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full bg-nextips-aqua/20 text-nextips-aqua mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{category.description}</p>
                  <Link
                    to={category.link}
                    className="inline-flex items-center text-nextips-aqua hover:text-nextips-yellow font-medium transition-colors"
                  >
                    Ver todos
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              {/* Efecto de borde al hacer hover */}
              <div className="absolute inset-0 border-2 border-nextips-aqua scale-105 opacity-0 rounded-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-50 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
