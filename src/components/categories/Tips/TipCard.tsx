import { Tip } from '../../../types/tip';
import { CardBase } from '../../shared/CardBase';
import { Badge } from '../../ui/badge';
import { MapPin, ExternalLink } from 'lucide-react';

interface TipCardProps extends Tip {
  onWhatsAppClick?: () => void;
}

export const TipCard = ({
  id,
  titulo,
  descripcion,
  imagen,
  categoria,
  subcategoria,
  relevancia,
  tags,
  detalles,
  enlaces,
  contacto,
  onWhatsAppClick
}: TipCardProps) => {
  return (
    <CardBase
      id={id}
      title={titulo}
      description={descripcion}
      image={imagen || '/images/tips/default-tip.webp'}
      whatsappLink={contacto ? `https://wa.me/${contacto.replace(/\D/g, '')}` : undefined}
      onWhatsAppClick={onWhatsAppClick}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Categoría:</span>
          <Badge variant="outline">
            {categoria}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Subcategoría:</span>
          <Badge variant="secondary">
            {subcategoria}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Relevancia:</span>
          <Badge variant={relevancia === 'esencial' ? 'destructive' : 'default'}>
            {relevancia}
          </Badge>
        </div>
        {detalles.length > 0 && (
          <div className="pt-2">
            <span className="text-sm font-medium block mb-1">Detalles:</span>
            <ul className="list-disc pl-5 space-y-1">
              {detalles.map((detalle, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {detalle}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="pt-2">
          <span className="text-sm font-medium block mb-1">Tags:</span>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {enlaces.length > 0 && (
          <div className="pt-2">
            <span className="text-sm font-medium block mb-1">Enlaces:</span>
            <div className="space-y-1">
              {enlaces.map((enlace, index) => (
                <a
                  key={index}
                  href={enlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  {enlace.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </CardBase>
  );
}; 