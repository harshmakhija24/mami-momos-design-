/** Rajasthan Atelier Archive, simplified: minimal project navigation with a clear library-to-detail journey. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { ProjectDetail } from "./pages/Home";

function App() {
  const routerBase = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router base={routerBase}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/project/:id">{({ id }) => <ProjectDetail projectId={id} />}</Route>
              <Route><Redirect to="/" /></Route>
            </Switch>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
