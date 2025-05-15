
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar';
import { toast } from 'sonner';
import { Home, List, LogOut, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('nextips_admin_token');
    toast.success('Sesión cerrada correctamente');
    navigate('/admin/login');
  };

  useEffect(() => {
    document.title = 'Panel de Administración | Nextips';
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900 text-gray-200">
        <Sidebar>
          <SidebarHeader className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-nextips-yellow">Nextips Admin</h1>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin')}>
                  <button onClick={() => navigate('/admin')}>
                    <Home size={20} />
                    <span>Dashboard</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin')}>
                  <button onClick={() => navigate('/admin')}>
                    <List size={20} />
                    <span>Lista de Tips</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/admin/tips/crear')}>
                  <button onClick={() => navigate('/admin/tips/crear')}>
                    <Plus size={20} />
                    <span>Crear Nuevo Tip</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-gray-700">
            <Button 
              variant="ghost" 
              onClick={handleLogout} 
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <LogOut size={18} className="mr-2" />
              Cerrar sesión
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-auto">
          <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <h2 className="text-xl font-semibold text-white">Panel de Administración</h2>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
