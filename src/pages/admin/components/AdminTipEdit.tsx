import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Tip } from '../../category/utils/categoryData';
import { categoryData } from '../utils/adminData';

// Esquema de validación para el formulario
const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  subcategory: z.string().optional(),
  image: z.string().min(1, 'La URL de la imagen es requerida'),
  whatsappLink: z.string().min(1, 'El enlace de WhatsApp es requerido'),
});

type FormValues = z.infer<typeof formSchema>;

const AdminTipEdit = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      subcategory: '',
      image: '',
      whatsappLink: '',
    },
  });

  useEffect(() => {
    // Cargar categorías
    const cats = categoryData.map(cat => ({
      id: cat.id,
      name: cat.name
    }));
    setCategories(cats);
    
    // Buscar el tip a editar
    const loadTip = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulamos la búsqueda del tip en nuestros datos
        let tipToEdit: Tip | undefined;
        
        for (const category of categoryData) {
          const found = category.tips.find(t => t.id === tipId);
          if (found) {
            tipToEdit = { ...found, category: category.name };
            // Si encontramos el tip, cargamos las subcategorías para esta categoría
            const currentCategory = categoryData.find(c => c.name === category.name);
            if (currentCategory && currentCategory.subcategories) {
              setSubcategories(currentCategory.subcategories);
            }
            break;
          }
        }
        
        if (tipToEdit) {
          // Establecer los valores por defecto del formulario
          form.reset({
            title: tipToEdit.title,
            description: tipToEdit.description,
            category: tipToEdit.category,
            subcategory: tipToEdit.subcategory || '',
            image: tipToEdit.image,
            whatsappLink: tipToEdit.whatsappLink || '',
          });
        } else {
          toast.error('Tip no encontrado');
          navigate('/admin');
        }
      } catch (error) {
        console.error('Error al cargar el tip:', error);
        toast.error('Error al cargar el tip');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (tipId) {
      loadTip();
    }
  }, [tipId, navigate, form]);

  const onSubmit = (values: FormValues) => {
    // En una implementación real, esto enviaría los datos a la API
    setIsLoading(true);
    
    // Simulamos una petición API
    setTimeout(() => {
      console.log('Tip actualizado:', values);
      toast.success('Tip actualizado correctamente');
      navigate('/admin');
      setIsLoading(false);
    }, 1000);
  };

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value);
    form.setValue('subcategory', ''); // Resetear la subcategoría
    
    // Actualizar subcategorías disponibles
    const selectedCategory = categoryData.find(cat => cat.name === value);
    if (selectedCategory && selectedCategory.subcategories) {
      setSubcategories(selectedCategory.subcategories);
    } else {
      setSubcategories([]);
    }
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Editar Tip</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Cancelar
        </Button>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Título</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Ingresa el título del tip" 
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Categoría</FormLabel>
                    <Select
                      onValueChange={handleCategoryChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Subcategoría (opcional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={subcategories.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Selecciona una subcategoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        {subcategories.map((subcategory) => (
                          <SelectItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Ingresa la descripción del tip" 
                      className="min-h-32 bg-gray-700 border-gray-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">URL de la imagen</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="https://ejemplo.com/imagen.jpg" 
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsappLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Enlace de WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="https://wa.me/123456789?text=Hola" 
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                className="bg-nextips-aqua hover:bg-nextips-aqua/80 text-black font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></span>
                    Guardando...
                  </span>
                ) : (
                  'Guardar Cambios'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminTipEdit;
