import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, Mousewheel, FreeMode } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import Card from "../../components/Cards/card";

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
          <h2 className="font-semibold text-2xl pb-[8px] ">Accessories</h2>
        </div>
      )}
      <Swiper
        ref={swiper1Ref}
        {...swiperOptions}
        scrollbar={{
          hide: false,
          draggable: true,
        }}
        mousewheel={{
          forceToAxis: true,
          invert: false,
        }}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
        }}
        allowSlideNext={true}
        allowSlidePrev={true}
        slideNextClass="custom-next-button"
        slidePrevClass="custom-prev-button"
        className=""
      >
        {accessories &&
          accessories.length > 0 &&
          accessories.map((product, idx) => (
            <SwiperSlide>
              <Card
                title={product.productTitle}
                productImages={product?.productImages}
                specialPrice={product?.specialprice}
                price={product.perUnitPrice}
                desc={product.productTitle}
                shortDescription={product.shortDescription}
                demandtype={product.demandtype}
                imgSrc={product.images}
                rating={product.ratings}
                key={idx}
                id={product._id}
                category={product.category}
                productId={product.productId}
                cssClass={"card1flex"}
                totalPrice={product.totalPrice}
                unitType={product.unitType}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default AccessoriesPosts;
