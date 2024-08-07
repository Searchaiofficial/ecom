import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import Card from "../../components/Cards/card";
import AccessoriesSlider from "./AccessoriesSlider";

const AccessoriesPosts = ({ accessories }) => {
  const swiper1Ref = useRef(null);

  const swiperOptions = {
    centeredSlides: false,
    spaceBetween: 1,
    modules: [Pagination, Scrollbar, Mousewheel, FreeMode],
    navigation: {
      nextEl: ".custom-next-button",
      prevEl: ".custom-prev-button",
    },
    noSwiping: true,
    allowSlidePrev: true,
    allowSlideNext: true,
  };

  return (
    <div>
      {accessories && accessories.length > 0 && (
        <div>
          <h2 className="font-semibold text-2xl pb-[8px] ">
            {accessories[0].subcategory}
          </h2>
        </div>
      )}
      <AccessoriesSlider accessories={accessories} />
    </div>
  );
};

export default AccessoriesPosts;
