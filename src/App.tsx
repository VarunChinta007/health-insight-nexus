
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EHR from "./pages/EHR";
import Diagnostics from "./pages/Diagnostics";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import HealthTips from "./pages/HealthTips";
import HealthInsights from "./pages/HealthInsights";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ehr" element={<EHR />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/health-insights" element={<HealthInsights />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/health-tips" element={<HealthTips />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
