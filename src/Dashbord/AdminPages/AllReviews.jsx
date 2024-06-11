import { useQuery } from "@tanstack/react-query";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import LogingSpiner from "../../Sheare/LogingSpiner";

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
  console.log(reviews);
  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div>
      <div className="md:flex justify-around">
        <h2 className="text-3xl hont-bold">All Reviews</h2>
        <h2 className="text-3xl hont-bold">
          Total Reviews :({reviews.length} ){" "}
        </h2>
      </div>
    </div>
  );
};

export default AllReviews;
