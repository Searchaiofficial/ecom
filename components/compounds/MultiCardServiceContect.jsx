import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./../Imagechanger/styles.css";

const MultiCardServiceContent = (props) => {
    const { iconPath, title } = props;
    console.log(title)
    return (
        <div className="bg-white flex flex-col md:flex-row h-auto min-h-[260px] mb-[20px]">
            {/* <div className="mt-8 ml-6">
        <Image src={iconPath} width={iconSize} height={iconSize} alt="image" />
      </div>
      <h2 className="text-[28px] text-[#333333] font-bold ml-6 mr-12">{title}</h2>
      <div className="mt-2 ml-6 mr-12 text-[17px] font-normal mb-12">{text}</div>

      <div className="absolute bottom-1 right-4 mb-8">
        <Image
          className="w-10 h-10"
          src="/icons/add-circle.svg"
          width={0}
          height={0}
          alt="add"
        />
      </div> */}
            <div className="flex gap-5 flex-col p-[30px]">
                <div className="pb-[9px]  h-[56px]">
                    <Image src={iconPath} width={50} height={50} alt={title} className="" />
                </div>
                <h2 className="text-[21px] lg:text-[25px] trackinh-[0.007em] text-[#333333] font-semibold line-clamp-3">
                    {title}
                </h2>
            </div>
        </div>
    );
};

// MultiCardServiceContent.propTypes = {
//     iconPath: PropTypes.string,
//     iconSize: PropTypes.number,
//     title: PropTypes.string,

// };

// MultiCardServiceContent.defaultProps = {
//     iconPath: PropTypes.string,
//     iconSize: 52,
//     title: "title",
// };

export default MultiCardServiceContent;
