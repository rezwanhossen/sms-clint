import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import MealsCard from "../../Sheare/MealsCard";

const Meals = () => {
  const [filter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [pag, setpag] = useState(1);
  const axioscommon = useAxiosCommon();
  const {
    data: meals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meals", filter, search],
    queryFn: async () => {
      const { data } = await axioscommon.get(
        `/meals?filter=${filter}&search=${search}`
      );
      return data;
    },
  });

  const handelsearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };
  console.log(search);

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div>
      <div className="mt-5 bg-lime-600 p-4 space-y-3 md:flex  justify-between items-center">
        <form onSubmit={handelsearch} className="flex gap-2">
          <input
            type="text"
            className=" input input-disabled"
            name="search"
            id=""
          />
          <input
            type="submit"
            className="btn btn-outline btn-primary"
            value="Search"
          />
        </form>
        <div className=" ">
          <select
            className="select select-bordered"
            onChange={(e) => setCategoryFilter(e.target.value)} //}{handleCategoryFilter}
            value={filter}
          >
            <option value="">All Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          {/* <details className="dropdown">
            <summary className="m-1 btn">open or close</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <button onClick={() => handlePriceRangeFilter(10, 50)}>
                  $10-$50
                </button>
              </li>
              <li>
                <button onClick={() => handlePriceRangeFilter(51, 150)}>
                  $51-$150
                </button>
              </li>
            </ul>
          </details> */}
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
