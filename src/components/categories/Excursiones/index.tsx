import { useEffect, useState } from 'react';
import { CategoryLayout } from '../../shared/CategoryLayout';
import { ExcursionCard } from './ExcursionCard';
import { ExcursionItem } from '../../../types/category';

export const Excursiones = () => {
  const [excursiones, setExcursiones] = useState<ExcursionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExcursiones = async () => {
      try {
        const response = await fetch('/src/data/excursiones.json');
        const data = await response.json();
        setExcursiones(data.excursiones);
      } catch (error) {
        console.error('Error cargando excursiones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExcursiones();
  }, []);

  const handleWhatsAppClick = (link: string) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return <div className="text-center py-8">Cargando excursiones...</div>;
  }

  return (
    <CategoryLayout
      type="excursiones"
      title="Excursiones en Bariloche"
      description="Descubre las mejores excursiones y actividades para disfrutar de Bariloche"
    >
      {excursiones.map((excursion) => (
        <ExcursionCard
          key={excursion.id}
          {...excursion}
          onWhatsAppClick={() => excursion.whatsappLink && handleWhatsAppClick(excursion.whatsappLink)}
        />
      ))}
    </CategoryLayout>
  );
}; 