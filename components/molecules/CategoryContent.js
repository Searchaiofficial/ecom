import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryContent = (props) => {
  const {
    key,
    categoryGap,
    containerPadding,
    headingStyle,
    headingSize,
    headingColor,
    gapHeadingItems,
    itemsGap,
    textStyle,
    textSize,
    textColor,
    containerBgColor,
    displayedOn,
  } = props;

  const heading = props.categoryHeading;

  const categoryData = props.categoryData;
  const router = useRouter();
  let parentCategoryVar;
  const handleClick = (cat) => {
    if (displayedOn === "menu") {
      // console.log("heading : ", heading)
      // console.log("cat : ", cat)
      // console.log("cat.text : ", cat.text)
      cat.text === "Virtual Experience"
        ? router.push("/category/virtualexperience")
        : router.push("/magazine");
    } else {
      // console.log("heading : ", heading);
      // console.log("cat : ", cat);
      // console.log("cat.text : ", cat.text);
      if (heading.split(" ")[2].toLowerCase() === "collections") {
        parentCategoryVar = "collection";
      } else if (heading.split(" ")[2].toLowerCase() === "rooms") {
        parentCategoryVar = "roomCategory";
      } else if (heading.split(" ")[2].toLowerCase() === "styles") {
        parentCategoryVar = "style";
      } else if (heading.split(" ")[2].toLowerCase() === "colours") {
        parentCategoryVar = "colors";
      }
      router.push(
        props.parentCategory + "/" + parentCategoryVar + "/" + cat.text
      );
    }
  };



  return (
    <div
      className={`flex flex-col ${categoryGap} ${containerPadding} ${gapHeadingItems} ${containerBgColor}`}
    >
      <div className={`${headingStyle} ${headingSize} ${headingColor}`}>
        <h2>{heading}</h2>
      </div>
      <div className={`flex flex-col ${itemsGap}`}>
        {categoryData.map((dataItem) => {
          return (
            <div
              key={dataItem.id}
              className={`flex gap-1`}
              onClick={() => handleClick(dataItem)}
            >
              {dataItem.image ? (
                <Image loading="lazy"
                  src={dataItem.image}
                  width={20}
                  height={20}
                  alt={dataItem.text}
                  className="rounded-full"
                />
              ) : null}
              <p
                className={`${textStyle} ${textSize} ${textColor} cursor-pointer`}
              >
                {dataItem.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CategoryContent.propTypes = {
  categoryGap: PropTypes.string,
  containerPadding: PropTypes.string,
  headingStyle: PropTypes.string,
  headingSize: PropTypes.string,
  headingColor: PropTypes.string,
  gapHeadingItems: PropTypes.string,
  itemsGap: PropTypes.string,
  textStyle: PropTypes.string,
  textSize: PropTypes.string,
  textColor: PropTypes.string,
  containerBgColor: PropTypes.string,
  displayedOn: PropTypes.string,
};

CategoryContent.defaultProps = {
  categoryGap: "space-x-1",
  containerPadding: "p-1",
  headingStyle: "not-italic",
  headingSize: "font-md",
  headingColor: "text-black",
  gapHeadingItems: "space-y-5",
  itemsGap: "space-y-3",
  textStyle: "not-italic",
  textSize: "text-sm",
  textColor: "text-black",
  containerBgColor: "bg-white",
  displayedOn: "filterDropdown",
};

export default CategoryContent;
