
import TipCard from '@/components/ui/TipCard';
import { Tip } from '../utils/categoryData';

interface TipsListProps {
  filteredTips: Tip[];
  clearFilters: () => void;
}

const TipsList = ({ filteredTips, clearFilters }: TipsListProps) => {
  return (
    <div className="flex-1">
      {filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip, index) => (
            <TipCard
              key={tip.id}
              id={tip.id}
              title={tip.title}
              description={tip.description}
              image={tip.image}
              category={tip.subcategory || tip.category}
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

export default TipsList;
