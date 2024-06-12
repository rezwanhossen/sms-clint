import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecqur from "../../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../../Sheare/LogingSpiner";
import { BsFillCalendarEventFill } from "react-icons/bs";
// import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdNoMeals } from "react-icons/md";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSeequr = useAxiosSecqur();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-state"],
    queryFn: async () => {
      const { data } = await axiosSeequr.get("/admin-state");
      return data;
    },
  });

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div>
      <h2 className="text-2xl font-bold">
        hi, Welcome{" "}
        <span>{user?.displayName ? user?.displayName : "Back"} </span>
      </h2>

      <div className="my-5">
        <div className="grid grid-cols-2  md:grid-cols-3 gap-4 shadow">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-5xl text-secondary">
                <BsFillCalendarEventFill />
              </div>
              <div className="stat-title text-xl">Total Revenue</div>
              <div className="stat-value">$ {stats.revenue}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-5xl text-secondary">
                <FaUsers></FaUsers>
              </div>
              <div className="stat-title text-xl">Total Users</div>
              <div className="stat-value">{stats.users}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-5xl text-secondary">
                <FaUsers></FaUsers>
              </div>
              <div className="stat-title text-xl">SuscribMember</div>
              <div className="stat-value">{stats.suscribMember}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-5xl text-secondary">
                <MdOutlineRateReview />
              </div>
              <div className="stat-title text-xl">Total review</div>
              <div className="stat-value"> {stats.review}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-5xl text-secondary">
                <MdNoMeals />
              </div>
              <div className="stat-title text-xl">totalmeals</div>
              <div className="stat-value">{stats.totalmeals}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-5xl text-secondary">
                <MdOutlineBorderColor></MdOutlineBorderColor>
              </div>
              <div className="stat-title text-xl">Total Orders</div>
              <div className="stat-value">{stats.Orders}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
