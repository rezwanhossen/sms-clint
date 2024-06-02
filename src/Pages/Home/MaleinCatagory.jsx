import { useQuery } from "@tanstack/react-query";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";

const MaleinCatagory = () => {
  const axiosSeequr = useAxiosSecqur();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axiosSeequr.get("/meals");
      return data;
    },
  });
  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return <div></div>;
};

export default MaleinCatagory;
