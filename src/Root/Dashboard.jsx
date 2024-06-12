import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import logo from "../assets/logos.png";
import { GoHome } from "react-icons/go";
import { MdNoMeals } from "react-icons/md";
import { FaExchangeAlt, FaUser } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { IoBagAdd } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className=" md:flex">
      {/* side bar */}
      <div className="  md:w-64 min-h-screen bg-orange-500">
        <ul className=" menu space-y-3 text-md md:text-xl font-bold">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashbord/adminHome">
                  <img src={logo} alt="" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/adminProfil">
                  <FaUser /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/addmeal">
                  <IoBagAdd /> Add Meal
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/allmeals">
                  <GiHotMeal /> All Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/allreviews">
                  <MdReviews /> All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/servicmeal">
                  <FaCheckSquare /> Serve Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/upcommingmeal">
                  <FaExchangeAlt />
                  Upcoming Meals
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <NavLink to="/dashbord/userHome">
                <img src={logo} alt="" />
              </NavLink>
              <li>
                <NavLink to="/dashbord/userpro">
                  <FaUser></FaUser> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/userRequstMeal">
                  <FaCodePullRequest /> Requested Meals
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/myReview">
                  <MdReviews /> My Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/paymenthistory">
                  <MdPayment /> Payment History
                </NavLink>
              </li>
            </>
          )}
          <div className=" divider"></div>
          <li>
            <NavLink to="/">
              <GoHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/meals">
              <MdNoMeals /> Meals
            </NavLink>
          </li>
          <li>
            <NavLink to="/upcommeal">
              <FaExchangeAlt /> Upcoming Meals
            </NavLink>
          </li>
        </ul>
      </div>
      {/* outlet */}
      <div className=" flex-1 ">
        <div className=" p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
