import { useQuery } from "@tanstack/react-query";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Allusers = () => {
  const asioxSec = useAxiosSecqur();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await asioxSec.get("/users");
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
  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div>
      <div className=" flex justify-between">
        <h2 className="text-3xl">All users</h2>
        <h2 className="text-3xl">Total user {users.length}</h2>
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
