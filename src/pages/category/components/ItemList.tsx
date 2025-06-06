import TipCard from '@/components/ui/TipCard';
import { Item } from '@/types/category';

interface ItemListProps {
  filteredItems: Item[];
  clearFilters: () => void;
}

const ItemList = ({ filteredItems, clearFilters }: ItemListProps) => {
  return (
    <div className="flex-1">
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <TipCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              category={item.subcategory || item.category}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400 mb-4">No se encontraron resultados</p>
          <button
            onClick={clearFilters}
            className="text-nextips-aqua hover:text-nextips-yellow"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
