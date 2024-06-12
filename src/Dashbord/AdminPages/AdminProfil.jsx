import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
// import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAxiosSecqur from "../../Hooks/useAxiosSecqur";
import { Helmet } from "react-helmet-async";

const AdminProfil = () => {
  const { user } = useAuth();
  const axioscom = useAxiosSecqur();
  const { data: meal = [] } = useQuery({
    queryKey: ["meal", user?.email],
    queryFn: async () => {
      const { data } = await axioscom.get(`/admeals?email=${user.email}`);
      return data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Admin || profile</title>
      </Helmet>
      <div className=" md:w-2/4 mx-auto">
        <div className=" flex justify-center">
          <div className="space-y-3">
            <img
              className=" w-40 h-40 rounded-full border-2"
              src={user?.photoURL}
              alt=""
            />

            <p
              className={`text-2xl p-2 bg-orange-500 rounded-lg text-center `}
            ></p>
            <p className="text-4xl font-bold">Name: {user?.displayName}</p>
            <p>Email: {user?.email}</p>
            <p className="text-3xl">number of meals added : {meal.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfil;
