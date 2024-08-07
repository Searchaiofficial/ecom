import { useRef, useState } from "react";
import PopUp from "../Reviews/PopUp";
import "./styles.css";
import BlogRelatedProductsSlider from "./BlogRelatedProductsSlider";

const BlogRecommendedProducts = ({ relatedProducts, title }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const closePopup = () => {
    setPopupVisible(false);
  };
  const swiper1Ref = useRef(null);

  const filteredProducts = relatedProducts?.filter(
    (product) => product.subcategory !== "Accessories"
  );

  return (
    <div>
      <div className=" mt-20  bg-white ">
        <div className="mb-2 w-full flex justify-between items-center">
          <h2 className="font-semibold text-2xl py-[15px]">
            {relatedProducts && relatedProducts.length === 0 ? "" : title}
          </h2>
          <div className="Slidenav flex  bg-white text-2xl cursor-pointer  text-white rounded-full gap-2">
            <div
              onClick={() => swiper1Ref.current.swiper.slidePrev()}
              className="custom-prev-button bg-slate-500  rounded-full  hover:bg-400 hover:scale-110 hover:text-slate-100"
            ></div>
            <div
              onClick={() => swiper1Ref.current.swiper.slideNext()}
              className="custom-next-button bg-slate-500  rounded-full hover:bg-400 hover:scale-110 hover:text-slate-100"
            ></div>
          </div>
        </div>
        <PopUp isPopupVisible={isPopupVisible} closePopup={closePopup} />
        <BlogRelatedProductsSlider data={filteredProducts} />
      </div>
    </div>
  );
};

export default BlogRecommendedProducts;
