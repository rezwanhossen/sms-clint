import { Link, NavLink } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navbarsItem = (
    <>
      <li className="mr-2">
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="mr-2">
        <NavLink to="/meals">Meals</NavLink>
      </li>
      <li className="mr-2">
        <NavLink to="upcomming">Upcoming Meals</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar  bg-slate-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navbarsItem}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Hostel<span className=" text-rose-600">Care</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navbarsItem}</ul>
        </div>
        <div className="navbar-end">
          <div className=" flex gap-2 items-center">
            <p className="flex text-3xl text-red-500 ">
              <IoMdNotifications />
            </p>
            {user ? (
              <div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">
                    <img
                      className=" w-12 h-12 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>{user.displayName}</a>
                    </li>
                    <li>
                      <Link to="/dashbord">Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/login" className=" btn btn-outline btn-primary">
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
