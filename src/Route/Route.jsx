import { createBrowserRouter } from "react-router-dom";
import Adminrouter from "../Componente/Firbase/Adminrouter";
import PrivateRout from "../Componente/Firbase/PrivateRout";
import Home from "../Componente/Home";
import Login from "../Componente/LoginReg/Login";
import Register from "../Componente/LoginReg/Register";
import Meals from "../Componente/Meals/Meals";
import Addmeal from "../Dashbord/AdminPages/Addmeal";
import AdminHome from "../Dashbord/AdminPages/AdminHome/AdminHome";
import AdminProfil from "../Dashbord/AdminPages/AdminProfil";
import AllMeals from "../Dashbord/AdminPages/AllMeals";
import AllReviews from "../Dashbord/AdminPages/AllReviews";
import Allusers from "../Dashbord/AdminPages/Allusers";
import ServicMeal from "../Dashbord/AdminPages/ServicMeal";
import Upcommingmeal from "../Dashbord/AdminPages/Upcommingmeal";
import ViewDeteal from "../Dashbord/AdminPages/ViewDeteal";
import MyReview from "../Dashbord/MyReview";
import Payment from "../Dashbord/Payment";
import Paymenthistory from "../Dashbord/Paymenthistory";
import UserHome from "../Dashbord/UserHome/UserHome";
import UserProfil from "../Dashbord/UserProfil";
import UserRequstmeal from "../Dashbord/UserRequstmeal";
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
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "userpro",
        element: <UserProfil></UserProfil>,
      },
      {
        path: "userRequstMeal",
        element: <UserRequstmeal></UserRequstmeal>,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
      {
        path: "paymenthistory",
        element: <Paymenthistory></Paymenthistory>,
      },
      {
        path: "myReview",
        element: <MyReview />,
      },
      //admin route
      {
        path: "adminHome",
        element: (
          <Adminrouter>
            {" "}
            <AdminHome></AdminHome>
          </Adminrouter>
        ),
      },
      {
        path: "users",
        element: (
          <Adminrouter>
            {" "}
            <Allusers></Allusers>
          </Adminrouter>
        ), //<Adminrouter></Adminrouter>
      },

      {
        path: "addmeal",
        element: (
          <Adminrouter>
            <Addmeal></Addmeal>
          </Adminrouter>
        ),
      },
      {
        path: "upcommingmeal",
        element: (
          <Adminrouter>
            <Upcommingmeal></Upcommingmeal>
          </Adminrouter>
        ),
      },
      {
        path: "allmeals",
        element: (
          <Adminrouter>
            <AllMeals></AllMeals>
          </Adminrouter>
        ),
      },
      {
        path: "vievdetial/:id",
        element: (
          <Adminrouter>
            <ViewDeteal></ViewDeteal>
          </Adminrouter>
        ),
      },
      {
        path: "adminProfil",
        element: (
          <Adminrouter>
            <AdminProfil></AdminProfil>
          </Adminrouter>
        ),
      },
      {
        path: "servicmeal",
        element: (
          <Adminrouter>
            <ServicMeal></ServicMeal>
          </Adminrouter>
        ),
      },
      {
        path: "allreviews",
        element: (
          <Adminrouter>
            <AllReviews></AllReviews>
          </Adminrouter>
        ),
      },
    ],
  },
]);
export default router;
