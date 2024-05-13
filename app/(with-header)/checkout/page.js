import dynamic from "next/dynamic";
import Script from "next/script";
const CartMain = dynamic(() =>
  import("@/components/CartComp/Main/CartMain")
);
const CheckoutPage = () => {
  return (
    <>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js" />
      <CartMain />
    </>
  );
};
export default CheckoutPage;
