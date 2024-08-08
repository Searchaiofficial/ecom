import Commercial from "@/components/Business/Commercial";
import Home from "@/components/Business/HomePage";
import Nav from "@/components/Business/Nav";
import Projects from "@/components/Business/Projects";
import Recomend from "@/components/Business/Recomend";

import Purchasing from "@/components/Business/Purchasing";

import MulticardService from "@/components/Cards/MultiCardService";

const page = () => {
  return (
    <div className="md:mt-36 mt-10">
      <Nav />
      <Home />
      <Recomend />
      <Commercial />
      <Projects />
      <Purchasing />

      <MulticardService />
    </div>
  );
};

export default page;
