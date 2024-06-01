import { FaGoogle } from "react-icons/fa";

const Social = () => {
  return (
    <div className=" mt-2">
      <div className=" divider"> or </div>
      <div className=" flex justify-center">
        <button className=" btn text-2xl btn-outline btn-primary">
          <FaGoogle /> Google
        </button>
      </div>
    </div>
  );
};

export default Social;
