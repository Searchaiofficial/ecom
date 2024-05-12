import dynamic from "next/dynamic";
import { Suspense } from "react";
import Splashscreen from "../Splashscreen/Splashscreen";
import Cards from "../Cards";

const SearchBarWrapper = dynamic(() =>
  import("../Header/SearchBarWrapper").catch((err) => console.error(err))
);
const MapButton = dynamic(() =>
  import("../MapButton/MapButton").catch((err) => console.error(err))
);

const HomePage = async () => {
  return (
    <>
      <div className="overflow-x-hidden fade-in">
        <SearchBarWrapper />
        <Suspense fallback={<Splashscreen />}>
          <Cards />
        </Suspense>
        <MapButton />
      </div>
    </>
  );
};

export default HomePage;
