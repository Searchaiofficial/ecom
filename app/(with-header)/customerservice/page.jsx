'use client'
import dynamic from "next/dynamic";
import Image from "next/image";
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'))
const FAQSwiper = dynamic(() => import('@/components/FAQSwiper/FAQSwiper'))
import { servicesData, gridDataRow1, gridDataRow2 } from "@/Model/CustomerServiceData/CustomerServiceData";

import "@/components/styles/CustomerServicePage.css";
import { useRouter } from "next/navigation";

//switch statements will be better
const CustomerServicePage = () => {
  const router = useRouter();
  const handleOptionClick = (id) => {
    switch (id) {
      case 1:
        router.push("/");
        break;
      case 2:
        router.push("/customerservice/services");
        break;
      case 3:
        router.push("/customerservice/shoppinginfo");
        break;
      case 4:
        router.push("/faq");
        break;
      case 5:
        router.push("/customerservice/returnpolicy");
        break;
      case 6:
        router.push("/customerservice/giftcards");
        break;
      case 7:
        router.push("/customerservice/priceguarantee");
        break;
      case 8:
        router.push("/customerservice/contactus");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <div className="w-full">
      <div className="pt-36 sm:px-[50px] px-[20px] sm:space-y-10 space-y-5 ">
        <div className="space-y-6 ">
          <h1 className="font-bold text-4xl">Customer Service</h1>
          <div className="service-container">
            {servicesData.map((option, id) => {
              return (
                <div
                  className="service-item hover:underline cursor-pointer"
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <Image width={400} height={225} src={option.image} alt="" />
                  <p className="text-sm">{option.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="font-bold text-2xl">Helping you help yourself </h2>
          <p className="">
            Looking to check the status of your order? Want to return a product
            or order a spare part? We have convenient self service options which
            will let you do just that!{" "}
          </p>
        </div>
        {/* Section of grid starts */}
        <section>
          <div>
            <div className="grid-row-1">
              {gridDataRow1.map((gridItem) => {
                return (
                  <div className="bg-gray-200 py-10 px-5 border border-white text-center">
                    <h3 className="font-bold">{gridItem.heading}</h3>
                    <p>{gridItem.text}</p>
                    <p className="underline text-gray-500">Read more</p>
                  </div>
                );
              })}
            </div>
            <div className="grid-row-2">
              {gridDataRow2.map((gridItem) => {
                return (
                  <div className="bg-gray-200 py-10 px-5 border border-white text-center">
                    <h3 className="font-bold">{gridItem.heading}</h3>
                    <p>{gridItem.text}</p>
                    <p className="underline text-gray-500">Read more</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FAQ />

        {/* Still have questions section starts */}
        <section>
          <div className="flex space-y-9 flex-col">
            <div>
              <h2 className="font-bold text-xl">
                Do you still have questions?
              </h2>
              <p className="max-w-[900px]">
                To help you the best way possible, you can now look for a
                solution in a more targeted way. If you can't find the answer,
                we will offer you the best way to get in contact with us.
              </p>
            </div>
            <div>
              <button onClick={() => router.push('/customerservice/contactus')} className="bg-black text-white rounded-3xl p-3 px-4 text-sm font-semibold">
                Contact us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerServicePage;
