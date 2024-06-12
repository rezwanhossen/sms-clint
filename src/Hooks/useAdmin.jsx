import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecqur from "./useAxiosSecqur";

const useAdmin = () => {
  const { user, loding } = useAuth();
  const axiosSec = useAxiosSecqur();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loding,
    queryFn: async () => {
      const res = await axiosSec.get(`/user/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isLoading];
};

export default useAdmin;
