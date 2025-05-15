
import { SlidersHorizontal, X } from 'lucide-react';

interface CategoryMobileFiltersProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  hasActiveFilters: boolean;
  subcategories: string[];
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string | null) => void;
  clearFilters: () => void;
}

const CategoryMobileFilters = ({
  isFilterOpen,
  setIsFilterOpen,
  hasActiveFilters,
  subcategories,
  selectedSubcategory,
  setSelectedSubcategory,
  clearFilters
}: CategoryMobileFiltersProps) => {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center mb-4 px-4 py-2 rounded-lg bg-nextips-darkBlue/30 border border-white/10 text-white"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filtros
        {hasActiveFilters && (
          <span className="ml-2 bg-nextips-aqua text-nextips-dark text-xs rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        )}
      </button>
      
      {isFilterOpen && (
        <div className="bg-nextips-darkBlue/90 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-nextips-aqua">Filtros</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {subcategories.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Subcategorías</h4>
              <div className="grid grid-cols-2 gap-2">
                {subcategories.map(subcategory => (
                  <button
                    key={subcategory}
                    onClick={() => {
                      setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory);
                    }}
                    className={`p-2 rounded-md text-center text-sm transition-colors ${
                      selectedSubcategory === subcategory
                        ? 'bg-nextips-aqua/20 text-nextips-aqua border border-nextips-aqua/50'
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-nextips-yellow hover:text-nextips-aqua flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar filtros
              </button>
            )}
            
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-sm bg-nextips-aqua text-nextips-dark px-4 py-2 rounded-md"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMobileFilters;
