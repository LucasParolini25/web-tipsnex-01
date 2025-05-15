
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/category/CategoryPage";
import TipDetail from "./pages/TipDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTipsList from "./pages/admin/components/AdminTipsList";
import AdminTipEdit from "./pages/admin/components/AdminTipEdit";
import AdminTipCreate from "./pages/admin/components/AdminTipCreate";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/categoria/:categoryId" element={<CategoryPage />} />
          <Route path="/tip/:tipId" element={<TipDetail />} />
          <Route path="/contacto" element={<Contact />} />
          
          {/* Rutas de administración */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
            <Route index element={<AdminTipsList />} />
            <Route path="tips/crear" element={<AdminTipCreate />} />
            <Route path="tips/:tipId/editar" element={<AdminTipEdit />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
