import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LogingSpiner from "../Sheare/LogingSpiner";
// import useAxiosSecqur from "../Hooks/useAxiosSecqur";
// import { Elements } from "@stripe/react-stripe-js";
import CheckOutFrom from "./CheckOutFrom";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_pymeny);

const Payment = () => {
  const { id } = useParams();
  const axioscommon = useAxiosCommon();
  const { data: badge = {}, isLoading } = useQuery({
    queryKey: ["badge", id],
    queryFn: async () => {
      const { data } = await axioscommon.get(`/badge/${id}`);
      return data;
    },
  });
  if (isLoading) return <LogingSpiner></LogingSpiner>;
  //console.log(badge);

  return (
    <div>
      <Helmet>
        <title>users || Payment</title>
      </Helmet>
      <h1 className="text3xl md:text-5xl font-bold"> Payment</h1>
      <div className="my-8">
        <Elements stripe={stripePromise}>
          <CheckOutFrom badge={badge}></CheckOutFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
