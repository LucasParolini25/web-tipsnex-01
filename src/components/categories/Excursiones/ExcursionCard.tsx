import { ExcursionItem } from '../../../types/category';
import { CardBase } from '../../shared/CardBase';
import { Badge } from '../../ui/badge';

interface ExcursionCardProps extends ExcursionItem {
  onWhatsAppClick?: () => void;
}

export const ExcursionCard = ({
  id,
  title,
  description,
  image,
  duration,
  price,
  excursionType,
  subcategory,
  whatsappLink,
  onWhatsAppClick
}: ExcursionCardProps) => {
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
          <span className="text-sm font-medium">Duración:</span>
          <span className="text-sm text-gray-600">{duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Precio:</span>
          <span className="text-sm text-gray-600">{price}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Tipo:</span>
          <Badge variant={excursionType === 'TERRESTRE' ? 'default' : 'secondary'}>
            {excursionType}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Categoría:</span>
          <Badge variant="outline">
            {subcategory}
          </Badge>
        </div>
      </div>
    </CardBase>
  );
}; 