import dynamic from "next/dynamic";
import Script from "next/script";
const UserPin = dynamic(() =>
  import("@/components/Checkoutcomp/Userpin")
);
const CheckoutPin = () => {
  return (
    <>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js" />
      <UserPin />
    </>
  );
};
export default CheckoutPin;
