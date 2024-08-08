// import Commercial from "@/Components/Business/Commercial/page";
import Commercial from "@/components/Business/Commercial/page";
import Home from "@/Components/Business/HomePage/page";
import Nav from "@/Components/Business/Nav/page";
import Projects from "@/Components/Business/Projects/Projects";
import Purchasing from "@/Components/Business/Purchasing/page";
import Recomend from "@/Components/Business/Recomend/page";
import Service from "@/Components/Business/Service/page";
import Tips from "@/Components/Business/Tips/page";

const page = () => {
  return (
    <div className="animate-fade-in">
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
