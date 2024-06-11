import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";

const PrimeMeal = () => {
  const axioscom = useAxiosCommon();
  const { data: badge = [], isLoading } = useQuery({
    queryKey: ["badge"],
    queryFn: async () => {
      const { data } = await axioscom.get("/badge");
      return data;
    },
  });
  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div className="my-20">
      <h2 className="text-3xl md:text-5xl font-bold md:ml-5">
        Membership Pakages
      </h2>
      <div className=" grid md:grid-cols-3 gap-4 mt-10">
        {badge.map((bag) => (
          <Link
            to={`/dashbord/payment/${bag._id}`}
            className=" border-2 p-3"
            key={bag._id}
          >
            <img className=" w-full h-[250px]" src={bag.badgeImg} alt="" />
            <p className="text-3xl">
              Price : $ {bag.price} <sub>/month</sub>{" "}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PrimeMeal;
