import { imageAndText, shoppingGuide, shoppingProcess, storeDetails } from "@/Model/ShoppingInfoData/ShoppingInfoData";
import Image from "next/image";

export default function ShoppingInfo() {
  const discoverMore = [
    "Customer service",
    "Frequently Asked Questions",
    "We can help you shop",
  ];
  return (
    <div className="mt-20 sm:px-[50px] px-[20px]">
      <h1 className="font-bold text-4xl pb-6">Shopping at AYATRIO</h1>
      <div className="sm:flex sm:flex-row flex-col pb-6">
        <div className="basis-2/4 flex grow">
          <div>
            <p className="font-bold text-md">
              There are a few ways to shop at AYATRIO. Some of them let you shop
              from the comfort of your own home – although we’ll always have
              your favorite Swedish delicacy available at our restaurant for
              those that choose to visit the AYATRIO store.{" "}
            </p>
            <p className="font-bold text-md">
              Discover how to shop at AYATRIO and how AYATRIO can come to you,
              whether you’re looking for any support buy online, over the phone,
              or plan your dream home.
            </p>
          </div>
        </div>
        <div className="basis-2/4 flex grow">
          <div>
            <Image
              src="/customerservice/shoppingInfo/decor.avif"
              alt="decor"
              width={550}
              height={650}
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl mb-10">
        AYATRIO stores and order and collection point
      </h2>
      <div className="sm:flex sm:flex-row flex-col pb-6">
        <div className="basis-2/4 flex-grow">
          <Image
            src="/customerservice/shoppingInfo/shop.avif"
            alt="decor"
            width={600}
            height={300}
          />
        </div>
        <div className="basis-2/4 flex-grow">
          <div className="space-y-5 pl-2">
            <p>
              From the colour of your kitchen cabinets to the height of your
              houseplant, with AYATRIO, you’re in complete control. At our
              stores, you can get inspired, touch and feel our products, get
              professional help from one of our AYATRIO co-workers and get
              inspired.
            </p>
            <p>
              At our larger stores, you can buy products to take home the same
              day or collect products ordered online. They have everything you
              need for a family day out, from veggie balls to a playroom for the
              little ones.
            </p>
            <p>
              In smaller city-stores, you can touch and try products from our
              range, order for delivery or collection and buy selected products
              to take home the same day.
            </p>
            <p className="font-semibold">AYATRIO Large store </p>
            {shoppingGuide.map((curElement)=>{
              return(
                <p>{curElement.content}</p>
              )
            })}
            <li>
              Red tag means you can pick it up at Market Hall or the self-serve
              furniture area using the location info mentioned on the tag·
            </li>
            <li>
              Yellow tag means you need to contact our co-workers at the info
              counter
            </li>
            {shoppingProcess.map((curElement)=>{
              return(<p>{curElement.content}</p>)
            })}
            <div className="flex flex-col space-y-10 items-start mt-10">
              <button className="bg-black text-white rounded-3xl p-3 px-4 text-sm font-semibold">
                find you nearest AYATRIO store
              </button>
              <button className="bg-black text-white rounded-3xl p-3 px-4 text-sm font-semibold">
                Click & Collect
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-10">Know your store</h2>
      </div>
      <div className="flex flex-col gap-5 pb-8">
        {storeDetails.map((curElement)=>{
          return(<li>{curElement.content}</li>)
        })}
      </div>
      <hr />
      <div className="pt-10">
        {imageAndText.map((data) => {
          return (
            <div key={data.id} className="sm:flex sm:flex-row flex-col gap-3 pb-7">
              <div className="basis-2/4 flex-grow">
                <h2 className="font-bold text-xl pb-5">{data.heading}</h2>
                <div>
                  <Image
                    width={750}
                    height={422}
                    src={data.image}
                    alt=""
                    className="pb-5"
                  />
                </div>
              </div>
              <div className="basis-2/4 flex-grow pt-12 ">
                <div className="space-y-4">
                  <p>{data.text}</p>
                  <button className="bg-black text-white rounded-3xl p-3 px-4 text-sm font-semibold">
                    {data.textOnButton}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div>
        <h2 className="font-bold text-xl mb-10 mt-10">Need Something else?</h2>
        <h2 className="font-bold text-xl mb-10">
          Our customer support can help you in anything, from planning to
          buying.
        </h2>
        <button className="bg-black text-white rounded-3xl p-3 px-4 text-sm font-semibold">
          Contact us
        </button>
      </div>
      <h2 className="font-bold text-xl mb-10 mt-10">AYATRIO for Business</h2>
      <div className="sm:flex sm:flex-row flex-col gap-3 pb-8">
        <div className="basis-2/4 flex-grow">
          <div>
            <Image
              src="/customerservice/shoppingInfo/work.avif"
              width={600}
              height={300}
              alt=""
            />
          </div>
        </div>
        <div className="basis-2/4 flex-grow">
          <div className="space-y-4">
            <p>
              For a better everyday work life, AYATRIO for Business has a range
              of personalized services and design tools.
            </p>
            <p>
              If there’s anything you need help with when it comes to furnishing
              your business premises, you can discuss your ideas with design
              professionals, check out the online planning tools or visit the
              AYATRIO for Business team in store.
            </p>
            <p>
              We have inspiration for a range of industries including retail,
              office, residential interiors, hospitality furnishing for
              restaurants, cafés and accommodation.
            </p>
            <button className="bg-black text-white rounded-3xl p-3 px-4 text-sm font-semibold">
              AYATRIO for business
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-y-7">
          <p>Discover more</p>
          <hr />
        </div>
        {discoverMore.map((item) => {
          return (
            <div className="flex p-7 border-b-2 hover:underline cursor-pointer">
              <h3 className="text-lg font-bold">{item}</h3>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
