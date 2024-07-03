import Image from "next/image";
import React from "react";
import { giftCardFaqs } from "@/Model/GiftCardsFaqData/GiftCardsFaqData";

const GiftCards = () => {
  return (
    <div>
      <div className="mt-20 sm:px-[50px] px-[20px]  space-y-10">
        <div className="space-y-7">
          <h1 className="font-bold text-4xl pt-10">AYATRIO Gift Cards</h1>
          <hr />
          {/* Three options with images section starts */}
          <section>
            <div className="flex flex-col w-full items-center">
              <div className="flex flex-col lg:flex-row gap-8 w-full lg:space-x-5 space-y-5 lg:space-y-0">
                <div className="flex flex-col lg:w-1/3">
                  <div className="lg:mt-16">
                    <Image
                      width={600}
                      height={300}
                      src="/images/customerservice/GiftCardsImg/gift1.jpg"
                      alt="gift"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <h2 className="font-bold text-xl">Digital Gift Card</h2>
                    <p>
                      You can buy one or more AYATRIO Gift cards with any value up to 10,000 INR through our website, in just a few steps. Your AYATRIO Gift card is emailed straight to your inbox. Bought gift cards can only be redeemed in stores (for now).
                    </p>
                    <p>
                      Share the gift card number and its PIN with any of our checkout co-workers for gift card redemption.
                    </p>
                    <div>
                      <button className="bg-black text-white rounded-3xl py-2 px-4 text-sm font-semibold">
                        Buy AYATRIO Gift Card online
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:w-1/3">
                  <div className="lg:mt-16">
                    <Image
                      width={600}
                      height={300}
                      src="/images/customerservice/GiftCardsImg/gift2.jpg"
                      alt="gift"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <h2 className="font-bold text-xl">Physical Gift Card</h2>
                    <p>
                      You can buy a physical AYATRIO Gift Card with any value up to 10,000 INR at AYATRIO stores (in Hyderabad, Mumbai (Navi Mumbai, Worli, RCity) and Bangalore (Nagasandra).
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:w-1/3">
                  <div className="lg:mt-16">
                    <Image
                      width={600}
                      height={338}
                      src="/images/customerservice/GiftCardsImg/gift3.jpg"
                      alt="gift"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <h2 className="font-bold text-xl">
                      Interested in buying Gift Cards for your business (employee and business contacts)?
                    </h2>
                    <p>
                      Please submit a gift card request by filling out the webform. To access the webform, click the link below, Enter your company details and upload any files if needed.
                    </p>
                    <p>
                      One of our AYATRIO co-workers will reach out to you for further information and processing gift cards.
                    </p>
                    <div>
                      <button className="bg-black text-white rounded-3xl p-3 px-4 text-xs font-semibold">
                        Buy AYATRIO Gift Card for Business
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Three options with images section ends */}
          <div className="md:w-1/2 flex">
            <p>
              You will be directed to a third-party site operated by a trusted
              partner, Frizbee
              (https://AYATRIOin.frizbee-solutions.com/home/digital) You can
              always return to finish your shopping on AYATRIO.in
            </p>
          </div>
          {/* image and text section starts */}
          <section>
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="md:w-1/2">
                <Image
                  width={750}
                  height={1001}
                  src="/images/customerservice/GiftCardsImg/woman-holding-jar.jpg"
                  alt="woman holding jar"
                />
              </div>
              <div className="space-y-6 md:w-1/2">
                <h2 className="font-bold text-2xl">
                  An AYATRIO Gift Card is always a great surprise!{" "}
                </h2>
                <p>
                  Everyone loves receiving an AYATRIO Gift Card. Whether that’s
                  to mark a birthday, for a special occasion or just to show how
                  much you care.
                </p>
                <p>
                  With an AYATRIO Gift Card they can choose just what they
                  always wanted. Which will make you happy too.
                </p>
                <p className="underline">Buy an AYATRIO Gift Card</p>
                <p className="underline">Check the Gift Card balance</p>
                <p className="underline">FAQs</p>
              </div>
            </div>
          </section>
          {/* check gift card balance section starts */}
          <section>
            <div className="flex flex-col gap-3 lg:flex-row w-full">
              <div className="flex flex-col gap-3 lg:w-1/2">
                <h2 className="font-bold text-2xl">
                  Check the balance of your gift or refund card
                </h2>
                <p>
                  To check your card balance, first, log in. Then fill in your
                  card number and if applicable, a pin code. If your card has an
                  expiration date, this will also be shown. Once you use your
                  card, the balance on your card will also appear on the
                  receipt.
                </p>
                <div className="flex flex-col md:flex-row gap-3">
                  <button className="md:w-1/2 border-2 border-black rounded-full px-5 py-4 font-bold">
                    Sign Up
                  </button>
                  <button className="md:w-1/2 border-2 bg-blue-800 rounded-full px-5 py-4 font-bold text-white">
                    Log in
                  </button>
                </div>
              </div>
              <div className="lg:mr-8 lg:w-1/2">
                <svg
                  width={300}
                  viewBox="0 0 359 247"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_840_70921)">
                    <path
                      d="M16 24C16 17.3726 21.3726 12 28 12H331C337.627 12 343 17.3726 343 24V215C343 221.627 337.627 227 331 227H28C21.3726 227 16 221.627 16 215V24Z"
                      fill="white"
                    ></path>
                    <rect
                      x="16"
                      y="112"
                      width="327"
                      height="8"
                      fill="#111111"
                    ></rect>
                  </g>
                  <rect
                    x="240"
                    y="12"
                    width="215"
                    height="7.99999"
                    transform="rotate(90 240 12)"
                    fill="#111111"
                  ></rect>
                  <path
                    d="M275 143L236.098 113.836M236.098 113.836C218.16 113.404 185.526 103.467 201.086 78.1906C215.999 63.2849 236.098 78.1903 236.098 92.4488C236.098 104.114 234.728 106.791 236.098 113.836Z"
                    stroke="#111111"
                    stroke-width="8"
                  ></path>
                  <path
                    d="M195 144L235.398 113.603M235.398 113.603C254.026 113.153 287.916 102.796 271.757 76.4522C256.271 60.9166 235.398 76.4518 235.398 91.3128C235.398 103.471 236.821 106.261 235.398 113.603Z"
                    stroke="#111111"
                    stroke-width="8"
                  ></path>
                  <text
                    x="32.696"
                    y="42.12"
                    className="gcbalance-gift-card-header"
                    font-size="12"
                    font-family="Arial"
                    fill="black"
                  >
                    AYATRIO
                  </text>


                  <text
                    x="32.696"
                    y="105"
                    className="gcbalance-gift-card-expiry"
                    font-size="16"
                    font-family="Arial"
                    fill="black"
                  >
                    <tspan></tspan>
                  </text>

                  <defs>
                    <filter
                      id="filter0_d_840_70921"
                      x="0"
                      y="0"
                      width="359"
                      height="247"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      ></feFlood>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                      <feOffset dy="4"></feOffset>
                      <feGaussianBlur stdDeviation="8"></feGaussianBlur>
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      ></feColorMatrix>
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_840_70921"
                      ></feBlend>
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_840_70921"
                        result="shape"
                      ></feBlend>
                    </filter>
                  </defs>
                </svg>

              </div>
            </div>
          </section>
          <hr />
          {/* gift card faq section starts */}
          <section>
            <div className="flex flex-col gap-5 w-full">
              <h3 className="font-bold text-xl">FAQs</h3>
              {giftCardFaqs.map((curElement) => {
                return (
                  <div className="space-y-1 md:w-1/2">
                    <h3 className="font-bold text-lg">{curElement.question}</h3>
                    <p>{curElement.answer}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
