import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";

const ServicMeal = () => {
  const axioscommon = useAxiosCommon();
  const axiosSec = useAxiosSecqur();
  const {
    data: requst = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requst"],
    queryFn: async () => {
      const { data } = await axiosSec.get("/allrequstmeal");
      return data;
    },
  });
  const handelServe = async (id, status) => {
    const res = await axioscommon.patch(`/requstmealsata/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      toast.success("requst delivered succesfully!");
    }

    refetch();
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold">All Requst meal</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Email</th>
              <th>Name</th>
              <th>status</th>
              <th>serve</th>
            </tr>
          </thead>
          <tbody>
            {requst.map((req, inx) => (
              <tr key={req._id}>
                <th>{inx + 1}</th>
                <td>{req?.title} </td>
                <td>{req?.userEmail}</td>
                <td>{req?.user}</td>
                <td>{req?.status}</td>
                <td>
                  <button
                    onClick={() => handelServe(req._id, "delivered")}
                    className="btn btn-outline btn-primary"
                  >
                    serve
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

export default ServicMeal;
