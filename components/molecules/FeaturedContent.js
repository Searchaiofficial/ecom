import Image from 'next/image';
import React from 'react';
import PropTypes from "prop-types";

const FeaturedContent = (props) => {
  const {
    key,
    verticalSpacingBetween,
    imageWidth,
    imageHeight,
    textSize,
    textStyle,
  } = props;

  const featured = props.featuredData;
  localStorage.setItem("texture_type", featured.text);

  return (
    <div className={`flex flex-col ${verticalSpacingBetween}`}>
      <h2 className='text-black font-bold text-2xl'>Featured</h2>
      <div><Image src={featured.image} width={imageWidth} height={imageHeight} alt={featured.text || 'football'} /></div>
      <div><h2 className={`${textSize} ${textStyle}`}>{featured.text}</h2></div>
      <div><h3 className='text-xl font-semibold text-gray-500'>View the collection</h3></div>
    </div>
  )
}

FeaturedContent.propTypes = {
  verticalSpacingBetween: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  textSize: PropTypes.string,
  textStyle: PropTypes.string
}

FeaturedContent.defaultProps = {
  verticalSpacingBetween: "space-y-3",
  imageWidth: 150,
  imageHeight: 150,
  textSize: "text-lg",
  textStyle: "font-normal"
}

export default FeaturedContent
