import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import PostAd from "@/pages/PostAd";
import Layout from "@/components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/post-ad" component={PostAd} />
        <Route path="/category/:category" component={Products} />
        <Route path="/location/:location" component={Products} />
        <Route>
          <div className="glassmorphism rounded-xl p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">۴۰۴ - صفحه پیدا نشد</h1>
            <p className="text-gray-300">صفحه مورد نظر شما یافت نشد.</p>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
