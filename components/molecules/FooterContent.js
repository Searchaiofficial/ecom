import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const FooterContent = (props) => {
  const [screenSize, setScreenSize] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const router = useRouter();
  const { headingId, categoryHeading, categoryData } = props;
  const handleClick = (headingId, elementId) => {
    if (headingId === 1) {
      elementId === 1 ? router.push("/login") : elementId === 6 ? router.push("create-customer") : router.push("/");
    } else if (headingId === 2) {
      elementId === 1
        ? router.push("/deliveryservice")
        : elementId === 2
          ? router.push("/services/Installation")
          : elementId === 3
            ? router.push("/services/Planning")
            : elementId === 4
              ? router.push("/services/BuyBack")
              : elementId === 5
                ? router.push("/services/ClickAndCollect")
                : elementId === 6
                  ? router.push("/services/Finance")
                  : elementId === 7
                    ? router.push("/designservice")
                    : elementId === 8
                      ? router.push("customerservice")
                      : router.push("/home");
    } else if (headingId === 3) {
      elementId === 8
        ? router.push("/customerservice/returnpolicy")
        : elementId === 4
          ? router.push("/customerservice/priceguarantee")
          : elementId === 6
            ? router.push("/customerservice/giftcards")
            : elementId === 10
              ? router.push("/customerservice/contactus")
              : elementId === 11
                ? router.push("/faq")
                : elementId === 2
                  ? router.push("/billing-payment")
                  : elementId === 3
                    ? router.push("shipping-delivery")
                    : elementId === 9
                      ? router.push("customer-privacy-policy")
                      : router.push("/home");
    } else {
      elementId === 1
        ? router.push("/thisisayatrio")
        : elementId === 2
          ? router.push("/sustainability")
          : elementId === 3
            ? router.push("/ayatrio-map")
            : router.push("/home");
    }
  };
  return (
    <div>
      {screenSize < 801 ? (
        <div>
          <h1
            className="py-2 px-1 font-semibold border-b-2 border-t-2"
            onClick={() => setShow(!show)}
          >
            {categoryHeading}
          </h1>
          {show &&
            categoryData.map((curElement) => {
              return (
                <p
                  key={curElement.id}
                  onClick={() => handleClick(headingId, curElement.id)}
                  className="cursor-pointer px-1 py-1"
                >
                  {curElement.text}
                </p>
              );
            })}
        </div>
      ) : (
        <div className="col-span-1 space-y-5">
          <h3 className="font-semibold">{categoryHeading}</h3>
          <div className="space-y-3">
            {categoryData.map((curElement) => {
              return (
                <p
                  onClick={() => handleClick(headingId, curElement.id)}
                  className="cursor-pointer"
                >
                  {curElement.text}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

FooterContent.propTypes = {
  headingId: PropTypes.number,
  categoryHeading: PropTypes.string,
  categoryData: PropTypes.array,
};

FooterContent.defaultProps = {
  headingId: 1,
  categoryHeading: "Heading",
  categoryData: ["dataArray", "dataArray", "dataArray"],
};

export default FooterContent;
