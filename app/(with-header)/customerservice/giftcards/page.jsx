import Image from "next/image";
import React from "react";
import { giftCardFaqs } from "@/Model/GiftCardsFaqData/GiftCardsFaqData";

const GiftCards = () => {
  return (
    <div>
      <div className="mt-20 sm:px-[50px] px-[20px]  space-y-10">
        <div className="space-y-7">
          <h1 className="font-bold text-4xl">AYATRIO Gift Cards</h1>
          <hr />
          {/* Three options with images section starts */}
          <section>
            <div className="flex flex-col space-x-5 space-y-5 w-full items-center">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col">
                  <div>
                    <Image width={600} height={338} src="/customerservice/GiftCardsImg/gift1.avif" alt="gift1" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-xl">Digital Gift Card</h2>
                    <p>
                      You can buy one or more AYATRIO Gift cards with any value
                      up to 10,000 INR through our website, in just a few steps.
                      Your AYATRIO Gift card is emailed straight to your inbox.
                      Bought gift cards can only be redeemed in stores (for
                      now).
                    </p>
                    <p>
                      Share the gift card number and its PIN with any of our
                      checkout co-workers for gift card redemption.
                    </p>
                    <div>
                      <button className="bg-black text-white rounded-3xl py-2 px-4 text-sm font-semibold">
                        Buy AYATRIO Gift Card online
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="lg:mt-16">
                    <Image
                      width={600}
                      height={338}
                      src="/customerservice/GiftCardsImg/gift2.avif"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-xl">Physical Gift Card</h2>
                    <p>
                      You can buy a physical AYATRIO Gift Card with any value up
                      to 10,000 INR at AYATRIO stores (in Hyderabad, Mumbai
                      (Navi Mumbai, Worli, RCity) and Bangalore (Nagasandra).
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="lg:mt-16">
                    <Image
                      width={600}
                      height={338}
                      src="/customerservice/GiftCardsImg/gift3.avif"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-xl">
                      Interested in buying Gift Cards for your business
                      (employee and business contacts) ?{" "}
                    </h2>
                    <p>
                      Please submit a gift card request by filling out the
                      webform. To access the webform, click the link below,
                      Enter your company details and upload any files if needed.
                    </p>
                    <p>
                      One of our AYATRIO co-workers will reach out to you for
                      further information and processing gift cards.{" "}
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
                  src="/customerservice/GiftCardsImg/woman-holding-jar.avif"
                  alt=""
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
                      d="M327.992 210H272V188H328L327.992 210Z"
                      fill="#0058A3"
                    ></path>
                    <path
                      d="M273.091 199C273.091 204.317 284.367 208.734 300 208.734C315.633 208.734 326.9 204.325 326.9 199C326.9 193.674 315.625 189.265 299.992 189.265C284.359 189.265 273.091 193.682 273.091 199Z"
                      fill="#FFDB00"
                    ></path>
                    <path
                      d="M298.411 202.121C298.588 202.369 298.78 202.602 299.005 202.812H292.946C292.946 202.579 292.721 202.105 292.456 201.733C292.192 201.36 290.811 199.318 290.811 199.318V202.121C290.811 202.354 290.811 202.579 290.932 202.812H285.884C286.004 202.579 286.004 202.354 286.004 202.121V195.46C286.004 195.227 286.004 195.002 285.884 194.769H290.932C290.811 195.002 290.811 195.227 290.811 195.46V198.364C290.811 198.364 292.424 196.337 292.793 195.856C293.074 195.499 293.419 194.995 293.419 194.762H298.684C298.323 194.995 297.922 195.414 297.593 195.802C297.304 196.143 295.666 198.076 295.666 198.076C295.666 198.076 298.09 201.663 298.411 202.121ZM299.992 195.46V202.121C299.992 202.354 299.992 202.579 299.872 202.812H309.614V200.584C309.374 200.7 309.141 200.7 308.9 200.7H304.799V199.644H308.74V197.952H304.799V196.896H308.9C309.141 196.896 309.374 196.896 309.614 197.005V194.777H299.88C299.992 195.002 299.992 195.227 299.992 195.46ZM323.121 202.121C323.201 202.377 323.337 202.61 323.514 202.812H318.233C318.257 202.579 318.169 202.354 318.073 202.121C318.073 202.121 317.993 201.935 317.88 201.663L317.832 201.546H314.791L314.742 201.663C314.742 201.663 314.654 201.888 314.574 202.121C314.494 202.354 314.405 202.579 314.437 202.812H310.272C310.441 202.61 310.569 202.377 310.65 202.121C310.786 201.756 312.953 195.98 313.145 195.46C313.234 195.227 313.322 195.002 313.29 194.769H320.328C320.264 195.002 320.392 195.227 320.48 195.46C320.689 195.973 322.944 201.671 323.121 202.121ZM317.166 199.846C316.781 198.876 316.468 198.069 316.428 197.983C316.363 197.812 316.307 197.634 316.267 197.455C316.235 197.634 316.179 197.812 316.123 197.983C316.099 198.061 315.786 198.876 315.425 199.846H317.166ZM283.492 194.769H278.003C278.123 195.002 278.123 195.227 278.123 195.46V202.121C278.123 202.354 278.123 202.579 278.003 202.812H283.492C283.372 202.579 283.372 202.354 283.372 202.121V195.46C283.372 195.227 283.372 194.995 283.492 194.769ZM321.435 195.406C321.411 194.839 321.869 194.366 322.455 194.35C322.479 194.35 322.503 194.35 322.527 194.35C323.121 194.342 323.61 194.8 323.618 195.367C323.618 195.383 323.618 195.39 323.618 195.406C323.634 195.988 323.161 196.477 322.551 196.493C321.949 196.508 321.443 196.05 321.427 195.46C321.435 195.445 321.435 195.421 321.435 195.406ZM321.652 195.406C321.652 195.872 322.037 196.252 322.527 196.26C323.008 196.26 323.402 195.887 323.41 195.414C323.41 194.948 323.024 194.568 322.535 194.56C322.069 194.544 321.676 194.894 321.66 195.344C321.652 195.367 321.652 195.383 321.652 195.406ZM322.31 196.035H322.118V194.769H322.607C322.84 194.777 323.016 194.956 323.016 195.181C323.016 195.336 322.928 195.476 322.784 195.553L323.065 196.043H322.848L322.591 195.592H322.31V196.035ZM322.31 195.406H322.575C322.703 195.414 322.816 195.321 322.816 195.196C322.824 195.072 322.727 194.963 322.599 194.963C322.591 194.963 322.583 194.963 322.575 194.963H322.31V195.406Z"
                      fill="#0058A3"
                    ></path>
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
                    ></text>
                    <text
                      x="32.696"
                      y="65"
                      className="gcbalance-gift-card-amount"
                    ></text>
                    <text
                      x="32.696"
                      y="87"
                      className="gcbalance-gift-card-expiry"
                    ></text>
                    <text x="32.696" y="105" className="gcbalance-gift-card-expiry">
                      <tspan></tspan>
                    </text>
                    <text x="32.696" y="215" className="gcbalance-gift-card-number">
                      {" "}
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
