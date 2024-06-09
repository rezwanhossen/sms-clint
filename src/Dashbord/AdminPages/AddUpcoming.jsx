import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
const imgHosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMGBB_key
}`;
const AddUpcoming = ({ isOpen, setisOpen }) => {
  const { user } = useAuth();
  const axiosPub = useAxiosCommon();
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
    const res = await axiosPub.post(imgHosting_api, imageFile, {
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
        ingredients: [itm1, itm2, itm3, itm4],
        image: res.data.data.display_url,
        description,
        admin_name: user?.displayName,
        email: user?.email,
      };
      const menuRes = await axiosSec.post("/upcommingmeals", mealItem);

      if (menuRes.data.insertedId) {
        toast.success("add upcomming meal successfully !");
      }
    }
  };
  return (
    <div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          onClose={() => setisOpen(false)}
          className="relative z-5 focus:outline-none"
        >
          <div className="fixed inset-0 z-5 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-3xl font-mediu">
                    Add Upcomming Meal
                  </DialogTitle>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <div>
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
                              {...register("itm3")}
                              id=""
                            />
                            <input
                              type="text"
                              className=" input input-disabled w-full"
                              name=" itm4"
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
                        onClick={() => setisOpen(false)}
                        value="Add upcomming Meal"
                      />
                    </div>
                  </form>

                  {/* <div className="mt-4">
                    <Button
                      onClick={() => setisOpen(false)}
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      Add meals
                    </Button>
                  </div> */}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddUpcoming;
