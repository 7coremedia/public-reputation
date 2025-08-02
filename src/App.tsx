import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BusinessProfile from "./pages/BusinessProfile";
import Onboarding from "./pages/Onboarding";
import BusinessDiscovery from "./pages/BusinessDiscovery";
import SubmitOpinion from "./pages/SubmitOpinion";
import ResolutionTracker from "./pages/ResolutionTracker";
import RefundAppeal from "./pages/RefundAppeal";
import BusinessDashboard from "./pages/BusinessDashboard";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/discover" element={<BusinessDiscovery />} />
          <Route path="/submit-opinion" element={<SubmitOpinion />} />
          <Route path="/tracker" element={<ResolutionTracker />} />
          <Route path="/appeals" element={<RefundAppeal />} />
          <Route path="/dashboard" element={<BusinessDashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/business/:id" element={<BusinessProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
