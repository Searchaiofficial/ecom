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
      <div className=" sm:px-[50px] px-[20px] flex flex-col md:flex-row gap-4  items-center justify-between mx-auto my-8">
        <div className="max-w-1/2 w-full">
          {apiData.length > 0 ? (
            <>
              <div className={`relative w-full h-[490px]  lg:h-[712px] max-w-1/2]`}>
                <Image
                  className="w-full h-full"
                  width={0}
                  height={0}
                  src={apiData[0].img}
                  alt={apiData[0].imgTitle}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-[18rem] left-0 right-0 bottom-0 flex flex-col justify-center items-center p-2">
                  <h2 className="text-white text-center text-3xl  mb-4">
                    {apiData[0].imgTitle}
                  </h2>
                  <button className="bg-black hover:bg-zinc-300 text-white   py-2 px-10 h-12 rounded-full">
                    {apiData[0].buttonText}
                  </button>
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
              <div className={`relative w-full h-[490px] lg:h-[712px]  max-w-1/2] `}>
                <Image
                  className="w-full h-full"
                  width={0}
                  height={0}
                  src={apiData[1].img}
                  alt={apiData[1].imgTitle}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-[18rem] left-0 right-0 bottom-0 flex flex-col justify-center items-center p-2">
                  <h2 className="text-white text-center text-3xl mb-4">
                    {apiData[1].imgTitle}
                  </h2>
                  <button className="bg-black hover:bg-zinc-300 text-white  py-2 px-10 h-12 rounded-full">
                    {apiData[1].buttonText}
                  </button>
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
