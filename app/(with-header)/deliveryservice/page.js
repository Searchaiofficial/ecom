import Image from "next/image";

const DeliveryServicePage = () => {
  return (
    <div>
      <div className="mt-20 sm:px-[50px] px-[20px] p-10 space-y-10">
        {/* Delivery Service section starts */}
        <section>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col space-y-5">
              <h1 className="font-bold text-4xl">Delivery Service</h1>
              <div className="flex flex-col md:flex-row w-full space-x-4">
                <div className="md:w-1/2">
                  <Image width={600} height={338} src="/DeliveryServiceImg/truck.avif" alt="truck" />
                </div>
                <div className="flex-col space-y-7 md:w-1/2">
                  <p>
                    We can deliver your AYATRIO purchases to your home or
                    workplace. We can deliver to your front door, or we can take
                    your delivery items all the way into your room of choice.
                  </p>
                  <p>
                    Delivery excludes plants, food, and fragile objects and
                    articles from AS-IS. For AS-IS deliveries, please speak to a
                    member of staff in our AS-IS section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        {/* Slabs for delivery section starts */}
        <section>
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-4">
              <h2 className="font-bold text-xl mb-2">
                Slabs for delivery prices{" "}
              </h2>
              <p>
                Below prices are only applicable for Mumbai, Hyderabad,
                Bangalore, Surat, Vadodara, Ahmedabad, and Pune:
              </p>

              <ul className="list-disc pl-6">
                <li>0 to 5 kgs - Rs.99</li>
                <li>5 to 12 kgs - Rs.199</li>
                <li>12 to 20 kgs - Rs.299</li>
                <li>20 to 60 kgs - Rs.499</li>
                <li>60 to 100 kgs - Rs.799</li>
                <li>100 to 150 kgs - Rs.1499</li>
                <li>150 to 200 kgs - Rs.2499</li>
                <li>200 to 500 kgs - Rs.3999</li>
                <li>500 kgs+ - Please talk to a co-worker.</li>
              </ul>
              <p className="mt-4">
                For deliveries to addresses outside these areas, please talk to
                a co-worker at the home delivery desk after the checkout area.
              </p>
            </div>
            <div className="flex flex-col space-y-4 md:w-1/2">
              <div>
                <p className="font-bold text-lg underline">Kitchen Delivery Costs:</p>
              </div>
              <p>
                Our delivery price for kitchens is Rs.1,999 and can be delivered
                within 2 to 30 days. This price includes storage up to the
                agreed delivery date for up to 30 days.
              </p>
              <p>From 31 days, a storage charge of Rs. 250 per day applies.</p>
              <p>
                If you have any questions about delivery, please talk to one of
                our co-workers at any sales desk or the home delivery desk,
                which is after the checkout area.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeliveryServicePage;
