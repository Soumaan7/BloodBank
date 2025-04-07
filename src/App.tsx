
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Donate from "./pages/Donate";
import FindBlood from "./pages/FindBlood";
import Medicines from "./pages/Medicines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminMedicines from "./pages/admin/AdminMedicines";
import AdminAddMedicine from "./pages/admin/AdminAddMedicine";
import AdminEditMedicine from "./pages/admin/AdminEditMedicine";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/find" element={<FindBlood />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin routes */}
          <Route path="/admin/medicines" element={
            <ProtectedRoute adminOnly>
              <AdminMedicines />
            </ProtectedRoute>
          } />
          <Route path="/admin/medicines/add" element={
            <ProtectedRoute adminOnly>
              <AdminAddMedicine />
            </ProtectedRoute>
          } />
          <Route path="/admin/medicines/edit/:id" element={
            <ProtectedRoute adminOnly>
              <AdminEditMedicine />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
