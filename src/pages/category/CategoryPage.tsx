import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CategoryFilters from './components/CategoryFilters';
import CategoryMobileFilters from './components/CategoryMobileFilters';
import ItemList from './components/ItemList';
import { Item, CategoryType } from '@/types/category';
import { getItemsByCategory } from './utils/categoryData';
import MainLayout from '@/components/layout/MainLayout';
import { SECTION_DATA, SectionData } from '@/utils/sectionData';
import SectionHeader from '@/components/layout/SectionHeader';

// Valores válidos de categoría
const VALID_CATEGORIES = ['excursiones', 'hospedajes', 'alquiler-autos', 'tips'] as const;

type ValidCategory = typeof VALID_CATEGORIES[number];

const DEFAULT_SECTION: SectionData = {
  image: '',
  title: '',
  description: ''
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    if (categoryId && VALID_CATEGORIES.includes(categoryId as ValidCategory)) {
      const categoryItems = getItemsByCategory(categoryId as CategoryType);
      setItems(categoryItems);
      setFilteredItems(categoryItems);
    } else {
      // Si la categoría no es válida, redirigir a la página principal
      window.location.href = '/';
    }
  }, [categoryId]);

  // Obtener subcategorías únicas para esta categoría
  const subcategories = Array.isArray(items) 
    ? [...new Set(items.map(item => item.subcategory))].filter(Boolean) as string[]
    : [];

  // Filtrar items según búsqueda y subcategoría
  useEffect(() => {
    const filtered = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubcategory = !selectedSubcategory || item.subcategory === selectedSubcategory;
      return matchesSearch && matchesSubcategory;
    });
    setFilteredItems(filtered);
  }, [searchTerm, selectedSubcategory, items]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubcategory(null);
  };

  // Si no hay categoría válida, no renderizar nada
  if (!categoryId || !VALID_CATEGORIES.includes(categoryId as ValidCategory)) {
    return null;
  }

  // Obtener datos de la sección con valores por defecto
  const section: SectionData = SECTION_DATA[categoryId] || DEFAULT_SECTION;

  return (
    <MainLayout>
      <SectionHeader image={section.image} title={section.title} description={section.description} />
      <div className="container mx-auto px-4 py-8 mt-[-64px] relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros para desktop */}
          <div className="hidden lg:block w-64">
            <CategoryFilters
              subcategories={subcategories}
              selectedSubcategory={selectedSubcategory || ''}
              onSubcategoryChange={setSelectedSubcategory}
            />
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            {/* Barra de búsqueda y filtros móviles */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder={`Buscar en ${section.title.toLowerCase() || 'la categoría'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="mr-2" size={20} />
                Filtros
              </Button>
            </div>

            {/* Lista de items */}
            <ItemList 
              filteredItems={filteredItems} 
              clearFilters={clearFilters} 
            />
          </div>
        </div>

        {/* Filtros móviles */}
        <CategoryMobileFilters
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          subcategories={subcategories}
          selectedSubcategory={selectedSubcategory || ''}
          onSubcategoryChange={setSelectedSubcategory}
        />
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
