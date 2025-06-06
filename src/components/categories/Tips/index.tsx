import { useEffect, useState } from 'react';
import { CategoryLayout } from '../../shared/CategoryLayout';
import { TipCard } from './TipCard';
import { TipFilters } from './TipFilters';
import { Tip, TipCategory, TipRelevance } from '../../../types/tip';

export const Tips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<TipCategory | 'todos'>('todos');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | 'todos'>('todos');
  const [selectedRelevance, setSelectedRelevance] = useState<TipRelevance | 'todos'>('todos');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch('/src/data/tips.json');
        const data = await response.json();
        setTips(data.tips);
      } catch (error) {
        console.error('Error cargando tips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleWhatsAppClick = (link: string) => {
    window.open(link, '_blank');
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredTips = tips.filter(tip => {
    const categoryMatch = selectedCategory === 'todos' || tip.categoria === selectedCategory;
    const subcategoryMatch = selectedSubcategory === 'todos' || tip.subcategoria === selectedSubcategory;
    const relevanceMatch = selectedRelevance === 'todos' || tip.relevancia === selectedRelevance;
    const tagsMatch = selectedTags.length === 0 || selectedTags.some(tag => tip.tags.includes(tag));

    return categoryMatch && subcategoryMatch && relevanceMatch && tagsMatch;
  });

  const availableSubcategories = Array.from(new Set(tips.map(tip => tip.subcategoria)));
  const availableTags = Array.from(new Set(tips.flatMap(tip => tip.tags)));

  if (loading) {
    return <div className="text-center py-8">Cargando tips...</div>;
  }

  return (
    <CategoryLayout
      type="tips"
      title="Tips para tu viaje"
      description="Consejos útiles para disfrutar al máximo tu estadía en Bariloche"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <TipFilters
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            selectedRelevance={selectedRelevance}
            selectedTags={selectedTags}
            onCategoryChange={setSelectedCategory}
            onSubcategoryChange={setSelectedSubcategory}
            onRelevanceChange={setSelectedRelevance}
            onTagToggle={handleTagToggle}
            availableSubcategories={availableSubcategories}
            availableTags={availableTags}
          />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip) => (
              <TipCard
                key={tip.id}
                {...tip}
                onWhatsAppClick={() => tip.contacto && handleWhatsAppClick(`https://wa.me/${tip.contacto.replace(/\D/g, '')}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </CategoryLayout>
  );
}; 