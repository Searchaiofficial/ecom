import { fetchSliderData } from "@/actions/fetchSliderData";
import NewMainSlider from "./NewMainSlider";

const MainSliderWrapper = async () => {
  const sliderData = await fetchSliderData();
  return (
    <>
      <NewMainSlider initialData={sliderData} />\
    </>
  )
};

export default MainSliderWrapper;
