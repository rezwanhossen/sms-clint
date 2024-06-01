import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Route/Route.jsx";
import AuthProvider from "./Componente/Firbase/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <div className=" w-full md:max-w-[90%] mx-auto">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
