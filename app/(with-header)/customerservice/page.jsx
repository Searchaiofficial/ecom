'use client'
import dynamic from "next/dynamic";
import Image from "next/image";
import { servicesData, gridDataRow1, gridDataRow2 } from "@/Model/CustomerServiceData/CustomerServiceData";
import Faq from '../../../components/CustomerServiceFAQ/Faq.jsx'

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
        router.push("/customerservice/faq");
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
    <div className="">
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
        {/* edited */}
        <h1 className="text-black text-4xl font-bold mb-12 pr-3">
          Frequently asked questions
        </h1>
        <div className=''>
          <h1 className="text-black text-3xl font-bold mb-12 px-3">
            How to check stock availability
          </h1>
          <div className="md:w-2/3 mt-6">

            <ol className="px-10 opacity-80 list-disc text-justify">
              <li className="mb-3">Always check your desired product’s availability here on our website or in the IKEA app before you visit your local IKEA store. We update stock status for our products every few hours. </li>
              <li className="mb-3">The best way to get the latest stock status is to visit the product page or listing pages of the item you are interested in and check its availability at your local IKEA store. When checking on our listing page, an indicator for your local store will display as well as possibility for delivery. </li>
              <li className="mb-3">If the product you are looking for is out of stock at your local store, you can click on the 'check other IKEA stores' link to view inventory from our other locations.</li>
              <li className="mb-3">You can also select 'notify me' and you will receive a communication from IKEA when your product is back in stock. Note that stock shipments are limited and tend to be purchased quickly, so we encourage you to use our click and collect service to secure the products you want or visit your local store first thing in the morning.  </li>
              <li className="mb-3">Products that show the status 'Few in stock' may not be available for purchase online because their limited stock level means we can’t guarantee that they will still be available at time of purchase.</li>
              <li className="mb-3">Please note – the stock status you see online or in the IKEA app is the same information that our customer service co-workers have access to. If you need further support, please see the FAQ below or connect with us via Chat.</li>
              <li className="mb-3">Before you visit be sure to download our shopping app – it is a great way to check out what IKEA has to offer and also to even check for stock while you are shopping in store!</li>
            </ol>

          </div>
          <hr className="mt-20 mb-10" />

        </div>
        <div className=''>
          <h1 className="text-black text-3xl font-bold mb-12 px-3">
            Orders
          </h1>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            General
          </h1>
          <section id="faq">
            <Faq faqFor='general' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Missing Items
          </h1>
          <section id="faq">
            <Faq faqFor='missing_items' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Damaged Items
          </h1>
          <section id="faq">
            <Faq faqFor='damaged_items' />
            <hr className="mt-20 mb-10" />
          </section>


          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Missing Parts or Hardware
          </h1>
          <section id="faq">
            <Faq faqFor='missing_parts_hardware' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Order Changes
          </h1>
          <section id="faq">
            <Faq faqFor='order_changes' />
            <hr className="mt-20 mb-10" />
          </section>

        </div>
        <div className=''>
          <h1 className="text-black text-3xl font-bold mb-12 px-3">
            Services
          </h1>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Delivery
          </h1>
          <section id="faq">
            <Faq faqFor='delivery' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Mattresses
          </h1>
          <section id="faq">
            <Faq faqFor='mattresses' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Assembly
          </h1>
          <section id="faq">
            <Faq faqFor='assembly' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Kitchen Services
          </h1>
          <section id="faq">
            <Faq faqFor='kitchen_services' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Click & Collect
          </h1>
          <section id="faq">
            <Faq faqFor='click_and_collect' />
            <hr className="mt-20 mb-10" />
          </section>


          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Local Pick Up Points
          </h1>
          <section id="faq">
            <Faq faqFor='local_pick_up_points' />
            <hr className="mt-20 mb-10" />
          </section>

        </div>
        <div className=''>
          <h1 className="text-black text-3xl font-bold mb-12 px-3">
            Payment
          </h1>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Payment
          </h1>
          <section id="faq">
            <Faq faqFor='payment' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Coupons & Offers
          </h1>
          <section id="faq">
            <Faq faqFor='offers' />
            <hr className="mt-20 mb-10" />
          </section>


          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Gift Cards
          </h1>
          <section id="faq">
            <Faq faqFor='gift_cards' />
            <hr className="mt-20 mb-10" />
          </section>


          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Gift Registry
          </h1>
          <section id="faq">
            <Faq faqFor='gift_registry' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            IKEA Financing
          </h1>
          <section id="faq">
            <Faq faqFor='financing' />
            <hr className="mt-20 mb-10" />
          </section>

        </div>

        <div className=''>
          <h1 className="text-black text-3xl font-bold mb-12 px-3">
            Product Information
          </h1>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Product Questions
          </h1>
          <section id="faq">
            <Faq faqFor='product_questions' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Product Availability
          </h1>
          <section id="faq">
            <Faq faqFor='product_availability' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Product Warranties
          </h1>
          <section id="faq">
            <Faq faqFor='product_warranties' />
            <hr className="mt-20 mb-10" />
          </section>


          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Product Recalls
          </h1>
          <section id="faq">
            <Faq faqFor='product_recalls' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Return Policy
          </h1>
          <section id="faq">
            <Faq faqFor='return_policy' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Ayatrio Stores
          </h1>
          <section id="faq">
            <Faq faqFor='ayatrio_stores' />
            <hr className="mt-20 mb-10" />
          </section>

          <h1 className="text-black text-xl font-semibold mb-12 px-3">
            Other
          </h1>
          <section id="faq">
            <Faq faqFor='others' />
            <hr className="mt-20 mb-10" />
          </section>
        </div>
        {/* edited */}



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
