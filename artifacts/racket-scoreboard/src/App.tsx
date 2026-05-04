import { Route, Router as WouterRouter, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Scoreboard from "@/pages/Scoreboard";
import History from "@/pages/History";

const queryClient = new QueryClient();

import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/MotionWrappers";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/">
          <PageTransition>
            <Landing />
          </PageTransition>
        </Route>
        <Route path="/setup">
          <PageTransition>
            <Home />
          </PageTransition>
        </Route>
        <Route path="/scoreboard">
          <PageTransition>
            <Scoreboard />
          </PageTransition>
        </Route>
        <Route path="/history">
          <PageTransition>
            <History />
          </PageTransition>
        </Route>
        <Route>
          <PageTransition>
            <NotFound />
          </PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
