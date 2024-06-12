import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";
import { Helmet } from "react-helmet-async";

const AllReviews = () => {
  const axiosSec = useAxiosSecqur();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSec.get("/reviews");
      return data;
    },
  });
  const handeldelet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you deleted thid item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSec.delete(`/review/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("deleted successfully !");
        }
      }
      refetch();
    });
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div>
      <Helmet>
        <title>Admin || All Reviews </title>
      </Helmet>
      <div className="md:flex justify-around">
        <h2 className="text-3xl hont-bold">All Reviews</h2>
        <h2 className="text-3xl hont-bold">
          Total Reviews :({reviews.length})
        </h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table overflow-x-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Review</th>
                <th>Action</th>
                <th>Meal</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((meal, inx) => (
                <tr key={meal._id}>
                  <th>{inx + 1} </th>
                  <td>{meal.mealtitle}</td>
                  <td>{meal.likes}</td>
                  <td>{meal.review}</td>
                  {/* <td>{meal.name}</td> */}
                  <td className=" flex gap-2">
                    <button
                      onClick={() => handeldelet(meal._id)}
                      className="btn"
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-primary">
                      view meal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
