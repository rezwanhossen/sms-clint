import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";
import AddUpcoming from "./AddUpcoming";

const Upcommingmeal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const axioscommon = useAxiosCommon();
  const axiosSec = useAxiosSecqur();
  const {
    data: upcommingmeals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcommingmeals"],
    queryFn: async () => {
      const { data } = await axioscommon.get("/upcommingmeals");
      return data;
    },
  });

  const handelPublic = (upcom) => {
    const items = {
      title: upcom?.title,
      catagory: upcom?.catagory,
      price: parseFloat(upcom?.price),
      rating: parseFloat(upcom?.rating),
      likes: upcom?.likes,
      image: upcom?.image,
      post_time: moment().format("LLLL"),
      ingredients: upcom?.ingredients,
      description: upcom?.description,
      admin_name: upcom?.admin_name,
      email: upcom?.email,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "you punlish thid item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSec.delete(`/upcommingmeals/${upcom?._id}`);
        const posts = await axiosSec.post("/addmeals", items);
        if (posts.data.insertedId) {
          toast.success("publish successfully !");
        }
      }
      refetch();
    });
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div>
      <div className=" md:flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcomming Meals</h2>
        <div>
          <button className=" btn" onClick={() => setIsOpen(true)}>
            Add UpcommingMeal
          </button>
        </div>
      </div>
      <div>
        <AddUpcoming
          isOpen={isOpen}
          setisOpen={setIsOpen}
          refetch={refetch}
        ></AddUpcoming>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Likes</th>
                <th>Provider Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {upcommingmeals.map((upcom, inx) => (
                <tr key={upcom._id}>
                  <th>{inx + 1}</th>
                  <td>{upcom.title}</td>
                  <td>{upcom.likes} </td>
                  <td>{upcom.admin_name}</td>
                  <td>
                    <button
                      onClick={() => handelPublic(upcom)}
                      className="btn btn-outline btn-success"
                    >
                      Publish
                    </button>{" "}
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

export default Upcommingmeal;
