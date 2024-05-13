import dynamic from "next/dynamic";
import Script from "next/script";
const Form = dynamic(() => import("@/components/Checkoutcomp/Details"));

const Details = () => {
  return (
    <>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js" />
      <Form />
    </>
  );
};
export default Details;
