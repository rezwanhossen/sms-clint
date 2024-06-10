import { useQuery } from "@tanstack/react-query";
import { AiFillLike } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import NoDataHeader from "../../Sheare/NoDataHeader";

const UpcomMeal = () => {
  const { user } = useAuth();
  const axioscommon = useAxiosCommon();
  const {
    data: upcommingm = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upcommingmeals"],
    queryFn: async () => {
      const { data } = await axioscommon.get("/upcommingmeals");
      return data;
    },
  });

  const { data: useron = {} } = useQuery({
    queryKey: ["useron", user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/useron/${user.email}`);
      return data;
    },
  });

  const handelLike = async (id, like) => {
    const likes = like + 1;
    const res = await axioscommon.patch(`/upcommingm/${id}`, { likes });
    refetch();
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div classname="my-10">
      {useron.badge == "silver" ||
      useron.badge == "gold" ||
      useron.badge == "platinum" ||
      useron.role == "admin" ? (
        <>
          <div className="grid md:grid-cols-3 gap-3">
            {upcommingm.map((items) => (
              <div key={items._id} className=" p-4 space-y-2">
                <img className=" w-full h-[250px]" src={items?.image} alt="" />
                <div className="flex justify-between text-2xl font-bolf">
                  <p>${items?.price} </p>
                  <p className=" flex items-center">
                    <button
                      onClick={() => handelLike(items?._id, items?.likes)}
                      className="btn"
                    >
                      <AiFillLike />
                    </button>
                    {items?.likes}
                  </p>
                </div>
                <h2 className="text-2xl font-bold">{items?.title} </h2>
                <p>{items?.description} </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <NoDataHeader
            head={"You are not premium"}
            subhead={"please take a  premium packages"}
          ></NoDataHeader>
        </>
      )}
      {/* <div className="grid md:grid-cols-3 gap-3">
        {upcommingm.map((items) => (
          <div key={items._id} className=" p-4 space-y-2">
            <img className=" w-full h-[250px]" src={items?.image} alt="" />
            <div className="flex justify-between text-2xl font-bolf">
              <p>${items?.price} </p>
              <p className=" flex items-center">
                <button
                  onClick={() => handelLike(items?._id, items?.likes)}
                  className="btn"
                >
                  <AiFillLike />
                </button>
                {items?.likes}
              </p>
            </div>
            <h2 className="text-2xl font-bold">{items?.title} </h2>
            <p>{items?.description} </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default UpcomMeal;
