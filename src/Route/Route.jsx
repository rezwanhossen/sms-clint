import { createBrowserRouter } from "react-router-dom";
import Home from "../Componente/Home";
import Login from "../Componente/LoginReg/Login";
import Register from "../Componente/LoginReg/Register";
import Meals from "../Componente/Meals/Meals";
import Addmeal from "../Dashbord/AdminPages/Addmeal";
import Allusers from "../Dashbord/AdminPages/Allusers";
import UserProfil from "../Dashbord/UserProfil";
import ErrorPage from "../Pages/ErrorPage";
import Dashboard from "../Root/Dashboard";
import Root from "../Root/Root";
import MealsDetails from "../Sheare/MealsDetails";

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
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/mealdetail/:id",
        element: <MealsDetails></MealsDetails>,
      },
    ],
  },
  {
    path: "dashbord",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "userpro",
        element: <UserProfil></UserProfil>,
      },
      //admin route
      {
        path: "users",
        element: <Allusers></Allusers>,
      },
      {
        path: "addmeal",
        element: <Addmeal></Addmeal>,
      },
    ],
  },
]);
export default router;
