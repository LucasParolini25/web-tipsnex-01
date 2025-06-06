import { HospedajeItem } from '../../../types/category';
import { CardBase } from '../../shared/CardBase';
import { Badge } from '../../ui/badge';
import { MapPin } from 'lucide-react';

interface HospedajeCardProps extends HospedajeItem {
  onWhatsAppClick?: () => void;
}

export const HospedajeCard = ({
  id,
  title,
  description,
  image,
  price,
  subcategory,
  location,
  amenities,
  whatsappLink,
  onWhatsAppClick
}: HospedajeCardProps) => {
  return (
    <CardBase
      id={id}
      title={title}
      description={description}
      image={image}
      whatsappLink={whatsappLink}
      onWhatsAppClick={onWhatsAppClick}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Precio:</span>
          <span className="text-sm text-gray-600">{price}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Tipo:</span>
          <Badge variant="outline">
            {subcategory}
          </Badge>
        </div>
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-gray-500 mt-1" />
          <span className="text-sm text-gray-600 flex-1">{location}</span>
        </div>
        <div className="pt-2">
          <span className="text-sm font-medium block mb-1">Servicios:</span>
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 2).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {amenities.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{amenities.length - 2} más
              </Badge>
            )}
          </div>
        </div>
      </div>
    </CardBase>
  );
}; 