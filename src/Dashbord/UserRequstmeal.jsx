import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
// import useAxiosCommon from "../Hooks/useAxiosCommon";
import useAxiosSecqur from "../Hooks/useAxiosSecqur";
import LogingSpiner from "../Sheare/LogingSpiner";

const UserRequstmeal = () => {
  const { user } = useAuth();
  //   const axioscom = useAxiosCommon();
  const axiosSec = useAxiosSecqur();
  const {
    data: requst = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requst", user?.email],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/requstmeal?email=${user.email}`);
      return data;
    },
  });
  const handelCansel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you punlish thid item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Publish!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axioscom.delete(`/requstmeal/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("cancel sucessifully");
        }
      }
      refetch();
    });
  };
  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div>
      <h2 className="text-3xl font-bold"> Requsted meals</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requst.map((req, inx) => (
              <tr key={req._id}>
                <th>{inx + 1}</th>
                <td>{req?.title} </td>
                <td>{req?.likes}</td>
                <td>reviews</td>
                <td>
                  <p
                    className={` p-1 rounded-lg text-center ${
                      req.status === " pending" && " bg-red-600 text-white"
                    } ${
                      req.status === "delivered" && " bg-green-600 text-white"
                    }`}
                  >
                    {req?.status}
                  </p>{" "}
                </td>
                <td>
                  <button
                    onClick={() => handelCansel(req._id)}
                    className=" btn "
                  >
                    <span className=" text-red">x</span> cancel{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequstmeal;
