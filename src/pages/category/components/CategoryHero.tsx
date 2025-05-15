import { Search } from 'lucide-react';
import { getCategoryTitle, getCategoryDescription, getCategoryImage } from '../utils/categoryData';

interface CategoryHeroProps {
  categoryId: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CategoryHero = ({ categoryId, searchTerm, setSearchTerm }: CategoryHeroProps) => {
  const categoryTitle = getCategoryTitle(categoryId);
  const categoryDescription = getCategoryDescription(categoryId);
  const categoryImage = getCategoryImage(categoryId);

  return (
    <section className="relative pt-20 h-[50vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={categoryImage}
          alt={categoryTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nextips-dark/70 via-nextips-dark/70 to-nextips-dark"></div>
      </div>
      
      <div className="page-container relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            {categoryTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {categoryDescription}
          </p>
          
          {/* Barra de búsqueda - solo se muestra si no es la categoría de alquiler de autos */}
          {categoryId !== 'alquiler-autos' && (
            <div className="relative animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Buscar en ${categoryTitle.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-nextips-darkBlue/60 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nextips-aqua/50"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
