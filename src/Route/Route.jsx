import { createBrowserRouter } from "react-router-dom";
import PrivateRout from "../Componente/Firbase/PrivateRout";
import Home from "../Componente/Home";
import Login from "../Componente/LoginReg/Login";
import Register from "../Componente/LoginReg/Register";
import Meals from "../Componente/Meals/Meals";
import Addmeal from "../Dashbord/AdminPages/Addmeal";
import AdminProfil from "../Dashbord/AdminPages/AdminProfil";
import AllMeals from "../Dashbord/AdminPages/AllMeals";
import Allusers from "../Dashbord/AdminPages/Allusers";
import Upcommingmeal from "../Dashbord/AdminPages/Upcommingmeal";
import ViewDeteal from "../Dashbord/AdminPages/ViewDeteal";
import UserProfil from "../Dashbord/UserProfil";
import ErrorPage from "../Pages/ErrorPage";
import UpcomMeal from "../Pages/Home/UpcomMeal";
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
      {
        path: "/upcommeal",
        element: (
          <PrivateRout>
            {" "}
            <UpcomMeal></UpcomMeal>
          </PrivateRout>
        ),
      },
    ],
  },
  {
    path: "dashbord",
    element: (
      <PrivateRout>
        <Dashboard></Dashboard>
      </PrivateRout>
    ),
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
      {
        path: "upcommingmeal",
        element: <Upcommingmeal></Upcommingmeal>,
      },
      {
        path: "allmeals",
        element: <AllMeals></AllMeals>,
      },
      {
        path: "vievdetial/:id",
        element: <ViewDeteal></ViewDeteal>,
      },
      {
        path: "adminProfil",
        element: <AdminProfil></AdminProfil>,
      },
    ],
  },
]);
export default router;
