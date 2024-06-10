import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className=" md:flex">
      {/* side bar */}
      <div className="  md:w-64 min-h-screen bg-orange-500">
        <ul className=" menu space-y-3">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashbord/adminProfil">Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/users">Manage Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/addmeal">Add Meal</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/allmeals">All Meals</NavLink>
              </li>
              <li>
                <NavLink>All Reviews</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/servicmeal">Serve Meals</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/upcommingmeal">Upcoming Meals</NavLink>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <NavLink to="/dashbord/userpro">My Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/userRequstMeal">Requested Meals</NavLink>
              </li>
              <li>
                <NavLink>My Reviews</NavLink>
              </li>
              <li>
                <NavLink>Payment History</NavLink>
              </li>
            </>
          )}
          <div className=" divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/meals">Meals</NavLink>
          </li>
          <li>
            <NavLink to="/upcommeal">Upcoming Meals</NavLink>
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
