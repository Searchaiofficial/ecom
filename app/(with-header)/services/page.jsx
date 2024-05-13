export default function Services() {
    const gridDataRow1 = [
      {
        heading: "Kitchen planning tool",
        text: "Design your dream kitchen together with our specialists.",
      },
      {
        heading: "Personal shopper",
        text: "Your personal shopping assistance",
      },
      {
        heading: "Measuring service",
        text: "Measure your space before the planning",
      },
      {
        heading: "Interior design service",
        text: "Unleash the interior decorater in you with us",
      },
    ];
    
    const gridDataRow2 = [
      {
        heading: "Design your room",
        text: "Expert advice and inspiration to help you plan your interior",
      },
    ];
    
    const gridData2 = [
      {
        heading: "Click & Collect",
        text: "Order online and pick it up at a store of your choice",
      },
      {
        heading: "Home delivery",
        text: "We deliver your order to your home",
      },
    ];
    
    const gridData3 = [
      {
        heading: "Assembly service",
        text: "Our co-workers assemble your furniture for you.",
      },
      {
        heading: "Kitchen installation",
        text: "Advice for your ideal storage furniture.",
      },
    ];
    
    const gridData4 = [
      {
        heading: "Returns",
        text: "It’s ok to change your mind, we support you in the safest way.",
      },
    ];
    
    return (
      <div>
      <div className="mt-20 sm:ml-[50px] ml-[20px] sm:mr-[50px] mr-[20px] p-10 space-y-10">
        <section className="space-y-5">
          <div className="space-y-3 md:w-full">
            <div>
              <h1 className="font-bold text-4xl">Services</h1>
            </div>
            <div className="md:w-2/3">
              <p>
                At AYATRIO, you can do everything yourself. From collecting all
                your products in store, to transporting and assembling them. But
                of course, you don't have to. AYATRIO offers a wide range of
                useful services to help you purchase, transport and assemble
                your products.
              </p>
            </div>
          </div>
          <div className="space-y-3 md:w-full">
            <div>
              <h2 className="font-bold text-2xl">
                Furniture or interior advice
              </h2>
            </div>
            <div className="md:w-2/3">
              <p>
                Need help with designing your ideal PAX wardrobe or BESTÅ
                cabinet, designing your new kitchen or choosing the right
                storage furniture? Our specialists are ready to help you with
                advice, online or in-store.
              </p>
            </div>
          </div>
        </section>
        {/* Section of grid 1 starts */}
        <section>
            <div className="grid grid-cols-4 gap-0.5 mb-0.5">
            {gridDataRow1.map((data)=>{
              return (
                <div className="col-span-1 bg-gray-200 text-center p-5">
                <div className="font-bold">{data.heading}</div>
                <div>{data.text}</div>
                <div className="underline text-gray-500">Read more</div>
              </div>
              )
            })}
           
            </div>
            <div className="flex w-full">
              {gridDataRow2.map((gridItem) => {
                return (
                  <div className="flex w-full flex-col items-center text-center bg-gray-200 p-6">
                    <h3 className="font-bold">{gridItem.heading}</h3>
                    <p>{gridItem.text}</p>
                    <p className="underline text-gray-500">Read more</p>
                  </div>
                );
              })}
            </div>
          
        </section>
        {/* Section of grid 1 ends */}
        {/* Section of grid 2 starts */}
        <section>
          <div className="flex flex-col flex-wrap w-full space-y-5">
            <div className="space-y-3 md:w-full">
              <div>
                <h2 className="font-bold text-2xl">Delivery and transport</h2>
              </div>
              <div className="md:w-2/3">
                <p>
                  We make shopping easy. We can collect your articles for you in
                  the store so you only have to put them in your car. Or have
                  your order delivered to your home.
                </p>
              </div>
            </div>
            <div>
              <div className="md:flex md:flex-row md:w-full">
                {gridData2.map((gridItem) => {
                  return (
                    <div className="md:w-1/2 text-center bg-gray-200 p-6 border border-white">
                      <h3 className="font-bold">{gridItem.heading}</h3>
                      <p>{gridItem.text}</p>
                      <p className="underline text-gray-500">Read more</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* Section of grid 2 ends */}
        {/* Section of grid 3 starts */}
        <section>
          <div className="flex flex-col flex-wrap w-full space-y-5">
            <div className="space-y-3 md:w-full">
              <div>
                <h2 className="font-bold text-2xl">Assembly and install</h2>
              </div>
              <div className="md:w-2/3">
                <p>
                  Installing your kitchen or bathroom can be complicated. That's
                  why we can do it for you. Do you just want to have your BILLY
                  assembled? No problem, we do that too.
                </p>
              </div>
            </div>
            <div>
              <div className="md:flex md:flex-row md:w-full">
                {gridData3.map((gridItem) => {
                  return (
                    <div className="md:w-1/2 text-center bg-gray-200 p-6 border border-white">
                      <h3 className="font-bold">{gridItem.heading}</h3>
                      <p>{gridItem.text}</p>
                      <p className="underline text-gray-500">Read more</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* Section of grid 3 ends */}
        {/* Section of grid 4 starts */}
        <section>
          <div className="flex flex-col flex-wrap w-full space-y-5">
            <div className="flex flex-col w-full space-y-3">
              <h2 className="font-bold text-2xl">Returns and exchanges </h2>
              <p className="flex md:w-2/3">
                Feel free to change your mind, we have a good return policy.
              </p>
            </div>
            <div className="flex w-full space-x-1">
              {gridData4.map((gridItem) => {
                return (
                  <div className="w-full">
                    <div className="flex flex-col text-center bg-gray-200 p-6">
                      <h3 className="font-bold">{gridItem.heading}</h3>
                      <p>{gridItem.text}</p>
                      <p className="underline text-gray-500">Read more</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
    )
  }