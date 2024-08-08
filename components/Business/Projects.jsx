import React from "react";

const Projects = () => {
  return (
    <div className="justify-between md:40 p-10 bg-white flex">
      <div className="text-black w-[1200px] m-10  gap-10 my-24">
        <h1 className="text-black">Engineering Projects</h1>
        <p>
          Ayatrio is committed to promoting large-scale collaborative engineering
          projects. We focus on delivering high-quality kitchen interior
          decoration for houses, government and commercial apartments,
          co-working office spaces, and large-scale corporate gift purchases,
          etc.
        </p>
        <p>
          With our comprehensive range of products and one-stop services, Ayatrio
          provides developers with more convenient, flexible, and diversified
          shopping experiences.
        </p>
        <a href="#">
            <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10">
              Know More ....
            </button>
          </a>
      </div>
      <div>
        <img src="/images/Business/project.jpg" alt="Loading...."  className="w-[1600px] mb-8"></img>
      </div>
    </div>
  );
};

export default Projects;
