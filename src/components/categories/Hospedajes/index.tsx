import { useEffect, useState } from 'react';
import { CategoryLayout } from '../../shared/CategoryLayout';
import { HospedajeCard } from './HospedajeCard';
import { HospedajeItem } from '../../../types/category';

export const Hospedajes = () => {
  const [hospedajes, setHospedajes] = useState<HospedajeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospedajes = async () => {
      try {
        const response = await fetch('/src/data/hospedajes.json');
        const data = await response.json();
        setHospedajes(data);
        console.log(hospedajes)
      } catch (error) {
        console.error('Error cargando hospedajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospedajes();
  }, []);

  const handleWhatsAppClick = (link: string) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return <div className="text-center py-8">Cargando hospedajes...</div>;
  }

  return (
    <CategoryLayout
      type="hospedajes"
      title="Hospedajes en Bariloche"
      description="Encuentra el alojamiento perfecto para tu estadía en Bariloche"
    >
      {hospedajes.map((hospedaje) => (
        <HospedajeCard
          key={hospedaje.id}
          {...hospedaje}
          onWhatsAppClick={() => hospedaje.whatsappLink && handleWhatsAppClick(hospedaje.whatsappLink)}
        />
      ))}
    </CategoryLayout>
  );
}; 