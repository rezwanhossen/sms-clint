import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LogingSpiner from "./LogingSpiner";

const MealsDetails = () => {
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
  const { _id, title, image, rating, price } = meal;
  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold">{title} </h1>
      <img className=" w-[500px]" src={image} alt="" />
    </div>
  );
};

export default MealsDetails;
