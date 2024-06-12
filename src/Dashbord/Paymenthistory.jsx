import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecqur from "../Hooks/useAxiosSecqur";
import NoDataHeader from "../Sheare/NoDataHeader";
import { Helmet } from "react-helmet-async";

const Paymenthistory = () => {
  const { user } = useAuth();
  //   const axioscom = useAxiosCommon();
  const axiosSec = useAxiosSecqur();
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/payments?email=${user.email}`);
      return data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>users || Payment history</title>
      </Helmet>
      <h2 className="text-3xl font-bold"> payment hostory</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>email</th>
              <th>badge</th>
              <th>transactionId</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((req, inx) => (
                <tr key={req._id}>
                  <th>{inx + 1}</th>
                  <td>{req?.name} </td>
                  <td>{req?.data}</td>
                  <td>{req?.email} </td>
                  <td>{req?.badge} </td>
                  <td>{req?.transactionId}</td>
                  <td>{req?.price}</td>
                </tr>
              ))
            ) : (
              <NoDataHeader
                head={"you not pay"}
                subhead="please pay fast"
              ></NoDataHeader>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Paymenthistory;
