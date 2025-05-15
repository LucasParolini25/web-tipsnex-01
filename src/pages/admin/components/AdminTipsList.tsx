import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Edit, Plus, Search, Trash } from 'lucide-react';
import { Tip } from '../../category/utils/categoryData';
import { categoryData } from '../utils/adminData';

const AdminTipsList = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tipToDelete, setTipToDelete] = useState<Tip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos una carga de datos
    const loadTips = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Extraemos todos los tips de las categorías
        let allTips: Tip[] = [];
        categoryData.forEach(category => {
          category.tips.forEach(tip => {
            allTips.push({
              ...tip,
              category: category.name
            });
          });
        });
        
        setTips(allTips);
      } catch (error) {
        console.error('Error al cargar los tips:', error);
        toast.error('Error al cargar los tips');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTips();
  }, []);

  const filteredTips = tips.filter(tip => 
    tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tip.subcategory && tip.subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const confirmDelete = (tip: Tip) => {
    setTipToDelete(tip);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // En una implementación real, enviaríamos una petición a la API
    if (tipToDelete) {
      setTips(prev => prev.filter(t => t.id !== tipToDelete.id));
      toast.success(`Tip "${tipToDelete.title}" eliminado correctamente`);
    }
    setIsDeleteDialogOpen(false);
    setTipToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nextips-aqua"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-white">Gestión de Tips</h1>
        <Button onClick={() => navigate('/admin/tips/crear')} className="bg-nextips-aqua hover:bg-nextips-aqua/80 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Crear Nuevo Tip
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Buscar por título, categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white"
        />
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subcategoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTips.length > 0 ? (
                filteredTips.map((tip) => (
                  <tr key={tip.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{tip.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{tip.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{tip.subcategory || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/tips/${tip.id}/editar`)}
                          className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(tip)}
                          className="h-8 w-8 text-gray-300 hover:text-red-500 hover:bg-gray-700"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-400">
                    No se encontraron tips
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription className="text-gray-400">
              ¿Estás seguro de que deseas eliminar el tip "{tipToDelete?.title}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTipsList;
