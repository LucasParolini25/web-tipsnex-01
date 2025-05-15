import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-nextips-darkBlue border-t border-white/10 text-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo y descripción */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="inline-block" aria-label="Nextips - Inicio">
              <div className="text-2xl font-bold tracking-tighter">
                <span className="text-nextips-aqua">Nex</span>
                <span className="text-nextips-yellow">tips</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Descubre los mejores consejos para disfrutar al máximo tu experiencia 
              en Bariloche. Excursiones, hospedajes y alquiler de autos recomendados 
              por expertos locales.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="https://instagram.com/tipsnex" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-nextips-yellow transition-colors duration-300" aria-label="Síguenos en Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:nexrentalbrc@gmail.com" className="text-white/80 hover:text-nextips-yellow transition-colors duration-300" aria-label="Envíanos un email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nextips-aqua">Explorar</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categoria/excursiones" className="text-gray-300 hover:text-nextips-yellow transition-colors duration-300">
                  Excursiones
                </Link>
              </li>
              <li>
                <Link to="/categoria/hospedajes" className="text-gray-300 hover:text-nextips-yellow transition-colors duration-300">
                  Hospedajes
                </Link>
              </li>
              <li>
                <Link to="/categoria/alquiler-autos" className="text-gray-300 hover:text-nextips-yellow transition-colors duration-300">
                  Alquiler de autos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-nextips-yellow transition-colors duration-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nextips-aqua">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-300">
                <MapPin className="shrink-0 h-5 w-5 text-nextips-yellow mt-0.5" />
                <span>Canelo 390, Bariloche, Río Negro, Argentina</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Phone className="shrink-0 h-5 w-5 text-nextips-yellow" />
                <span>+54 9 2944674325</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail className="shrink-0 h-5 w-5 text-nextips-yellow" />
                <span>nexrentalbrc@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} Nextips. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;