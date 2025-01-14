import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./router/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* Use the queryClient instance */}
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={Routers} />
        </HelmetProvider>
      </QueryClientProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>
);
