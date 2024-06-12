import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
// import { useMemo } from "react";

const AllMeals = () => {
  const axioscommon = useAxiosCommon();
  const axiosSec = useAxiosSecqur();
  const [sortByLikes, setSortByLikes] = useState(false);

  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axioscommon.get("/meals");
      return sortByLikes ? data.sort((a, b) => b.likes - a.likes) : data;
    },
  });

  // const { data: reviews = [], isLoading: loding } = useQuery({
  //   queryKey: ["reviews"],
  //   queryFn: async () => {
  //     const { data } = await axiosSec.get("/reviews");
  //     return data;
  //   },
  // });

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
        const res = await axiosSec.delete(`/mealdelet/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("deleted successfully !");
        }
      }
      refetch();
    });
  };
  const handleSortByLikes = () => {
    setSortByLikes(true);
    refetch();
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table overflow-x-auto">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>
                <button className="btn" onClick={handleSortByLikes}>
                  Likes
                </button>{" "}
              </th>
              <th>Distributor Name</th>
              <th>Action</th>
              <th>Detail button</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, inx) => (
              <tr key={meal._id}>
                <th>{inx + 1} </th>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>{meal.admin_name}</td>
                <td className=" flex gap-2">
                  <button onClick={() => handeldelet(meal._id)} className="btn">
                    <MdDelete></MdDelete>{" "}
                  </button>
                  <Link to={`/dashbord/updatemeal/${meal._id}`} className="btn">
                    <FaEdit />{" "}
                  </Link>
                </td>
                <td>
                  <Link to={`/dashbord/vievdetial/${meal._id}`}>
                    <button className="btn btn-outline btn-primary">
                      View Deatils
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMeals;
