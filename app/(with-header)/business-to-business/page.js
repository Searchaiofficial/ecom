import Commercial from "@/components/Business/Commercial";
import Home from "@/components/Business/HomePage";
import Nav from "@/components/Business/Nav";
import Projects from "@/components/Business/Projects";
import Purchasing from "@/components/Business/Purchasing";
import Recomend from "@/components/Business/Recomend";
import Service from "@/components/Business/Service";
import Tips from "@/components/Business/Tips";

const page = () => {
  return (
    <div>
      <Nav />
      <Home />
      <Recomend />
      <Commercial />
      <Projects />
      <Service />
      <Purchasing />
      <Tips />
    </div>
  );
};

export default page;
