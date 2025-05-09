import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useReducedMotion } from "./hooks/use-reduced-motion";
import { AnimatePresence } from "framer-motion";
import { Cursor } from "@/components/ui/cursor";

import Home from "@/pages/Home";
import Manifesto from "@/pages/Manifesto";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/shared/Footer";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/manifesto" component={Manifesto} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const { isReducedMotion } = useReducedMotion();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className={`app-container ${isReducedMotion ? "reduced-motion" : ""}`}>
          {!isReducedMotion && <Cursor />}
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
