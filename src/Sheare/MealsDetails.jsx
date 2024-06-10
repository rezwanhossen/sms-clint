import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LogingSpiner from "./LogingSpiner";
import { AiFillLike } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
const MealsDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const naviget = useNavigate();

  const axioscommon = useAxiosCommon();
  const {
    data: meal = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/meal/${id}`);
      return data;
    },
  });

  const handelLike = async (id, like) => {
    if (user) {
      const likes = like + 1;
      const res = await axioscommon.patch(`/meals/${id}`, { likes });
      refetch();
    } else {
      naviget("/login");
    }
  };

  const { data: useron = {} } = useQuery({
    queryKey: ["useron", user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/useron/${user.email}`);
      return data;
    },
  });

  const handelRequest = async (meal, useron) => {
    if (
      user &&
      (useron.badge == "silver" ||
        useron.badge == "gold" ||
        useron.badge == "platinum")
    ) {
      const requstmel = {
        title: meal?.title,
        status: " pending",
        likes: meal?.likes,
        mealId: meal?._id,
        user: user?.displayName,
        userEmail: user?.email,
      };
      const res = await axioscommon.post("/requstmeal", requstmel);
      if (res.data.insertedId) {
        toast.success("Request successfully !");
      }
    } else {
      naviget("/login");
    }
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div className="flex justify-center my-10">
      <div className=" md:w-2/3 mx-auto bg-slate-300 rounded-xl shadow-xl p-7">
        <div className=" md:flex gap-4 ">
          <div className=" flex-1 space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold">{meal.title} </h1>
            <img className=" w-full" src={meal.image} alt="" />
            <div className=" flex justify-between text-2xl">
              <p className="flex items-center ">
                <button
                  onClick={() => handelLike(meal._id, meal.likes)}
                  className="btn"
                >
                  <AiFillLike />
                </button>{" "}
                {meal.likes}
              </p>
              <p> Price : ${meal.price} </p>
            </div>
            <p>
              <b>Distributor name</b> {meal.admin_name}
            </p>
            <p className="text-2xl">Reviews</p>
            <div className=" divider"></div>
          </div>
          <div className=" flex-1 space-y-3 p-2">
            <p className="text-xl font-semibold"> {meal.post_time}</p>

            <p>
              <b>Catagory :</b> {meal.catagory}
            </p>

            <p>
              <b>rating :</b> {meal.rating}
            </p>
            <p> {meal.description}</p>
            <p>
              ingredients
              <li>{meal.ingredients?.itm1}</li>
              <li>{meal.ingredients?.itm2}</li>
              <li>{meal.ingredients?.itm3}</li>
              <li>{meal.ingredients?.itm4}</li>
              {/* {meal.ingredients.map((itm, inx) => (
                <li key={inx}> {itm}</li>
              ))} */}
            </p>
            <button
              onClick={() => handelRequest(meal, useron)}
              className=" btn btn-outline btn-primary"
            >
              Meal Request
            </button>
            <div className=" my-10">
              <form className=" space-y-2">
                <input
                  type="text"
                  className=" input input-bordered"
                  name="review"
                  id=""
                />
                <br />
                <input
                  type="submit"
                  className=" btn btn-primary btn-outline"
                  value="Add Review"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
