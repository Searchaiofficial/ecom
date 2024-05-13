import Image from "next/image";

const gridData = [
  {
    id: 1,
    image: "/sustainabilityImg/sustain1.avif",
    text: "Energy and resources",
  },
  {
    id: 2,
    image: "/sustainabilityImg/sustain2.avif",
    text: "Healthy living",
  },
  {
    id: 3,
    image: "/sustainabilityImg/sustain3.avif",
    text: "Large business, large responsibilities",
  },
  {
    id: 4,
    image: "/sustainabilityImg/sustain4.avif",
    text: "More ways to save water",
  },
  {
    id: 5,
    image: "/sustainabilityImg/sustain5.avif",
    text: "A brighter life at home with LED",
  },
  {
    id: 6,
    image: "/sustainabilityImg/sustain6.avif",
    text: "Less waste, more value",
  },
  {
    id: 7,
    image: "/sustainabilityImg/sustain7.avif",
    text: "Switch on some sustainable light",
  },
  {
    id: 8,
    image: "/sustainabilityImg/sustain8.avif",
    text: "Community Engagement",
  },
];

const SustainabilityPage = () => {
  return (
    <div>
      <div className="mt-20 sm:px-[50px] px-[20px] p-10 space-y-10">
        {/* Being sustainable section starts */}
        <section>
          <div className="flex flex-col md:w-2/3 space-y-10">
            <div className="flex flex-col space-y-5">
              <h1 className="font-bold text-4xl">Being sustainable</h1>
              <p>
                How sustainable is AYATRIO? Well, with kitchen fronts made of
                recycled plastic bottles, taps that save on water and
                electricity, being a leading light on LED...it's clear we want
                to inspire change. Because, as the founder of AYATRIO, Ingvar
                Kamprad, once said: ‘No method is more effective than the good
                example.’
              </p>
              <p>
                That's why we work hard everyday to be that good example, and to
                help you to be too.
              </p>
            </div>
            <div>
              <p className="underline font-bold">
                Highlights from the AYATRIO Sustainability Report FY21
              </p>
              <p>
                In a challenging year, when life at home has been more important
                than ever before, we were guided by our values to quickly adapt
                to meet the new needs of many people. Ingka Group has focused
                its efforts towards supporting communities and partners along
                the value chain, reaching those most in need during the
                pandemic. Despite the challenges, the company continues to
                progress on sustainability goals whilst delivering robust
                performance, allowing for continued investments in omnichannel
                and sustainability.
              </p>
              <p>
                The new Ingka Group Annual Summary & Sustainability Report
                reveals that for the first time, the company produced more
                renewable energy than it consumed in its operations, as it
                continues to build back better.
              </p>
            </div>
          </div>
        </section>
        {/* Being sustainable section ends */}
        <hr />
        {/* main grid section starts */}
        <section>
          <div className="flex flex-col space-y-6">
            <div className="flex font-bold text-lg underline">
              AYATRIO Sustainability Report FY-21
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-7">
              {gridData.map((curElement) => {
                return (
                  <div className="flex flex-col space-y-1 cursor-pointer hover:underline">
                    <Image width={600} height={338} src={curElement.image} alt="" />
                    <p className="font-bold text-xl">{curElement.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* main grid section ends */}
      </div>
    </div>
  );
};

export default SustainabilityPage;
