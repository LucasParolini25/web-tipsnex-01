import { TipCategory, TipRelevance } from '../../../types/tip';
import { Badge } from '../../ui/badge';

interface TipFiltersProps {
  selectedCategory: TipCategory | 'todos';
  selectedSubcategory: string | 'todos';
  selectedRelevance: TipRelevance | 'todos';
  selectedTags: string[];
  onCategoryChange: (category: TipCategory | 'todos') => void;
  onSubcategoryChange: (subcategory: string | 'todos') => void;
  onRelevanceChange: (relevance: TipRelevance | 'todos') => void;
  onTagToggle: (tag: string) => void;
  availableSubcategories: string[];
  availableTags: string[];
}

export const TipFilters = ({
  selectedCategory,
  selectedSubcategory,
  selectedRelevance,
  selectedTags,
  onCategoryChange,
  onSubcategoryChange,
  onRelevanceChange,
  onTagToggle,
  availableSubcategories,
  availableTags
}: TipFiltersProps) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 className="text-sm font-medium mb-2">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === 'todos' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onCategoryChange('todos')}
          >
            Todos
          </Badge>
          {Object.values(TipCategory).map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Subcategorías</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedSubcategory === 'todos' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onSubcategoryChange('todos')}
          >
            Todas
          </Badge>
          {availableSubcategories.map((subcategory) => (
            <Badge
              key={subcategory}
              variant={selectedSubcategory === subcategory ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onSubcategoryChange(subcategory)}
            >
              {subcategory}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Relevancia</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedRelevance === 'todos' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onRelevanceChange('todos')}
          >
            Todas
          </Badge>
          {['esencial', 'útil', 'aventura', 'recomendado'].map((relevance) => (
            <Badge
              key={relevance}
              variant={selectedRelevance === relevance ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onRelevanceChange(relevance as TipRelevance)}
            >
              {relevance}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}; 