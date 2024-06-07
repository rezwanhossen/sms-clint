import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import MealsCard from "../../Sheare/MealsCard";

const Meals = () => {
  const [pag, setpag] = useState(1);
  const axioscommon = useAxiosCommon();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await axioscommon.get("/meals");
      return data;
    },
  });
  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div>
      <div className="mt-5 bg-lime-600 p-4 space-y-3 md:flex  justify-between items-center">
        <form className="flex gap-2">
          <input type="text" className=" input input-disabled" name="" id="" />
          <input
            type="submit"
            className="btn btn-outline btn-primary"
            value="Search"
          />
        </form>
        <div className=" ">
          <button className=" btn mr-3">catagory</button>
          <button className=" btn">price</button>
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={meals.length}
          next={() => setpag(pag + 1)}
          hasMore={true}
        >
          <div className="grid md:grid-cols-3 gap-3">
            {meals.map((items) => (
              <MealsCard key={items._id} items={items}></MealsCard>
            ))}
          </div>
          {isLoading && <LogingSpiner></LogingSpiner>}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Meals;
