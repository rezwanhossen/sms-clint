import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Route/Route.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" w-full md:max-w-[90%] mx-auto">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
