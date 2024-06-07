import useAuth from "../Hooks/useAuth";
import { LuBadgeCheck } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../Hooks/useAxiosCommon";
const UserProfil = () => {
  const { user } = useAuth();
  const axioscommon = useAxiosCommon();
  const { data: useron = {} } = useQuery({
    queryKey: ["useron", user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/useron/${user.email}`);
      return data;
    },
  });

  return (
    <div className=" md:w-2/4 mx-auto">
      <div className=" flex justify-center">
        <div>
          <img
            className=" w-40 h-40 rounded-full border-2"
            src={user?.photoURL}
            alt=""
          />

          <p className={`text-2xl `}>{useron?.badge}</p>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
