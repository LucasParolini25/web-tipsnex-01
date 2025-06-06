import { BaseCategory } from '../../types/category';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface CardBaseProps extends BaseCategory {
  children?: React.ReactNode;
  onWhatsAppClick?: () => void;
}

export const CardBase = ({
  title,
  description,
  image,
  whatsappLink,
  children,
  onWhatsAppClick
}: CardBaseProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {whatsappLink && (
        <CardFooter>
          <Button
            onClick={onWhatsAppClick}
            className="w-full"
            variant="default"
          >
            Contactar por WhatsApp
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}; 