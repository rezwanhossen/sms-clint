import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import useAxiosSecqur from "../Hooks/useAxiosSecqur";

const CheckOutFrom = ({ badge }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSec = useAxiosSecqur();
  const [clientSecret, setclientSecret] = useState();
  const [pro, setpro] = useState(false);
  const price = badge?.price;
  // console.log(price);

  useEffect(() => {
    axiosSec.post("/create-payment-intent", { price: price }).then((res) => {
      // console.log(res.data.clientSecret);
      setclientSecret(res.data.clientSecret);
    });
  }, [axiosSec, price]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setpro(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      //  console.log("[error]", error);
      toast.error(error.message);
      setpro(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      toast.success("Pay successfully");
    }
    // payment con
    const { error: confError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      }
    );
    if (confError) {
      console.log(confError);
      toast.error(confError.message);
      setpro(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const paymentinfo = {
        ...badge,
        transactionId: paymentIntent.id,
        data: new Date(),
      };
    }
  };
  return (
    <form onSubmit={handelSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="btn btn-outline btn-primary my-6"
        type="submit"
        disabled={!stripe || !clientSecret || pro}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckOutFrom;
