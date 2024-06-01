import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navbarsItem = (
    <>
      <li>
        <NavLink to="/">Item 1</NavLink>
      </li>

      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar">
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
          <Link to="/login" className=" btn btn-outline btn-primary">
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
