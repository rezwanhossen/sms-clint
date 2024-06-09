import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import AddUpcoming from "./AddUpcoming";

const Upcommingmeal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const axioscommon = useAxiosCommon();
  const { data: upcommingmeals = [], isLoading } = useQuery({
    queryKey: ["upcommingmeals"],
    queryFn: async () => {
      const { data } = await axioscommon.get("/upcommingmeals");
      return data;
    },
  });

  const handelPublic = (upcom) => {
    console.log(upcom);
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
        <AddUpcoming isOpen={isOpen} setisOpen={setIsOpen}></AddUpcoming>
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
