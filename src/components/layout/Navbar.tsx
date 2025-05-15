import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
const CATEGORIES = [{
  name: 'Excursiones',
  path: '/categoria/excursiones'
}, {
  name: 'Hospedajes',
  path: '/categoria/hospedajes'
}, {
  name: 'Alquiler de autos',
  path: '/categoria/alquiler-autos'
}, {
  name: 'Contacto',
  path: '/contacto'
}];
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  return <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out', isScrolled ? 'bg-nextips-dark/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5')}>
      <nav className="page-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Nextips - Inicio">
          <div className="relative">
            <div className="text-xl md:text-2xl font-bold tracking-tighter">
              <span className="text-nextips-aqua">Nex</span>
              <span className="text-nextips-yellow">tips</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-nextips-aqua to-nextips-yellow transform origin-left scale-0 transition-transform duration-300 group-hover:scale-100"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {CATEGORIES.map(category => <Link key={category.path} to={category.path} className={cn('relative text-sm font-medium py-2 transition-all duration-300', location.pathname === category.path ? 'text-nextips-yellow' : 'text-white/80 hover:text-white', 'group')}>
              {category.name}
              <span className={cn('absolute bottom-0 left-0 w-full h-0.5 bg-nextips-yellow transform origin-left transition-transform duration-300', location.pathname === category.path ? 'scale-100' : 'scale-0 group-hover:scale-75')} />
            </Link>)}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white p-2 rounded-md hover:bg-nextips-darkBlue/50 transition-colors" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu" aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className={cn('fixed inset-0 bg-nextips-dark/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center md:hidden transition-all duration-300', isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible')}>
          <button onClick={toggleMobileMenu} className="absolute top-5 right-5 text-white p-2 rounded-md hover:bg-nextips-darkBlue/50 transition-colors" aria-label="Cerrar menú">
            <X size={24} />
          </button>
          <div className="flex flex-col items-center space-y-8">
            {CATEGORIES.map((category, index) => <Link key={category.path} to={category.path} className={cn('text-xl font-medium py-2 transition-all duration-300', location.pathname === category.path ? 'text-nextips-yellow' : 'text-white/80 hover:text-white', 'animate-fade-in', {
            'animation-delay-100': index === 0
          }, {
            'animation-delay-200': index === 1
          }, {
            'animation-delay-300': index === 2
          }, {
            'animation-delay-400': index === 3
          })} style={{
            animationDelay: `${(index + 1) * 100}ms`
          }} onClick={toggleMobileMenu}>
                {category.name}
              </Link>)}
          </div>
        </div>
      </nav>
    </header>;
};
export default Navbar;