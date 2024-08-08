const Home = () => {
  return (
    <main className="flex flex-col md:flex-row items-center justify-between p-10 bg-white gap-8 " >
      <div className="text-black w-full md:w-[800px] p-4 ml-10 me-8">
        <div className="mb-14">
          <p className="text-xl text-current">
            Professional, reliable, and time-efficient
          </p>
          <h2 className="text-4xl font-bold">Ayatrio for business</h2>
        </div>
        <div className="mb-10">
          <h3 className="text-xl font-semibold w-[350px] ">
            Professional customized design Creating a dream business space
          </h3>
          <p className="text-gray-600">
            Office / Residential-construction Retail / Education
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <a href="#" className="text-blue-500 hover:underline">
            Business Appointments and Consultation
          </a>
          <a href="#" className="text-blue-500 hover:underline">
            Become an Ayatrio Business Member ›
          </a>
        </div>
      </div>
      <div className="w-full md:w-[45%] flex justify-center">
        <img
          src="/images/Business/prakash.jpg"
          alt="Loading..."
          className="w-full object-cover"
        />
      </div>
    </main>
  );
};

export default Home;
