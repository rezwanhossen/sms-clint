import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Route/Route.jsx";
import AuthProvider from "./Componente/Firbase/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className=" w-full md:max-w-[90%] mx-auto">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
