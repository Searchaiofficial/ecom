import { fetchSliderData } from "@/actions/fetchSliderData";
import NewMainSlider from "./NewMainSlider";
import MainSlider from "./MainSlider";

const MainSliderWrapper = async () => {
  const sliderData = await fetchSliderData();

  return <MainSlider initialData={sliderData} />;
};

export default MainSliderWrapper;
