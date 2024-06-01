import { Link } from "react-router-dom";
import Social from "./Social";

const Login = () => {
  return (
    <div className="w-full md:w-3/4 mx-auto p-4">
      <div className="md:flex gap-3 ">
        <div className=" flex-1">
          <img
            className="w-full "
            src="https://i.ibb.co/s3cg0Xv/images-1.jpg"
            alt=""
          />
        </div>
        <div className=" flex-1 p-4 mt-4">
          <h1 className="text-3xl font-bold text-center">Login Pleace</h1>
          <form className=" mt-5">
            <div>
              <input
                type="email"
                className=" input input-bordered w-full"
                placeholder="Enter your email Adderss"
                name=""
                id=""
              />
            </div>
            <br />
            <div>
              <input
                type="password"
                className=" input input-bordered w-full"
                placeholder="Enter your email Adderss"
                name=""
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
            <Link className=" text-green-700 hover:underline">Register</Link>
          </p>
          <Social></Social>
        </div>
      </div>
    </div>
  );
};

export default Login;
