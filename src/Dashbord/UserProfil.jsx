import useAuth from "../Hooks/useAuth";
import { LuBadgeCheck } from "react-icons/lu";
import { Helmet } from "react-helmet-async";

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
  const { data: payment = {} } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/payment/${user.email}`);
      return data;
    },
  });

  return (
    <div className=" md:w-2/4 mx-auto">
      <Helmet>
        <title>User || profile</title>
      </Helmet>
      <div className=" flex justify-center">
        <div className="space-y-3">
          <img
            className=" w-40 h-40 rounded-full border-2"
            src={user?.photoURL}
            alt=""
          />
          <p className={`text-2xl p-2 bg-orange-500 rounded-lg text-center `}>
            {payment.badge}
          </p>
          <p className="text-4xl font-bold">Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
