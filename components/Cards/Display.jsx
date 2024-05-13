// import axios from "axios";
import { fetchDisplayData } from "@/actions/fetchDisplayData";
import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { selectedDisplayData } from "../Features/Slices/displaySlice";
// import { selectedImagechanger } from "../Features/Slices/ImagechangerSlice";
// import { FETCH_DISPLAY_DATA } from "../Features/Sagas/displaySaga";

const Display = async () => {
  // // const [apiData, setApiData] = useState([]);

  // const dispatch = useDispatch();
  // const apiData = useSelector(selectedDisplayData);
  // useEffect(() => {
  //   if (apiData.length === 0) {
  //     dispatch({ type: FETCH_DISPLAY_DATA });
  //   }
  // }, []);

  const apiData = await fetchDisplayData()

  return (
    <>
      <div className="px-[28px] flex flex-col  lg:grid lg:grid-cols-2 md:flex-row gap-4  items-center justify-between mx-auto my-8">
        <div className="w-full">
          {apiData.length > 0 ? (
            <>
              <div className={`relative w-full h-[490px]  lg:h-[816px] max-w-1/2]`}>
                <Image
                  className="w-full h-full"
                  width={0}
                  height={0}
                  src={apiData[0].img}
                  alt={apiData[0].imgTitle}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 justify-start p-[30px]">
                  <div>
                    <h2 className="text-white text-[12px]">
                      {apiData[1].imgTitle}
                    </h2>
                    <p className="text-blue-500 text-[12px] font-semibold">
                      View More
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`relative bg-gray-300 flex justify-center items-center w-full h-[38rem] mr-[22px]`}
              >
                <p>Data Loading...</p>
              </div>
            </>
          )}
        </div>
        <div className="max-w-1/2 w-full">
          {apiData.length > 0 ? (
            <>
              <div className={`relative w-full h-[490px] lg:h-[816px]  max-w-1/2] `}>
                <Image
                  className="w-full h-full"
                  width={0}
                  height={0}
                  src={apiData[1].img}
                  alt={apiData[1].imgTitle}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 justify-start p-[30px]">
                  <div>
                    <h2 className="text-white text-[12px]">
                      {apiData[1].imgTitle}
                    </h2>
                    <p className="text-blue-500 text-[12px] font-semibold">
                      View More
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`relative bg-gray-300 flex justify-center items-center w-full h-[38rem] `}
              >
                <p>Data Loading...</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Display;
