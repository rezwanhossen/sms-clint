import { useForm } from "react-hook-form";
import moment from "moment";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LogingSpiner from "../../Sheare/LogingSpiner";
import toast from "react-hot-toast";
const imgHosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMGBB_key
}`;

const Updatemeaks = () => {
  const axiosSec = useAxiosSecqur();
  const axiospub = useAxiosCommon();
  const { id } = useParams();
  const {
    data: meal = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const { data } = await axiospub.get(`/meal/${id}`);
      return data;
    },
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const {
      title,
      catagory,
      price,
      rating,
      likes,
      itm1,
      itm2,
      itm3,
      itm4,
      image,
      description,
    } = data;

    const imageFile = { image: data.image[0] };
    const res = await axiospub.post(imgHosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const mealItem = {
        title,
        catagory,
        price: parseFloat(price),
        rating: parseFloat(rating),
        likes: parseFloat(likes),
        ingredients: { itm1, itm2, itm3, itm4 },
        image: res.data.data.display_url,
        description,
        post_time: moment().format("LLLL"),
      };
    //   const menuRes = await axiosSec.put(`/updatemeals/${id}`, mealItem);
    //   console.log(mealItem);
      
      refetch();
    }
  };

  if (isLoading) return <LogingSpiner></LogingSpiner>;
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold my-5 text-center">Add Meal</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label>Meal Title</label>
              <input
                type="text"
                className=" input input-disabled w-full"
                name=""
                defaultValue={meal.title}
                {...register("title")}
                id=""
              />
            </div>

            <div>
              <label>Catagory</label>
              <select
                className=" input input-disabled w-full"
                id="meal"
                name="catagory"
                defaultValue={meal.catagory}
                {...register("catagory")}
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <div>
              <label>Meal Price</label>
              <input
                type="number"
                className=" input input-disabled w-full"
                name="price"
                defaultValue={meal.price}
                {...register("price")}
                id=""
              />
            </div>

            <div>
              <label>Meal Rating</label>
              <input
                type="number"
                className=" input input-disabled w-full"
                name="rating"
                defaultValue={meal.rating}
                {...register("rating")}
                id=""
              />
            </div>

            <div>
              <label>Meal likes</label>
              <input
                type="number"
                className=" input input-disabled w-full"
                name=" likes"
                defaultValue={meal.likes}
                {...register("likes")}
                id=""
              />
            </div>

            <div>
              <label>ingredients</label>
              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  className=" input input-disabled w-full"
                  name=" itm1"
                  defaultValue={meal.ingredients.itm1}
                  {...register("itm1")}
                  id=""
                  required
                />
                <input
                  type="text"
                  className=" input input-disabled w-full"
                  name=" itm2"
                  defaultValue={meal.ingredients.itm2}
                  {...register("itm2")}
                  id=""
                />
                <input
                  type="text"
                  className=" input input-disabled w-full"
                  defaultValue={meal.ingredients.itm3}
                  name=" itm3"
                  {...register("itm3")}
                  id=""
                />
                <input
                  type="text"
                  className=" input input-disabled w-full"
                  defaultValue={meal.ingredients.itm4}
                  name=" itm4"
                  {...register("itm4")}
                  id=""
                />
              </div>
            </div>

            <div>
              <img className="w-14 h-14" src={meal.image} alt="" />
              <input
                type="file"
                className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                {...register("image")}
              />
            </div>
          </div>
          <div>
            <label>description </label>
            <textarea
              className=" input input-disabled w-full"
              name=""
              {...register("description")}
              defaultValue={meal.description}
              id=""
              cols="30"
              rows="50"
            ></textarea>
          </div>
          <input
            className=" btn btn-primary w-full"
            type="submit"
            disabled
            value="Add Meal"
          />
        </form>
      </div>
    </div>
  );
};

export default Updatemeaks;
