import { useState } from "react";
import {
  updateQuantity,
  selectQuantity,
} from "@/components/Features/Slices/calculationSlice";
import { useDispatch } from "react-redux";
function IncDecCounter() {
  const dispatch = useDispatch();
  // const [visible, setVisible] = useState(false);
  // const handleClickVisible = () => {
  //   setVisible(true);
  // };
  let [num, setNum] = useState(1);
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <>
      <div className="flex mt-[5px] items-center">
        <div className="input-group p-[3px] inline-flex rounded-full border text-xl font-medium">
          <div class="input-group-prepend">
            <button
              className="hover:bg-zinc-200  w-9 h-9 rounded-full"
              type="button"
              onClick={() => {
                decNum();
                // handleClickVisible();
              }}
            >
              -
            </button>
          </div>
          <input
            type="text"
            className="form-control w-[30px] text-center inline-flex"
            value={num}
            onChange={handleChange}
          />
          <div class="input-group-prepend">
            <button
              className="hover:bg-zinc-200  w-9 h-9 rounded-full"
              type="button"
              onClick={() => {
                incNum();
                // handleClickVisible();
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* <div className="">
          <button
            className={` bg-black  h-9 w-auto text-white  rounded-full border  px-7 text-sm items-center justify-center
            ${visible === true ? "block" : "hidden"}
            `}
            type="button"
            onClick={() => {
              dispatch(updateQuantity(num));
            }}
          >
            <span>Add&nbsp;{num}</span>
            <span>&nbsp;items to </span>
            <span>buy</span>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default IncDecCounter;
