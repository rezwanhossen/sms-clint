import { useQuery } from "@tanstack/react-query";
import { AiFillLike } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LogingSpiner from "../../Sheare/LogingSpiner";
import NoDataHeader from "../../Sheare/NoDataHeader";
import moment from "moment";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpcomMeal = () => {
  const { user } = useAuth();
  const axiosSec = useAxiosSecqur();
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
  const { data: payment = {} } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/payment/${user.email}`);
      return data;
    },
  });

  const handelLike = async (id, like, items) => {
    if (like >= 10) {
      const item = {
        title: items?.title,
        catagory: items?.catagory,
        price: parseFloat(items?.price),
        rating: parseFloat(items?.rating),
        likes: items?.likes,
        image: items?.image,
        post_time: moment().format("LLLL"),
        ingredients: items?.ingredients,
        description: items?.description,
        admin_name: items?.admin_name,
        email: items?.email,
      };
      const res = await axiosSec.delete(`/upcommingmeals/${id}`);
      const posts = await axiosSec.post("/addmeals", item);
      if (posts.data.insertedId) {
        toast.success("publish successfully !");
      }
    }
    const likes = like + 1;
    const res = await axioscommon.patch(`/upcommingm/${id}`, { likes });
    refetch();
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div classname="my-10">
      <Helmet>
        <title>All Upcomming Meals</title>
      </Helmet>
      {payment.badge == "silver" ||
      payment.badge == "gold" ||
      payment.badge == "Platinum" ||
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
                      onClick={() =>
                        handelLike(items?._id, items?.likes, items)
                      }
                      className="btn"
                    >
                      <AiFillLike />
                    </button>
                    {items?.likes}
                  </p>
                </div>
                <h2 className="text-2xl font-bold">{items?.title} </h2>
                <p>{items?.description.slice(0, 50)}.... </p>
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
