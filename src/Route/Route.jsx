import { createBrowserRouter } from "react-router-dom";
import Home from "../Componente/Home";
import Login from "../Componente/LoginReg/Login";
import Register from "../Componente/LoginReg/Register";
import ErrorPage from "../Pages/ErrorPage";
import Root from "../Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
export default router;
