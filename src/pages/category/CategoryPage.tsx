import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CategoryHero from './components/CategoryHero';
import CategoryFilters from './components/CategoryFilters';
import CategoryMobileFilters from './components/CategoryMobileFilters';
import TipsList from './components/TipsList';
import { Tip, getTipsByCategory } from './utils/categoryData';

const CategoryPage = () => {
  const { categoryId = '' } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Obtener los tips para esta categoría
  const tips = getTipsByCategory(categoryId);
  
  // Obtener subcategorías únicas para esta categoría
  const subcategories = [...new Set(tips.map(tip => tip.subcategory))].filter(Boolean) as string[];
  
  // Filtrar tips según búsqueda y subcategoría
  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubcategory = !selectedSubcategory || tip.subcategory === selectedSubcategory;
    
    return matchesSearch && matchesSubcategory;
  });
  
  // Resetear la página al principio cuando cambia la categoría
  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchTerm('');
    setSelectedSubcategory(null);
  }, [categoryId]);
  
  // Verificar si hay filtros activos
  const hasActiveFilters = !!searchTerm || !!selectedSubcategory;
  
  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubcategory(null);
  };
  
  return (
    <div className="min-h-screen bg-nextips-dark text-white">
      <Navbar />
      
      <CategoryHero 
        categoryId={categoryId} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <section className="pb-16">
        <div className="page-container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filtros para pantallas grandes - no se muestran para alquiler de autos */}
            {categoryId !== 'alquiler-autos' && (
              <CategoryFilters 
                subcategories={subcategories} 
                selectedSubcategory={selectedSubcategory} 
                setSelectedSubcategory={setSelectedSubcategory} 
                hasActiveFilters={hasActiveFilters} 
                clearFilters={clearFilters} 
              />
            )}
            
            {/* Filtros para móvil - no se muestran para alquiler de autos */}
            {categoryId !== 'alquiler-autos' && (
              <CategoryMobileFilters 
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                hasActiveFilters={hasActiveFilters}
                subcategories={subcategories} 
                selectedSubcategory={selectedSubcategory} 
                setSelectedSubcategory={setSelectedSubcategory} 
                clearFilters={clearFilters} 
              />
            )}
            
            {/* Lista de tips */}
            <TipsList 
              filteredTips={filteredTips} 
              clearFilters={clearFilters} 
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
