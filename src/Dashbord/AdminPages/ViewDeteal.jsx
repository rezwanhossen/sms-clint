import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import { IoMdArrowRoundBack } from "react-icons/io";

const ViewDeteal = () => {
  const { id } = useParams();
  const axiosSeequr = useAxiosCommon();
  const { data: meal = [], isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiosSeequr.get(`/meal/${id}`);
      return data;
    },
  });

  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div className=" flex justify-center">
      <div className=" md:w-2/3 mx-auto bg-slate-300 rounded-xl shadow-xl p-7">
        <div className=" p-1">
          <Link to="/dashbord/allmeals" className=" btn">
            <IoMdArrowRoundBack />
          </Link>
        </div>
        <div className="md:flex gap-3">
          <div className=" flex-1 space-y-3">
            <h2 className="text-2xl font-bold">{meal.title} </h2>
            <img className=" w-full" src={meal.image} alt="" />
            <div className=" flex justify-between">
              <p>Likes : {meal.likes} </p>
              <p>Price : ${meal.price} </p>
            </div>
          </div>
          <div className=" flex-1 space-y-3 border-1 p-2">
            <p> {meal.post_time}</p>
            <p> {meal.description}</p>
            <p>rating: {meal.rating}</p>
            <p>
              ingredients:
              <li>{meal.ingredients?.itm1}</li>
              <li>{meal.ingredients?.itm2}</li>
              <li>{meal.ingredients?.itm3}</li>
              <li>{meal.ingredients?.itm4}</li>
              {/* {meal.ingredients.map((itm, inx) => (
                <li key={inx}>{itm} </li>
              ))} */}
            </p>
            <p>Proviser: {meal.admin_name}</p>
            <p>Email: {meal.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeteal;
