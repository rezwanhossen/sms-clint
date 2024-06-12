import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import { Helmet } from "react-helmet-async";

import moment from "moment";
const imgHosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMGBB_key
}`;
const Addmeal = () => {
  const { user } = useAuth();
  const axiospub = useAxiosCommon();
  const axiosSec = useAxiosSecqur();
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
        admin_name: user?.displayName,
        email: user?.email,
      };
      const menuRes = await axiosSec.post("/addmeals", mealItem);

      if (menuRes.data.insertedId) {
        toast.success("add successfully !");
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Admin || Add meals</title>
      </Helmet>
      <h2 className="text-3xl font-bold my-5 text-center">Add Meal</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label>Meal Title</label>
            <input
              type="text"
              className=" input input-disabled w-full"
              name=""
              {...register("title")}
              id=""
              required
            />
          </div>

          <div>
            <label>Catagory</label>
            <select
              className=" input input-disabled w-full"
              id="meal"
              name="catagory"
              {...register("catagory")}
              required
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
              {...register("price")}
              required
              id=""
            />
          </div>

          <div>
            <label>Meal Rating</label>
            <input
              type="number"
              required
              className=" input input-disabled w-full"
              name="rating"
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
              defaultValue={0}
              disabled
              {...register("likes")}
              required
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
                {...register("itm1")}
                id=""
                required
              />
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm2"
                required
                {...register("itm2")}
                id=""
              />
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm3"
                required
                {...register("itm3")}
                id=""
              />
              <input
                type="text"
                className=" input input-disabled w-full"
                name=" itm4"
                required
                {...register("itm4")}
                id=""
              />
            </div>
          </div>

          <div>
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
            id=""
            required
            cols="30"
            rows="50"
          ></textarea>
        </div>
        <input
          className=" btn btn-primary w-full"
          type="submit"
          value="Add Meal"
        />
      </form>
    </div>
  );
};

export default Addmeal;
