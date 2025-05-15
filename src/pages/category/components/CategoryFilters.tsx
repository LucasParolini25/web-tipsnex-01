
import { X } from 'lucide-react';

interface CategoryFiltersProps {
  subcategories: string[];
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string | null) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const CategoryFilters = ({ 
  subcategories, 
  selectedSubcategory, 
  setSelectedSubcategory, 
  hasActiveFilters, 
  clearFilters 
}: CategoryFiltersProps) => {
  if (subcategories.length === 0 && !hasActiveFilters) {
    return null;
  }

  return (
    <div className="hidden md:block w-64 shrink-0">
      <div className="bg-nextips-darkBlue/30 backdrop-blur-sm rounded-xl p-6 sticky top-24 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 text-nextips-aqua">Filtros</h3>
        
        {subcategories.length > 0 && (
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Subcategorías</h4>
            <div className="space-y-2">
              {subcategories.map(subcategory => (
                <div key={subcategory} className="flex items-center">
                  <button
                    onClick={() => setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory)}
                    className={`flex items-center w-full p-2 rounded-md transition-colors ${
                      selectedSubcategory === subcategory
                        ? 'bg-nextips-aqua/20 text-nextips-aqua'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      selectedSubcategory === subcategory
                        ? 'bg-nextips-aqua'
                        : 'bg-gray-500'
                    }`}></span>
                    {subcategory}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-nextips-yellow hover:text-nextips-aqua flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
