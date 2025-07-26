import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupForm } from './components/SignupForm';
import { LoginForm } from './components/LoginForm';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Footer from './components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Your Google client ID
const clientId = "628901256109-4716nksvbm56ve57tam21crnj8r2q3ul.apps.googleusercontent.com";

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// ✅ Wrap the entire App in GoogleOAuthProvider and export that
const WrappedApp = () => (
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);

export default App;
