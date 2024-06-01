import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Social from "./Social";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
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

            <input type="file" {...register("img")} required name="img" id="" />
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
            value="Login"
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
