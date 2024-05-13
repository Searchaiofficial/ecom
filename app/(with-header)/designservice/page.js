"use client";
import {
  expertDesigners,
  ideasAndAdvice,
} from "@/Model/BusinessToBusinessData/BusinessToBusinessData";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DesignServicePage = () => {
  const route = useRouter();
  const handleCheckout = () => {
    route.push("/checkout");
  };
  return (
    <>
      <div>
        <div className="mt-20 sm:ml-[50px] ml-[20px] sm:mr-[50px] mr-[20px] p-10 space-y-10">
          {/* Free one on one section starts */}
          <section>
            <div className="flex w-full h-2/3">
              <div className="flex flex-col space-y-3">
                <p className="font-semibold text-xl">
                  IN STORE AT HOME VIRTUAL
                </p>
                <p className="font-semibold text-4xl">free one-on-one</p>
                <p className="font-semibold text-4xl">design services</p>
                <button className="bg-black py-2 px-3 text-white font-semibold rounded-sm">
                  request an appointment
                </button>
              </div>
            </div>
          </section>
          {/* Our services section starts */}
          <section>
            <div className="flex flex-col w-full space-y-4">
              <div className="flex justify-center">
                <h3 className="font-bold text-3xl">Our services</h3>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5 justify-center">
                <div className="flex flex-col gap-5 md:w-1/4 border border-t-4 border-t-black p-4 shadow-2xl">
                  <div className="flex flex-col items-center">
                    <div className="w-4/6">
                      <Image
                        width={225}
                        height={225}
                        className="p-5"
                        alt="phone image"
                        src="/Businesstobusinessimg/phone.png"
                      />
                    </div>
                    <p className="font-semibold text-xl">design chat</p>
                    <p className="font-semibold text-lg">free</p>
                    <p className="font-semibold text-lg">
                      Design question you nedd help with ASAP? Start a free
                      online chat with one of our experts.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="bg-black font-semibold py-2 px-7 rounded-sm text-white">
                      start a chat
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-5 md:w-1/4 border border-t-4 border-t-black p-4 shadow-2xl">
                  <div className="flex flex-col items-center">
                    <div className="w-4/6">
                      <Image
                        width={225}
                        height={225}
                        alt="house image"
                        className="p-5"
                        src="/Businesstobusinessimg/house.png"
                      />
                    </div>
                    <p className="font-semibold text-xl">design services</p>
                    <p className="font-semibold text-lg">free</p>
                    <p className="font-semibold text-lg">
                      From quick styling tips to home makeovers,our design
                      experts are here to help .Pick the best appointment option
                      for you:
                    </p>
                    <p className="font-semibold text-sm">In store</p>
                    <p className="font-semibold text-sm">At home</p>
                    <p className="font-semibold text-sm">Virtual</p>
                    <p className="font-semibold text-sm">
                      Note:Whether in person or virtual ,please select the
                      location thats nearest to you
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button className="bg-black font-semibold py-2 px-7 rounded-sm text-white">
                      start a chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Our services section ends */}
          {/* 2 divs section starts */}
          <section>
            <div className="flex flex-col md:flex-row w-full">
              <div className="md:w-1/2 bg-lime-100 md:py-36 md:px-28 py-10 px-5">
                <div className="flex flex-col space-y-3">
                  <div>
                    <p className="font-semibold text-lg">
                      FROM OUR SOFAS TO YOURS
                    </p>
                    <p className="font-bold text-3xl">
                      our design crew loves to make you smile
                    </p>
                    <p className="font-semibold text-lg">
                      Check out this feel-good video of how our incredible
                      Design Crew team is here to help you virtually, from a
                      video call on your new WFH space to DMs on your backyard.
                    </p>
                  </div>
                  <div>
                    <button className="py-2 bg-black px-3 rounded-sm text-white font-semibold">
                      request an appointment
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:py-16 md:px-48 py-10 px-5">
                <div className="flex flex-col items-center space-y-10">
                  <div className="w-2/3">
                    <h2 className="font-bold text-5xl">
                      let us help refurnish your home
                    </h2>
                  </div>
                  <div>
                    <button className="py-2 bg-black px-3 rounded-sm text-white font-semibold">
                      request an appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* meet our expert designer section starts */}
          <section>
            <div className="flex w-full flex-col gap-5 items-center">
              <div>
                <h2 className="font-bold text-4xl p-2">
                  meet our expert designers
                </h2>
              </div>
              <div className="flex flex-col w-full md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-3">
                {expertDesigners.map((curElement) => {
                  return (
                    <div className="flex items-center justify-between h-[350px] flex-col space-y-3 border-none rounded-sm bg-slate-200 p-4 pt-5">
                      {/* <div className="w-2/3"> */}
                      <img
                        className="h-[200px] w-[200px] object-cover rounded-full"
                        src={curElement.image}
                      />
                      {/* </div> */}
                      <div className="items-center flex flex-col">
                        <div>
                          <p className="font-bold text-xl">{curElement.name}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {curElement.city}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="underline">view portfolio</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* ideas and advice section starts */}
          <section>
            <div className="flex w-full flex-col space-y-6 items-center">
              <div>
                <h2 className="font-bold text-4xl p-2">ideas and advice</h2>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-5">
                {ideasAndAdvice.map((curElement) => {
                  return (
                    <div className="flex flex-col items-start hover:underline cursor-pointer">
                      <img
                        className="h-[300px] w-[350px] object-cover object-top"
                        src={curElement.image}
                      />
                      <div className="items-center flex flex-col">
                        <div>
                          <p className="font-semibold text-xl">
                            {curElement.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="border-2 px-20 py-2 bg-transparent border-black text-black">
                read more
              </button>
              <button
                onClick={handleCheckout}
                className="bg-gray-400 px-5 py-2 rounded-md"
              >
                Go to checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DesignServicePage;
