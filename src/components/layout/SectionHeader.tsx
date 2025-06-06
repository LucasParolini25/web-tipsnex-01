import React from 'react';

interface SectionHeaderProps {
  image?: string;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ image, title, description }) => {
  return (
    <header className="relative w-full min-h-[320px] flex items-center justify-center overflow-hidden">
      {image && (
        <>
          <img
            src={image}
            alt="Fondo de sección"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/60 z-10" />
          {/* Gradiente inferior para fundir con el fondo */}
          <div
            className="absolute bottom-0 left-0 w-full h-64 z-20"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgb(26 26 46) 100%)"
            }}
          />
        </>
      )}
      <div className="relative z-30 text-center px-4 py-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow">
          {description}
        </p>
      </div>
    </header>
  );
};

export default SectionHeader; 