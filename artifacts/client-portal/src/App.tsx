import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { SubmitRequest } from "@/pages/submit-request";
import { TrackLookup } from "@/pages/track-lookup";
import { ProjectView } from "@/pages/project-view";
import { AdminDashboard } from "@/pages/admin-dashboard";
import { PrivacyPolicy } from "@/pages/privacy-policy";
import { TermsOfService } from "@/pages/terms-of-service";
import { About } from "@/pages/about";
import { Blog } from "@/pages/blog";
import { Contact } from "@/pages/contact";
import { ServicePage } from "@/pages/service-page";
import { ContactModalProvider } from "@/context/contact-modal-context";
import { ContactModal } from "@/components/contact-modal";
import { ScrollToTop } from "@/components/scroll-to-top";
import { RequireAuth } from "@/components/require-auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      {/* Home / login page — full dark standalone, no shared layout */}
      <Route path="/" component={Home} />

      {/* All other pages use the shared layout with header */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/submit">
              <RequireAuth><SubmitRequest /></RequireAuth>
            </Route>
            <Route path="/track">
              <RequireAuth><TrackLookup /></RequireAuth>
            </Route>
            <Route path="/track/:id" component={() => <RequireAuth><ProjectView /></RequireAuth>} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route path="/services/:slug" component={ServicePage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContactModalProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <ContactModal />
          <Toaster />
        </ContactModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
