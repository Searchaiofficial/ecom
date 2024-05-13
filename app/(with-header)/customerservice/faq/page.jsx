import React from "react";
import Image from "next/image";
import { questionAndAnswers } from "@/Model/FAQData/FaqData";
import { mainGridData } from "@/Model/FAQData/GridData";
import dynamic from "next/dynamic";
const FAQSwiper = dynamic(()=>import('@/components/FAQSwiper/FAQSwiper'))

const FaqPage = () => {

  return (
    <div>
      <div className="mt-20 sm:px-[50px] px-[20px] space-y-10">
        {/* FAQs search bar section starts */}
        <section>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl">
                <strong>Frequently Asked Questions</strong>
              </h2>
            </div>
            <div className="flex flex-wrap w-full">
              <input
                className="w-full bg-gray-200 border border-transparent rounded-full items-center transition duration-200 ease-in-out flex relative overflow-hidden p-5"
                id="search"
                type="search"
                placeholder="Search"
              />
            </div>
          </div>
        </section>
        <FAQSwiper/>
        {/* main grid section starts */}
        <section>
          <div className="flex flex-col space-y-6">
            <div className="flex font-bold text-xl">Jump to a topic:</div>
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2">
              {mainGridData.map((curElement) => {
                return (
                  <div className="flex flex-col space-y-1 cursor-pointer hover:underline">
                    <Image
                    width={750}
                    height={433}
                    src={curElement.image}
                    alt=""/>
                    <p>{curElement.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* FAQs start */}
        <section>
          <div className="flex flex-col space-y-7 md:w-2/3">
            <h4 className="font-bold text-xl">
              Returns, Guarantees & Complaints
            </h4>
            {questionAndAnswers.map((curElement) => {
              return (
                <div>
                  <h2 className="font-bold text-lg">{curElement.question}</h2>
                  <h3>{curElement.answer}</h3>
                </div>
              );
            })}
          </div>
        </section>
        {/* FAQs end */}
      </div>
    </div>
  );
};

export default FaqPage;
