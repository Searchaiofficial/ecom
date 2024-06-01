import { fetchDefaultSliderData, fetchMobileSliderData } from "@/actions/fetchSliderData";
import NewMainSlider from "./NewMainSlider";
import MobileSlider from "./MobileSlider";

const MainSliderWrapper = async () => {
  const largeDeviceSliderData = await fetchDefaultSliderData();
  const mobileDeviceSliderData = await fetchMobileSliderData();
  return (
    <>
      <NewMainSlider initialData={largeDeviceSliderData} />
      <MobileSlider initialData={mobileDeviceSliderData} />
    </>
  )
};

export default MainSliderWrapper;
