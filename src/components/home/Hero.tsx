
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  description: string;
  link: string;
}

const SLIDES: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Descubre Bariloche",
    description: "Explora los mejores destinos y actividades de la región",
    link: "/categoria/excursiones"
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Hospedajes de ensueño",
    description: "Las mejores opciones para tu estadía en la Patagonia",
    link: "/categoria/hospedajes"
  },
  {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    title: "Aventura sobre ruedas",
    description: "Alquila tu auto y recorre los paisajes a tu ritmo",
    link: "/categoria/alquiler-autos"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(SLIDES.length).fill(false));
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Precarga de imágenes
    SLIDES.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setIsLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });

    // Autoplay
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Imagen de fondo */}
          <div className="absolute inset-0 w-full h-full">
            {isLoaded[index] ? (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-nextips-dark animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-nextips-dark/30 via-nextips-dark/60 to-nextips-dark" />
          </div>
          
          {/* Contenido */}
          <div className="relative z-20 h-full flex items-center justify-center">
            <div className={cn(
              "page-container text-center transform transition-all duration-700",
              index === currentSlide && !isTransitioning ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                {slide.description}
              </p>
              <a
                href={slide.link}
                className="inline-flex items-center bg-nextips-aqua hover:bg-nextips-lightAqua text-nextips-dark font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
              >
                Explorar
                <ChevronRight className="ml-1 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center">
        <div className="flex space-x-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-nextips-aqua w-10" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
