import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Instagram, Share2, ArrowRight } from 'lucide-react';

interface TipCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  whatsappLink?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TipCard = ({
  id,
  title,
  description,
  image,
  category,
  whatsappLink,
  className,
  style,
}: TipCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const navigate = useNavigate();
  const shareOnWhatsApp = () => {
    if (whatsappLink) {
      window.open(whatsappLink, '_blank');
    } else {
      const text = `Hola, vi tu web y estoy interesado en saber más sobre ${title}`;
      window.open(`https://wa.me/5492944674325?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const shareOnInstagram = () => {
    window.open('https://www.instagram.com/tipsnex/', '_blank');
  };

  return (
    <div 
      onClick={() => navigate(`/item/${id}`)}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-nextips-dark border border-white/10 transition-all duration-500 hover:shadow-xl hover:shadow-nextips-aqua/10 hover:border-nextips-aqua/30",
        className
      )}
      style={style}
    >
      {/* Imagen */}
      <div className="aspect-video w-full relative overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-nextips-darkBlue/50 animate-pulse" />
        )}
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nextips-dark to-transparent opacity-80" />
        
        {/* Etiqueta de categoría */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium py-1 px-2 rounded bg-nextips-aqua/90 text-white backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={shareOnWhatsApp}
              className="p-2 rounded-full bg-nextips-dark border border-white/20 text-white/70 hover:text-white hover:bg-green-600/20 hover:border-green-500/40 transition-all duration-300"
              aria-label="Compartir en WhatsApp"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={shareOnInstagram}
              className="p-2 rounded-full bg-nextips-dark border border-white/20 text-white/70 hover:text-white hover:bg-pink-600/20 hover:border-pink-500/40 transition-all duration-300"
              aria-label="Compartir en Instagram"
            >
              <Instagram size={16} />
            </button>
          </div>
          
          <Link
            to={`/item/${id}`}
            className="inline-flex items-center text-sm font-medium text-nextips-aqua hover:text-nextips-yellow transition-colors duration-300"
          >
            Ver más
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 border-2 border-nextips-aqua/0 rounded-xl transition-all duration-500 group-hover:border-nextips-aqua/50 pointer-events-none" />
    </div>
  );
};

export default TipCard;
