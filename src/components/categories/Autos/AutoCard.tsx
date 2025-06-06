import { AutoItem } from '../../../types/category';
import { CardBase } from '../../shared/CardBase';
import { Badge } from '../../ui/badge';
import { MapPin } from 'lucide-react';

interface AutoCardProps extends AutoItem {
  onWhatsAppClick?: () => void;
}

export const AutoCard = ({
  id,
  title,
  description,
  image,
  price,
  subcategory,
  location,
  features,
  whatsappLink,
  onWhatsAppClick
}: AutoCardProps) => {
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
          <span className="text-sm font-medium block mb-1">Características:</span>
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{features.length - 3} más
              </Badge>
            )}
          </div>
        </div>
      </div>
    </CardBase>
  );
}; 