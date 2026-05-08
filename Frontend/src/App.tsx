import { Route, Router as WouterRouter, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Scoreboard from "@/pages/Scoreboard";
import History from "@/pages/History";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./components/MotionWrappers";
import Tournaments from "@/pages/Tournaments";
import TournamentDetails from "@/pages/TournamentDetails";
import LiveCourts from "@/pages/LiveCourts";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/">
          <PageTransition>
            <Landing />
          </PageTransition>
        </Route>
        <Route path="/login">
          <PageTransition>
            <Login />
          </PageTransition>
        </Route>
        <Route path="/register">
          <PageTransition>
            <Register />
          </PageTransition>
        </Route>
        <Route path="/dashboard">
          <PageTransition>
            <ProtectedRoute component={Dashboard} />
          </PageTransition>
        </Route>
        <Route path="/tournaments">
          <PageTransition>
            <ProtectedRoute component={Tournaments} />
          </PageTransition>
        </Route>
        <Route path="/tournaments/:id">
          <PageTransition>
            <ProtectedRoute component={TournamentDetails} />
          </PageTransition>
        </Route>
        <Route path="/courts">
          <PageTransition>
            <ProtectedRoute component={LiveCourts} />
          </PageTransition>
        </Route>
        <Route path="/setup">
          <PageTransition>
            <ProtectedRoute component={Home} />
          </PageTransition>
        </Route>
        <Route path="/scoreboard">
          <PageTransition>
            <ProtectedRoute component={Scoreboard} />
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
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base="/">
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
