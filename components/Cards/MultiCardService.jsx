import React from "react";
import Image from "next/image";
import "./styles.css";
import MultiCardServiceSlider from "./MultiCardServiceSlider";

const data = [
  {
    id: 1,
    headerTitle: "Shop online with click and collect at store",
    iconPath: "/icons/click and collect.svg",
  },
  {
    id: 2,
    headerTitle: "Furnishing & Measuring service",
    iconPath: "/icons/maserment.svg",
  },
  {
    id: 3,
    headerTitle: "Financing Service",
    iconPath: "/icons/payment.svg",
  },
  {
    id: 4,
    headerTitle: "buyback & resell",
    iconPath: "/icons/buy back.svg",
  },
  {
    id: 5,
    headerTitle: "warranty Service",
    iconPath: "/icons/warranty registration.svg",
  },
  {
    id: 6,
    headerTitle: "Installation Service",
    iconPath: "/icons/instalation.svg",
  },
  {
    id: 7,
    headerTitle: "Gift registry",
    iconPath: "/icons/gift.svg",
  },
  {
    id: 8,
    headerTitle: "Ayatrio Famaly Card",
    iconPath: "/icons/ayatrio famaly care+.svg",
  },
];

const MulticardService = () => {
  // const multiCardData = useState(data);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     if (multiCardData.length === 0) {
  //         dispatch({ type: "FETCH_MULTICARD_REQUEST", payload: "multiCard" });
  //     }
  // }, []);

  // console.log(multiCardData);

  return (
    <div>
      <div className="bg-zinc-50 pt-[5rem] pb-[5rem] pl-[20px] sm:pl-[50px]  lg:pl-[67px] overflow-x-auto">
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-2xl pb-[20px] pt-[30px]">
            Service and Financial help on shopping
          </h2>
          <div className=" flex text-2xl cursor-pointer text-white rounded-full gap-4">
            <Image
              loading="lazy"
              src="/icons/backarrowblack.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="back rounded-full h-7 w-7 "
            />
            <Image
              loading="lazy"
              src="/icons/rightarrowblack.svg"
              width={20}
              height={20}
              alt="Arrow"
              className="right lg:mr-16 mr-6 rounded-full h-7 w-7 "
            />
          </div>
        </div>{" "}
        <MultiCardServiceSlider data={data} />
      </div>
    </div>
  );
};

export default MulticardService;
