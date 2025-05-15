
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Para esta demostración, usamos credenciales hardcodeadas
    // En una implementación real, esto debería validarse contra una API o servicio de autenticación
    const validUsername = 'admin';
    const validPassword = 'nextips123';
    
    setIsLoading(true);
    
    try {
      // Simulamos una llamada a la API con un timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === validUsername && password === validPassword) {
        // Credenciales correctas - guardamos un token simple
        localStorage.setItem('nextips_admin_token', 'demo_token_' + Date.now());
        toast.success('Inicio de sesión exitoso');
        navigate('/admin');
      } else {
        // Credenciales incorrectas
        toast.error('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-nextips-yellow">Nextips Admin</h1>
          <p className="mt-2 text-gray-400">Panel de administración</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-nextips-aqua hover:bg-nextips-aqua/80 text-black font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></span>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
