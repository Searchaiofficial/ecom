import { fetchSliderData } from "@/actions/fetchSliderData";
import MainSlider from "./MainSlider";
import { unstable_noStore as noStore } from "next/cache";

const MainSliderWrapper = async () => {
  noStore();

  const sliderData = await fetchSliderData();

  return <MainSlider initialData={sliderData} />;
};

export default MainSliderWrapper;
