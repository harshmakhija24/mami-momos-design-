/** Rajasthan Atelier Archive, simplified: minimal project navigation with a clear library-to-detail journey. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { ProjectDetail } from "./pages/Home";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router hook={useHashLocation}>
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
