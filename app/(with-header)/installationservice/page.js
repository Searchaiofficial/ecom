import QuestionAnswer from "@/components/FAQ/QuestionAnswer";
import Image from "next/image";

const termsAndConditions = [
  {
    id: 1,
    question: "Terms and Conditions",
    answer: `AYATRIO India – Services (Assembly and Installation)

    - The workmanship guarantee period is valid from the date of completion of the kitchen installation (once the completion certificate is signed off by AYATRIO Co-workers/ authorized AYATRIO vendor/associates/partners and the customer
    - The workmanship guarantee is valid for 3 years
    - The customer has to provide the readiness of the site for the installation to begin, within 90 days from the date of delivery of the kitchen articles
    - Kitchen articles, assembly, installation, transport, and workmanship are guaranteed at the site of first installed only
    - Assembly and Installation, maintenance and alignment of drawers, door fronts, hinges within the 1st year of service
    - Installation and Assembly within 14 Days (on confirmation of the site readiness and the delivery of the articles on site)
    - AYATRIO INDIA guarantees the sink if bought and installed from AYATRIO INDIA
    - AYATRIO INDIA guarantee is applicable for articles, appliances, and workmanship only if the civil changes are made as recommended by AYATRIO INDIA co-workers or AYATRIO INDIA authorized vendors/associates/partners during the PIV (Pre Installation Visit)
    - AYATRIO INDIA guarantees are applied only if the customer reaches out to our touchpoints via the store, Customer Service Center or AYATRIO India website
    - AYATRIO INDIA will not be responsible if the customer reaches out to the AYATRIO INDIA authorized vendors/associates/partners directly for purchase or repairs or replacement of articles or services
    - In cases of conflict at the time of installation, the customer will be refunded only for articles that are unpacked. The customer is deemed liable and has complete ownership of the articles and products that are unpacked and assembled
    - In case of dispute or conflicts, AYATRIO INDIA is not liable to refund for the services availed by the customer for the purchase of the kitchen like the transport/delivery cost, installation and assembly cost
    - In cases of conceptional damages, the customer is liable to purchase the articles/ products or spares that has to be replaced or repaired
    - Measurement, Planning and Delivery fees are non-refundable in case of non-utilization, conflict or cancellation of the order
    - AYATRIO INDIA or AYATRIO INDIA vendors/associates/partners do not undertake any Civil changes on the site`,
  },
];

const InstallationServicePage = () => {
  return (
    <div>
      <div className="mt-20 sm:px-[50px] px-[20px] p-10 space-y-10">
        {/* Kitchen installation section starts */}
        <section>
          <div className="flex flex-col w-full space-y-10">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-4xl">Kitchen Installation</h1>
              <div className="flex w-full gap-4 flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Image width={600} height={388} src="/InstallationServiceImg/installation.avif" alt="" />
                </div>
                <div className="flex-col gap-4 md:w-1/2">
                  <p>
                    Once you are happy to proceed with our kitchen installation
                    service, we will visit your home or workplace to make sure
                    the measurements and design are correct.
                  </p>
                  <p>
                    Throughout the installation of your new kitchen, we will
                    coordinate the job from start to finish. We are so confident
                    of the quality of installation, we give you a 3-year
                    guarantee on workmanship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Kitchen installation section ends */}
        <hr />
        {/* How to book section starts */}
        <section>
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-4 md:w-2/3">
              <div>
                <h2 className="font-bold text-lg">How to book </h2>
                <p>
                  Talk to one of our kitchen specialists in the kitchen
                  department.
                </p>
                <p>
                  *Installation service is only available for kitchens purchased
                  from AYATRIO.
                </p>
              </div>
              <div>
                <h2 className="font-bold text-lg">
                  Kitchen installation prices
                </h2>
                <p>
                  For each METOD kitchen cabinet, an installation price of Rs.
                  2,750 per cabinet will be applicable.
                </p>
                <p>
                  METOD kitchens comprising of 22 cabinets or more will have a
                  fixed installation price of Rs. 60,000.
                </p>
                <p>
                  For each ENHET kitchen cabinet, there is an installation price
                  of Rs. 1,650 per cabinet.
                </p>
              </div>
              <div>
                <p>AYATRIO Installation service includes the following:</p>
                <p>
                  Kitchen cabinets, interiors, door fronts, cover panels, legs
                  and plinths, handles, integrated lighting, sink, tap and AYATRIO
                  purchased appliances (excluding extractor hood)
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* How to book section ends */}
        <hr />
        {/* Terms and conditions section starts */}
        <section>
          <div>
            {
                termsAndConditions.map((curElement)=>{
                    return <QuestionAnswer key={curElement.id} {...curElement}/>
                })
            }
          </div>
        </section>
        {/* Terms and conditions section ends */}
      </div>
    </div>
  );
};

export default InstallationServicePage;
