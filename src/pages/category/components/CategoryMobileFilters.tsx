import { SlidersHorizontal, X } from 'lucide-react';

interface CategoryMobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  subcategories: string[];
  selectedSubcategory: string | null;
  onSubcategoryChange: (subcategory: string | null) => void;
}

const CategoryMobileFilters = ({
  isOpen,
  onClose,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange
}: CategoryMobileFiltersProps) => {
  return (
    <div className="md:hidden">
      <button
        onClick={() => onClose()}
        className="flex items-center mb-4 px-4 py-2 rounded-lg bg-nextips-darkBlue/30 border border-white/10 text-white"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filtros
      </button>
      
      {isOpen && (
        <div className="bg-nextips-darkBlue/90 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/10 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-nextips-aqua">Filtros</h3>
            <button
              onClick={onClose}
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
                      onSubcategoryChange(selectedSubcategory === subcategory ? null : subcategory);
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
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
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
