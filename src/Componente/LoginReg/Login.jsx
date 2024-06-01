import { Link } from "react-router-dom";
import Social from "./Social";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="w-full md:w-3/4 mx-auto p-4">
      <div className="md:flex gap-3 ">
        <div className=" flex-1">
          <img
            className="w-full h-[500px] "
            src="https://i.ibb.co/s3cg0Xv/images-1.jpg"
            alt=""
          />
        </div>
        <div className=" flex-1 p-4 mt-4">
          <h1 className="text-3xl font-bold text-center">Login Pleace</h1>
          <form onSubmit={handleSubmit(onSubmit)} className=" mt-5">
            <div>
              <input
                type="email"
                required
                {...register("email")}
                className=" input input-bordered w-full"
                placeholder="Enter your email Adderss"
                name="email"
                id=""
              />
            </div>
            <br />
            <div>
              <input
                type="password"
                required
                className=" input input-bordered w-full"
                placeholder="Enter your password"
                {...register("password")}
                name="password"
                id=""
              />
            </div>
            <br />
            <input
              type="submit"
              className=" btn btn-outline btn-primary w-full"
              value="Login"
            />
          </form>
          <p className=" text-center mt-2">
            If you are new pleace !{" "}
            <Link to="/register" className=" text-green-700 hover:underline">
              Register
            </Link>
          </p>
          <Social></Social>
        </div>
      </div>
    </div>
  );
};

export default Login;
