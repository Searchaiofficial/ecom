const imageAndText = [
  {
    id: 1,
    image:
      "https://www.ikea.com/images/the-AYATRIO-concept-004ebaa480e36c98ba9c2e91da43c822.jpg?f=l",
    heading: "The AYATRIO Concept",
    text: "At the heart of the AYATRIO concept is our vision - to create a better everyday life for the many people.",
  },
  {
    id: 2,
    image:
      "https://www.ikea.com/images/democratic-design-82727d9deee161fbc60598a2271e2841.jpg?f=l",
    heading: "Designed for everyone",
    text: "We feel good design combines form, function, quality, sustainability at a low price. We call it “Democratic Design” - we believe good home furnishing is for everyone.",
  },
  {
    id: 3,
    image:
      "https://www.ikea.com/images/about-the-AYATRIO-group-69242bfcf22bdb060445b2d29c8c9c3c.jpg?f=l",
    heading: "About AYATRIO",
    text: "We are a values-driven company with a passion for life at home, and the best home furnishing solutions. The AYATRIO Group has 420 plus stores in 50 countries.",
  },
  {
    id: 4,
    image:
      "https://www.ikea.com/images/working-at-the-AYATRIO-group-99dd7504ad25073925a132fac00ea2a6.jpg?f=l",
    heading: "Working at AYATRIO",
    text: "We believe that each and everyone has something unique to offer. So discover what it’s like to work at AYATRIO, and see our available jobs.",
  },
  {
    id: 5,
    image:
      "https://www.ikea.com/images/AYATRIO-in-india-d81cb3da3c2ce43305140c29a0de0100.png?f=l",
    heading: "AYATRIO in India",
    text: "AYATRIO is committed to India for the long term. Delhi NCR, Mumbai, and Bangalore are identified among the fast-growing cities for Ingka Group globally. In India, Our ambition is to reach 100 million people in India by 2022. We will establish a strong omnichannel presence in the markets and are also exploring other opportunities in India. It will be through a combination of big AYATRIO stores, smaller city-center stores, and online platforms.  The AYATRIO Hyderabad store has completed 2+ years. We are today online in Mumbai, Pune, and Hyderabad. Our Navi Mumbai store opened in December 2020 and two smaller stores will also open in Mumbai during 2021.  As a modern home furnishings retailer, AYATRIO will bring best practices from our 75+ years of experience, create employment opportunities, provide skill & competence and increase manufacturing, thereby creating a positive impact on the State, society, and the many people.",
  },
  {
    id: 6,
    image:
      "https://www.ikea.com/images/3f/55/3f55eb7cad9507842d35ecd80c1c210d.jpg?f=l",
    heading: "Community Engagement",
    text: "We work hard to be the good neighbour and to support local and global causes through our product development and with the help of the AYATRIO Foundation. ",
  },
  {
    id: 7,
    image:
      "https://www.ikea.com/images/02/bf/02bfe1e554ad61854b4f4aa7b110b26e.jpg?f=l",
    heading: "AYATRIO Highlights",
    text: "Check out this year’s top stories from around the AYATRIO world. AYATRIO Highlights is about people, life at home, design and innovation. From the future of augmented reality to giving plastic PET bottles a new lease on life, this is where we celebrate the very best of last year, 2018.",
  },
];

