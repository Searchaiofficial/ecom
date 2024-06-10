import React, { useRef, useState, useEffect } from "react";
// import search from "../../assets/icons/search.svg";

const MobileSearch = ({ isOpen, onClose, onSearch }) => {
  const inpRef = useRef(null);
  const [searchEngine, SetSeacrhEngine] = useState("");

  useEffect(() => {
    // Reset searchEngine state when the modal opens
    SetSeacrhEngine("");
  }, [isOpen]);

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`modal-overlay  z-[9999]  bg-white h-[40vh] w-full ${isOpen ? "" : "hidden"
        }`}
    >
      <div className="modal" onClick={handleModalClick}>
        <div className="flex flex-row gap-2 justify-evenly pt-10">
          <div className="searchDiv  flex flex-col">
            <div className="searchCon relative sm:w-[600px] w-[70vw] bg-zinc-100 p-2 rounded-full">
              <input
                ref={inpRef}
                type="text"
                placeholder="Search"
                className="search-input bg-transparent h-full sm:w-full w-[60vw] pl-10 border-0 focus:outline-none "
                value={searchEngine}
                onChange={(e) => {
                  SetSeacrhEngine(e.target.value);
                  onSearch(e);
                }}
              />
              <img
                src="/icons/search.svg"
                alt=""
                className="w-5 mx-1 my-1.5 top-[10%] right-[1%]  absolute z-10"
              />
            </div>
            <div className=" flex flex-col gap-4 font-bold ">
              <div className=" font-normal text-slate-600">
                <h2>Popular Searches</h2>
              </div>
              <div>
                <div>Engneering Flooring</div>
                <div>Grass flooring</div>
                <div>Vinial</div>
                <div>Wallpaper for Home</div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={onClose} className="border border-black rounded-3xl p-1">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
