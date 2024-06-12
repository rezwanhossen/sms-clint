import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LogingSpiner from "./LogingSpiner";
import { AiFillLike } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
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

  // const { data: useron = {} } = useQuery({
  //   queryKey: ["useron", user?.email],
  //   queryFn: async () => {
  //     const { data } = await axioscommon.get(`/useron/${user.email}`);
  //     return data;
  //   },
  // });

  const { data: payment = {} } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/payment/${user.email}`);
      return data;
    },
  });

  const { data: reviews = [], refetch: revrefetch } = useQuery({
    queryKey: ["reviews", meal._id],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/reviews/${meal._id}`);
      return data;
    },
  });
  // console.log(reviews);

  const handelRequest = async (meal, payment) => {
    if (
      user &&
      (payment.badge == "silver" ||
        payment.badge == "gold" ||
        payment.badge == "Platinum")
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
      refetch();
    } else {
      toast.error("you are not buy Membership pakag ");
    }
  };

  const addreviews = async (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const mealtitle = meal.title;
    const likes = 0;
    const mealid = meal._id;
    const email = user?.email;
    const name = user?.displayName;
    const reviews = {
      mealid,
      mealtitle,
      likes,
      review,
      email,
      name,
    };
    if (user) {
      const res = await axioscommon.post("/reviews", reviews);
      if (res.data.insertedId) {
        toast.success("revies successfilly !");
      }
      const reviecCount = reviews?.length + 1;
      axioscommon.patch(`/reviusCount/${meal._id}`, {
        reviecCount: reviecCount,
      });

      revrefetch();
    } else {
      naviget("/login");
    }
  };

  const handelrevewlike = async (id, like) => {
    if (user) {
      const likes = like + 1;
      const res = await axioscommon.patch(`/reviewLike/${id}`, { likes });
      revrefetch();
    } else {
      naviget("/login");
    }
  };

  // const handelClick = async (id, reviews) => {
  //   const reviecCount = reviews?.length + 1;
  //   const res = await axioscommon.patch(`/reviusCount/${id}`, {
  //     reviecCount: reviecCount,
  //   });
  //   console.log(res);
  //   refetch();
  // };

  if (isLoading) return <LogingSpiner></LogingSpiner>;

  return (
    <div className="flex justify-center my-10">
      <div className="w-full md:w-4/5 mx-auto bg-slate-300 rounded-xl shadow-xl p-7">
        <Link to="/meals" className="btn">
          <IoMdArrowRoundBack />
        </Link>
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
            <p className="text-2xl">Reviews {reviews?.length} </p>
            <div className=" divider"></div>
            <div>
              {reviews.length > 0 && (
                <div className=" mt-2 ">
                  {reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="p-2 mt-4 rounded-xl bg-slate-100 shadow-lg"
                    >
                      <p>{rev?.review} </p>
                      <div className=" divider my-2"></div>
                      <div className=" flex justify-between">
                        <p>{rev?.name} </p>
                        <button
                          onClick={() => handelrevewlike(rev._id, rev?.likes)}
                          className=" btn"
                        >
                          <AiFillLike /> {rev?.likes}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              onClick={() => handelRequest(meal, payment)}
              className=" btn btn-outline btn-primary"
            >
              Meal Request
            </button>
            <div className=" my-10">
              <form onSubmit={addreviews} className=" space-y-2">
                <input
                  type="text"
                  className=" input input-bordered"
                  name="review"
                  id=""
                />
                <br />
                <input
                  //onClick={() => handelClick(meal._id, reviews)}
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
