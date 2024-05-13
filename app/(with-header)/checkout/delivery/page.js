import dynamic from "next/dynamic";
import Script from "next/script";
const Delivery = dynamic(() =>
  import("@/components/Checkoutcomp/Delivery")
);
const CheckoutDelivery = () => {
  return (
    <>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js" />
      <Delivery />
    </>
  );
};
export default CheckoutDelivery;
