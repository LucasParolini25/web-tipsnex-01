import { useEffect, useState } from 'react';
import { CategoryLayout } from '../../shared/CategoryLayout';
import { AutoCard } from './AutoCard';
import { AutoItem } from '../../../types/category';

export const Autos = () => {
  const [autos, setAutos] = useState<AutoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('/src/data/autos.json');
        const data = await response.json();
        setAutos(data.autos);
      } catch (error) {
        console.error('Error cargando autos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutos();
  }, []);

  const handleWhatsAppClick = (link: string) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return <div className="text-center py-8">Cargando autos...</div>;
  }

  return (
    <CategoryLayout
      type="alquiler-autos"
      title="Alquiler de Autos en Bariloche"
      description="Encuentra el vehículo perfecto para tu estadía en Bariloche"
    >
      {autos.map((auto) => (
        <AutoCard
          key={auto.id}
          {...auto}
          onWhatsAppClick={() => auto.whatsappLink && handleWhatsAppClick(auto.whatsappLink)}
        />
      ))}
    </CategoryLayout>
  );
}; 