import { useQuery } from "@tanstack/react-query";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Allusers = () => {
  const asioxSec = useAxiosSecqur();
  const [search, setsearch] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const { data } = await asioxSec.get(`/all-users?search=${search}`);
      return data;
    },
  });

  const handelrol = (id) => {
    asioxSec.patch(`/users/admin/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "is admin now",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handelsearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setsearch(text);
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div>
      <div className=" md:flex justify-between">
        <h2 className="text-3xl">All users</h2>

        <h2 className="text-3xl">Total user {users.length}</h2>
      </div>
      <div className=" bg-slate-200 p-4 my-6 rouned-md shadow-md ">
        <form onSubmit={handelsearch} className="flex gap-2">
          <input
            type="text"
            className=" input input-disabled"
            name="search"
            placeholder="type meal title.."
            id=""
          />
          <input
            type="submit"
            className="btn btn-outline btn-primary"
            value="Search"
          />
        </form>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>subscription status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, inx) => (
                <tr key={user._id}>
                  <th>{inx + 1}</th>
                  <td>{user.name} </td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        className="btn"
                        onClick={() => handelrol(user._id)}
                      >
                        <FaUser></FaUser>
                      </button>
                    )}
                  </td>
                  <td>{user.badge} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
