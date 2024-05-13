import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";

function LiveRoomProductCard(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formattedDate, setFormattedDate] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const startDate = new Date(props.specialprice?.startDate);
    const endDate = new Date(props.specialprice?.endDate);

    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startDay = startDate.getDate();

    const endMonth = endDate.toLocaleString("default", { month: "long" });
    const endDay = endDate.getDate();
    setFormattedDate({
      startDate: `${startMonth} ${startDay}`,
      endDate: `${endMonth} ${endDay}`,
    });
  }, []);

  const handleImageClick = () => {
    props.setPopupVisible(true);
  };
  const handleclick = async (id, category) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getSingleProduct?id=${id}`;
    const response = await axios.get(url);
    const data = response.data;
    dispatch({ type: "FETCH_ROOM_REQUEST", payload: id });

    // router.push(`/product`);
  };
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setSlide(slide === props.imgSrc.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? props.imgSrc.length - 1 : slide - 1);
  };
  // useEffect(() => {

  // }, [dispatch]);

  return (
    <>
      <div
        key={props.cardkey}
        className="card pb-12"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div className={`relative`}>
          {props.demandtype ? (
            <div
              className={
                "flex justify-between text-black font-semibold bg-white py-1 px-3 absolute top-2 left-2 z-10"
              }
            >
              {props.demandtype === "Ayatrio Member Favorite"
                ? "Top Rated"
                : props.demandtype}
            </div>
          ) : (
            ""
          )}
          <div className="relative  flex gap-4 cursor-pointer ">
            <div className="w-[200px] aspect-square">
              <Link href={`/product/${props.title}`}>
                <Image
                  src={props.imgSrc[0]}
                  alt="NA"
                  height={300}
                  width={300}
                  onClick={() => handleclick(props.id, props.category)}
                  className="aspect-square "
                />
              </Link>
            </div>
            <div>
              <p className="text-lg font-semibold hover:underline">
                {props.productTitle}
              </p>
              <p className="text-sm mb-1">{props.productDescription}</p>

              {props.specialprice ? (
                <div>
                  <p className=" text-sm font-semibold bg-yellow-400 price-box shadow-[3px_3px_rgb(173,_53,_53)] w-fit px-2 py-1">
                    Rs.
                    <span className="text-3xl">
                      {props.specialprice?.price}
                    </span>
                  </p>
                  <p className="text-sm mt-2 text-gray-500">
                    Regular price: Rs.{props.totalPrice}
                  </p>

                  {props.specialprice.startDate &&
                    props.specialprice.endDate && (
                      <p className="text-sm mt-1 text-gray-500">
                        Price valid from {formattedDate.startDate} to{" "}
                        {formattedDate.endDate}
                      </p>
                    )}
                </div>
              ) : (
                <p className="text-sm font-semibold">
                  Rs.<span className="text-3xl">{props.totalPrice}</span>
                </p>
              )}
              {/* {props.ratings?.length > 0 && ( */}
              <p className="flex flex-row items-center gap-1 text-sm text-black">
                {props.stars.map((star, index) => (
                  <Image
                    key={index}
                    src={star}
                    alt="star"
                    width={15}
                    height={15}
                  />
                ))}
                ({props.ratings?.length})
              </p>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveRoomProductCard;
