import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Social from "./Social";
import { ImSpinner9 } from "react-icons/im";

const Register = () => {
  const naviget = useNavigate();
  const { creatuser, updatprofil, loding, setloding } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imgfile = { image: data.image[0] };
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_key}`,
        imgfile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await creatuser(email, password);
      await updatprofil(name, data.data.display_url);
      naviget("/");
      toast("Sign up Successful !");
    } catch (error) {
      setloding(false);
      toast(error.message);
    }
  };
  return (
    <div>
      <div className=" w-full md:w-3/6 mx-auto">
        <h1 className="text-3xl font-bold text-center">Register Pleace</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-5">
          <div>
            <input
              type="text"
              className=" input input-bordered w-full"
              placeholder="Enter your Name"
              name="name"
              {...register("name")}
              required
              id=""
            />
          </div>
          <br />
          <div>
            <label> Your photo : </label>

            <input
              type="file"
              {...register("image")}
              required
              name="image"
              id=""
            />
          </div>
          <br />
          <div>
            <input
              type="email"
              className=" input input-bordered w-full"
              placeholder="Enter your email Adderss"
              name="email"
              {...register("email")}
              required
              id=""
            />
          </div>
          <br />
          <div>
            <input
              type="password"
              className=" input input-bordered w-full"
              placeholder="Enter your password"
              name="password"
              {...register("password")}
              required
              id=""
            />
          </div>
          <br />
          <input
            type="submit"
            className=" btn btn-outline btn-primary w-full"
            value={loding ? "Please wait" : "Register"}
            disabled={loding}
          />
        </form>
        <p className=" text-center mt-2">
          your have an account pleace !
          <Link to="/login" className=" text-green-700 hover:underline">
            Login
          </Link>
        </p>
        <Social></Social>
      </div>
    </div>
  );
};

export default Register;