const ThisIsAyatrioPage = () => {
  return (
    <div>
      <div className="mt-20 px-[15px] space-y-10">
        {/* THis is ayatrio section starts */}
        <section>
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col md:w-2/3 space-y-5">
              <h1 className="font-bold text-4xl">This is AYATRIO</h1>
              <p className="font-bold text-lg">
                A better everyday life for the many people.
              </p>
              <p>
                AYATRIO is a global leader in life at home. Founded in Sweden in
                1943, AYATRIO is now a worldwide retailer of affordable,
                well-designed products and solutions for every room in your
                home. Our values and optimism are shared with millions of
                co-workers and customers around the world. Along with our desire
                to champion sustainable living, responsible sourcing, and
                communities in need of support.
              </p>
            </div>
          </div>
        </section>
        {/* THis is ayatrio section ends */}
        <hr />
        {/* Commitment section starts */}
        <section>
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="flex font-bold text-xl">
                Our commitment to Safety, Sustainability, and Forestry.
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="md:w-1/2">
                <img src="https://www.ikea.com/images/83/7b/837b3688ea3b79553ae68bef9b798174.jpg?f=l" />
              </div>
              <div className="md:w-1/2 flex flex-col gap-5">
                <h4 className="font-bold text-xl">Safety </h4>
                <p>
                  Product safety is a top priority for AYATRIO. It’s integrated
                  into our ways of working. Our entire business, from the
                  supplier to the co-workers on our store floors, work towards
                  safety day-in, day-out. At AYATRIO we believe that children are
                  the most important people in the world and the safety of our
                  products especially children’s products is of the highest
                  priority.
                </p>
                <p>
                  AYATRIO has 75 years’ experience in everyday life at home. For
                  years, AYATRIO has taken a proactive approach to develop
                  innovative solutions to further enhance product safety and
                  user-friendliness. For example, AYATRIO was one of the first
                  furniture companies to introduce cordless blinds and to phase
                  out harmful chemicals.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="md:w-1/2 flex flex-col gap-4">
                <h4 className="font-bold text-xl">Sustainability </h4>
                <p>
                  At AYATRIO, we are committed to having a positive impact on
                  people and the planet. Our ambition is to make a better
                  everyday life within the limits of the planet, a desirable
                  choice that is affordable, attractive and accessible for as
                  many people as possible.
                </p>
                <p>
                  Unsustainable consumption is one of the world’s biggest global
                  challenges. We are committed to promoting sustainable
                  consumption, but we know we cannot achieve our ambitions
                  alone. Our approach involves taking the lead and joining
                  forces with others, including governments, through advocacy,
                  collaboration, and business partnerships.
                </p>
                <p>
                  We are exploring circular business models that will enable us
                  to achieve our ambitions, but we do not know yet what the best
                  commercially scalable and viable solutions will be.
                </p>
                <p>
                  The low price does not mean low-quality or unsustainable. Just
                  as high price does not mean high quality and sustainable. We
                  want to make the products in our range available to many
                  people. Keeping prices low is a cornerstone of our business
                  idea. But this must never come at the expense of people and
                  the environment.
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="https://www.ikea.com/images/41/1a/411adc57f255b5e3d50d4b83ed173600.jpg?f=l" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="md:w-1/2">
                <img src="https://www.ikea.com/images/de/e8/dee812259e8cf16691e9845e452b05e2.jpg?f=l" />
              </div>
              <div className="md:w-1/2 flex flex-col gap-4">
                <h4 className="font-bold text-xl">Forestry </h4>
                <p>
                  At AYATRIO we believe in taking responsibility for ensuring that
                  the materials we source for our products are used in the most
                  efficient way. For wood we work to create more from less,
                  minimizing waste and using as much of the raw wood material as
                  possible.
                </p>
                <p>
                  At AYATRIO we have decided to work with the highest available
                  standards in the industry in terms of protecting responsible
                  forestry. We don’t allow any wood in our supply chain from
                  forest areas that are illegal or contains high conservation
                  values, or from forest areas with social conflict.
                </p>
                <p>
                  Being Forest Positive is also about going beyond our own
                  product material needs and promoting responsible forest
                  management for the benefit of people and the planet.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr />
        {/* Commitment section ends */}
        {/* 2 images section starts */}
        <section>
          <div className="flex flex-col md:flex-row gap-5 w-full items-center">
            <div className="flex flex-col space-y-6">
              <img src="https://www.ikea.com/images/culture-and-values-750871d9062a600de86c849095fea8ab.jpg?f=l" />
              <h4 className="font-bold">Culture & Values</h4>
              <p>
                We are a diverse group of people working together, sharing the
                humanistic AYATRIO values. The values are the foundation of our
                work. By living them, we form the unique AYATRIO culture where team
                spirit and togetherness are key.
              </p>
              <p className="underline">Know more</p>
            </div>
            <div className="flex flex-col space-y-6">
              <img src="https://www.ikea.com/images/people-and-planet-sustainable-5020dab7e0a3ee2faf47b5de5ce287fa.jpg?f=l" />
              <h4 className="font-bold">Being Sustainable</h4>
              <p>
                Working for a positive impact on people and the planet is about
                supporting a healthier and more sustainable life at home, using
                energy and resources in a more sustainable way and taking
                responsibility for people and communities.
              </p>
              <p className="underline">Know more</p>
            </div>
          </div>
        </section>
        {/* 2 images section ends */}
        <hr />
        {/* half image and half text section starts */}
        <section>
          <div className="flex flex-col space-y-10 w-full">
            {imageAndText.map((curElement) => {
              return (
                <div className="flex flex-col md:flex-row gap-5 w-full">
                  <div className="md:w-1/2">
                    <img src={curElement.image} />
                  </div>
                  <div className="md:w-1/2 flex flex-col gap-4">
                    <h4 className="font-bold text-xl">{curElement.heading}</h4>
                    <p>{curElement.text}</p>
                    <p className="underline">Know more</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* half image and half text section ends */}
      </div>
    </div>
  );
};

export default ThisIsAyatrioPage;
