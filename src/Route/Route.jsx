import { createBrowserRouter } from "react-router-dom";
import Login from "../Componente/LoginReg/Login";
import ErrorPage from "../Pages/ErrorPage";
import Root from "../Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {},
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
export default router;
