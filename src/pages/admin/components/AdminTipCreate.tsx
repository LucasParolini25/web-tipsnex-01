import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { categoryData } from '../utils/adminData';

const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  subcategory: z.string().optional(),
  image: z.string().min(1, 'La URL de la imagen es requerida'),
  whatsappLink: z.string().min(1, 'El enlace de WhatsApp es requerido'),
});

type FormValues = z.infer<typeof formSchema>;

const AdminTipCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    const cats = categoryData.map(cat => ({
      id: cat.id,
      name: cat.name
    }));
    setCategories(cats);
  }, []);

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Nuevo tip creado:', values);
      toast.success('Tip creado correctamente');
      navigate('/admin');
      setIsLoading(false);
    }, 1000);
  };

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value);
    form.setValue('subcategory', '');
    
    const selectedCategory = categoryData.find(cat => cat.name === value);
    if (selectedCategory && selectedCategory.subcategories) {
      setSubcategories(selectedCategory.subcategories);
    } else {
      setSubcategories([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Crear Nuevo Tip</h1>
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
                    Creando...
                  </span>
                ) : (
                  'Crear Tip'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminTipCreate;
