import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Social = () => {
  const { googlelogin, loding } = useAuth();
  const naviget = useNavigate();
  const handelglogin = async () => {
    try {
      await googlelogin();
      naviget("/");
      toast.success("google Login successful !");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className=" mt-2 mb-10">
      <div className=" divider"> or </div>
      <div className=" flex justify-center">
        <button
          disabled={loding}
          onClick={handelglogin}
          className=" btn text-2xl btn-outline btn-primary"
        >
          <FaGoogle /> Google
        </button>
      </div>
    </div>
  );
};

export default Social;
