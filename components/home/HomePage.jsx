import dynamic from "next/dynamic";

const Cards = dynamic(() =>
  import("../Cards").catch((err) => console.error(err))
);
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
        <Cards />
        <MapButton />
      </div>
    </>
  );
};

export default HomePage;
