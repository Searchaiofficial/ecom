"use client";

const { default: axios } = require("axios");
const { default: Image } = require("next/image");
const { default: Link } = require("next/link");
const { useDispatch } = require("react-redux");
const { setDbItems } = require("../Features/Slices/cartSlice");

const RoomToolbar = ({ data }) => {
  const dispatch = useDispatch();

  const handleJoinLive = () => {
    // Store category data in local storage
    localStorage.setItem("selectedCategory", category);
  };

  const handleFreeSampling = async () => {
    try {
      const responce = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/freeSampling`,
        {
          deviceId: localStorage.getItem("deviceId"),
          freeSampleId: data?._id,
        }
      );
      console.log("Free Sampling :", responce.data);
      if (responce.status === 200) {
        dispatch(setDbItems(responce.data));
        router.push("/checkout");
      }
    } catch (error) {
      console.log("Free Sampling error", error);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <div className="flex flex-row bg-red-500 gap-2 p-1">
        <Image
          src="/icons/golive.svg"
          alt="live icon"
          width={16}
          height={16}
          loading="lazy"
        />
        <span className="text-white text-xs">Live</span>
      </div>
      <Link
        href={{
          pathname: "/liveroom",
        }}
        passHref
        onClick={handleJoinLive}
        className="py-2 focus:outline-none text-black flex items-center ml-2 h-8"
      >
        <span className="text-sm">Join Live</span>
      </Link>
      <span></span>
      <div
        onClick={handleFreeSampling}
        className="py-2 focus:outline-none h-8 flex items-center cursor-pointer space-x-2 "
      >
        <Image
          src="/icons/free-sample.svg"
          alt="free-sample"
          width={20}
          height={25}
          loading="lazy"
        />
        <span className="text-sm">Free Sampling</span>
      </div>
    </div>
  );
};

export default RoomToolbar;
