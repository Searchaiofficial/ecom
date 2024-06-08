import CabinetItem from '../../../../components/Services/CabinetItem'
import Faq from '../../../../components/Services/Faq'


export default function Installation() {
    return (
        <div className='md:px-[67px] mx-auto px-[20px]'>
            <section className="w-full mb-12 pt-40">
                <div className="flex flex-wrap md:flex-nowrap gap-y-3">
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <h1 className="text-black text-4xl font-bold mb-12 ">
                            Kitchen installation service
                        </h1>
                        <p className="text-justify px-3 opacity-90 mb-3">
                            <strong>Do you need your kitchen installed?</strong> Start by booking a planning service. Our Ayatrio Home Services Provider will guide you through the process from start to finish. Their knowledge and experience will help you build the kitchen of your dreams.
                        </p>
                        <div className="h-10"></div>

                    </div>
                    <div className="w-full md:w-3/5 flex items-center justify-center">
                        <img
                            src="/services/installation/installation.jpg"
                            alt="Financial service"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>


                <div className="md:w-2/3 mt-6">
                    <p className="text-justify px-3 opacity-80 mb-3">
                        From $119 per cabinet, Ayatrio kitchen installation service includes assembly and installation of cabinets from plinths to cover panels. You choose what you need. Pricing is based on cabinet type and quantity. Of course, you can always DIY for free, with help from our guides.
                    </p>

                    <ol className="px-10 opacity-80 list-disc">
                        <li className="mb-3">Installers are insured and covered by WCB/WSIB. Ask a planning specialist for more details.</li>
                        <li className="mb-3">Carried out to the highest industry standards.</li>
                        <li className="mb-3">Covered by a 5-year workmanship guarantee.</li>
                        <li className="mb-3">Kitchen installation starts from $119 a cabinet.</li>
                        <li className="mb-3">After planning, you get an itemized installation price quote.</li>
                    </ol>

                </div>

                <ul className="flex gap-x-1 mt-3 px-3 flex-wrap md:w-2/3">
                    <li>
                        <a href="#pricing" className="underline opacity-90 hover:opacity-100"> Pricing information  </a>
                    </li>
                    <li className="opacity-50"> | </li>
                    <li>
                        <a href="#booking" className="underline opacity-90 hover:opacity-100"> How to book a installation service </a>
                    </li>
                    <li className="opacity-50"> | </li>
                    <li>
                        <a href="#works" className="underline opacity-90 hover:opacity-100"> How it works </a>
                    </li>
                    <li className="opacity-50"> | </li>
                    <li>
                        <a href="#DIY" className="underline opacity-90 hover:opacity-100">  Do-it-yourself guides </a>
                    </li>
                    <li className="opacity-50"> | </li>
                    <li>
                        <a href="#warranty" className="underline opacity-90 hover:opacity-100">  Warranty </a>
                    </li>
                    <li className="opacity-50"> | </li>
                    <li>
                        <a href="#" className="underline opacity-90 hover:opacity-100">  Become an Ayatrio kitchen subcontractor </a>
                    </li>
                    <li className="opacity-50"> | </li>
                    <li>
                        <a href="#faq" className="underline opacity-90 hover:opacity-100">FAQ</a>
                    </li>
                </ul>

                <hr className="mt-20" />
            </section>


            <section id='pricing'>
                <h1 className="text-black text-3xl font-bold mb-12 px-3">
                    Kitchen installation service pricing
                </h1>
                <div className="md:w-2/3 mt-6">
                    <p className="text-justify px-3 opacity-80 mb-3">
                        Our kitchen installation service pricing is based on the type of cabinet (base, wall, or high) and whether it has a door, drawer, or corner carousel. Determine what kind and how many cabinets you’ll have. Then use the information below to help estimate your total installation cost. The more precise you are, the more accurate your quote will be when booking. Additional installation work is also available.
                    </p>
                    <h1 className="ml-3 text-lg mb-3"><strong>All basic installation services below include:</strong></h1>
                    <ol className="px-10 opacity-80 list-disc">
                        <li className="mb-3">Daily broom of the job site.</li>
                        <li className="mb-3">Vacuuming inside Ayatrio SEKTION cabinets and floor upon completion of installation.</li>
                    </ol>

                </div>

                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4">
                            <CabinetItem
                                imageSrc="/services/installation/cab1.jpg"
                                title="Cabinet with door (base, wall or high), starting at $119/cabinet"
                                description={[
                                    'Assembly and installation of Ayatrio SEKTION base cabinets, wall cabinets, high cabinets, doors, cover panels, legs, plinths, shelves, knobs and handles according to manufacturer’s assembly instructions.',
                                    'Adjustment of all Ayatrio SEKTION base cabinets, wall cabinets, high cabinets and doors for appearance.',
                                    'Excludes installation of Ayatrio SEKTION drawer, drawer front, corner carousel, pull-outs, deco strip, side filler strip, cover caps, cover panel 26” x 36”, 36” x 96” or interior fittings other than shelves.'
                                ]}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <CabinetItem
                                imageSrc="/services/installation/cab2.jpg"
                                title="Cabinet with drawer or corner carousel (base or wall), starting at $162/cabinet"
                                description={[
                                    "Assembly and installation of Ayatrio SEKTION base cabinets, wall cabinets, drawers, drawer fronts, doors, cover panels, legs, plinths, shelves, interior fittings, knobs and handles according to manufacturer’s assembly instructions.",
                                    "Adjustment of all Ayatrio SEKTION base cabinets, wall cabinets, doors, drawers and drawer fronts for appearance.",
                                    "Excludes installation of Ayatrio SEKTION deco strip, side filler strip, cover caps or cover panel 26” x 36”, 36” x 96”"
                                ]}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <CabinetItem
                                imageSrc="/services/installation/cab3.jpg"
                                title="Cabinet with drawer or corner carousel (base or wall), starting at $162/cabinet"
                                description={[
                                    "Assembly and installation of Ayatrio SEKTION high cabinets, drawers, drawer fronts, doors, cover panels, legs, plinths, shelves, interior fittings, knobs and handles according to manufacturer’s assembly instructions.",
                                    "Adjustment of all Ayatrio SEKTION high cabinets, doors, drawers, drawer fronts for appearance.",
                                    "Excludes installation or Ayatrio SEKTION deco strip, side filler strip, cover caps or cover panel 26” x 36”, 36” x 96”"
                                ]}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <CabinetItem
                                imageSrc="/services/installation/cab4.jpg"
                                title="Cabinet with drawer or corner carousel (base or wall), starting at $162/cabinet"
                                description={[
                                    "Additional installation services are priced separately from the basic installation cost. All additional installation services will be priced for you by an independent service provider.",
                                    "Ayatrio pre-cut countertops",
                                    "Integrated Lighting (does not include any electrical connection)",
                                    "Gables, molding & fillers",
                                    "Cover caps"
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <hr className="mt-20" />

            </section>


            <section id='works'>
                <div className="md:w-2/3 mt-6">
                    <h1 className="text-black text-2xl font-semibold mb-12">
                        <strong>How Ayatrio kitchen installation service works</strong>
                    </h1>
                    <h4 className='text-black text-lg font-bold my-6'>Before an Ayatrio kitchen installation</h4>
                    <ol className="px-10 opacity-80 list-decimal">
                        <li className="mb-3">Measure, plan and buy your Ayatrio kitchen. If you haven’t done this already, we can help! Start things off right with correct specifications from our kitchen measuring service. Then, let us design your new kitchen with our kitchen planning service.</li>
                        <li className="mb-3">Book an installation appointment. Our Ayatrio Kitchen service team can install your new kitchen.</li>
                        <li className="mb-3">Join the service provider for a site inspection. During this visit, the service provider checks the design vs. the floor plan and confirms measurements. We also will make sure electricity, plumbing, and HVAC have been done to fit the new kitchen layout.</li>
                        <li className="mb-3">Get your Ayatrio kitchen home. Delivery is not included in Ayatrio kitchen installation service.</li>
                        <li className="mb-3">Prepare your space. Clean everything out and take care of any work like patching, wall painting, redoing floors, etc. Set up a temporary kitchen. Place all packages in the room where the kitchen will be installed.</li>
                    </ol>
                    <h4 className='text-black text-lg font-bold my-6'>During and after an Ayatrio kitchen installation</h4>
                    <ol className="px-10 opacity-80 list-decimal">

                        <li className="mb-3">Live life while the pros do their work. Every Ayatrio kitchen installation comes with a workmanship guarantee, so you can feel confident that the installation meets the highest industry standards.</li>
                        <li className="mb-3">When the installation is completed, a walkthrough of the new kitchen will be performed with our install team to make sure the kitchen has been installed as planned and is meeting the customer's expectations.</li>
                        <li className="mb-3">Enjoy cooking in your new kitchen with peace of mind for years, thanks to our warranties (detailed in our full terms and conditions).</li>
                    </ol>
                </div>
                <hr className="mt-20" />

            </section>

            <section id="faq">

                <Faq faqFor='installation' />
            </section>

        </div>
    )
}