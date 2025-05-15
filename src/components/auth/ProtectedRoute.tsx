
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const adminToken = localStorage.getItem('nextips_admin_token');
    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast.error('Debes iniciar sesión para acceder a esta página');
    }
  }, []);

  // Mientras verificamos la autenticación, mostramos un indicador de carga
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nextips-aqua"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostramos el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
