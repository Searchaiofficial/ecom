import content from '../../../../components/Services/PlanningService/PlanningContent.json';
import Plannings from '../../../../components/Services/PlanningService/Plannings';
import Checkout from '../../../../components/Services/PlanningService/Checkout';
import Image from 'next/image';
export default function PlanningServicesPage() {
    return (
        <div className='md:px-[67px] mx-auto px-[20px]'>
            <div className="w-full pt-40">
                <h2 className="text-black text-2xl font-semibold mb-12 mt[20px] px-3">
                    Planning services
                </h2>
                <div className="flex flex-wrap md:flex-nowrap gap-y-3">
                    <div className=" w-full md:w-1/2">
                        <p className="text-justify px-3 opacity-90">
                            We can help you create inspiring and functional solutions for different areas of your home or business. Whether you're planning a new kitchen or creating a much-needed storage solution, our planning specialist can assist with your project, big or small. Schedule an online, or in-store planning appointment and our planning specialists will help you design your ideal space.
                        </p>
                        <ul className="flex gap-x-1 mt-3 px-3 flex-wrap">
                            <li>
                                <a href="#works" className="underline opacity-90 hover:opacity-100">How it works</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#appointment" className="underline opacity-90 hover:opacity-100">Schedule an appointment</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#tools" className="underline opacity-90 hover:opacity-100">DIY planning tools</a>
                            </li>
                        </ul>

                    </div>
                    <div className="w-full md:w-1/2 mt-3 md:mt-0">
                        <Image loading="lazy"
                            src="/images/services/PlanningServices/services.jpg"
                            alt="Planning service example"
                            width={800}
                            height={800}

                            className="w-full h-[306px]"
                        />
                    </div>
                </div>
                <hr className="mt-20" />
            </div>

            <section className="w-full md:w-1/2 mb-16" id='works'>
                <h3 className="text-black text-2xl font-bold my-10">How Ayatrio planning services work</h3>

                <ol type='1' className="list-decimal pl-8 ">
                    <li className="ml-4 my-4 opacity-70 text-[15px]">
                        <strong>Get inspired</strong> with all our free online planning tools. Take notes on which styles, colors, products, and ideas you like so it’s easier for us to understand what designs and looks you prefer.
                    </li>
                    <li className="ml-4 my-4 opacity-70 text-[15px]">
                        <strong>Choose a need.</strong> Do you want help with a space or whole room? A particular furniture system? For your home or business? Browse the furnishing areas below to find the planning service you need.

                    </li>
                    <li className="ml-4 my-4 opacity-70 text-[15px]">
                        <strong>Book an appointment</strong> using the links below.

                    </li>
                    <li className="ml-4 my-4 opacity-70 text-[15px]">
                        <strong>Measure and list.</strong> We’ll need details about the space or room. Record measurements of height, width, and depth as well as positions/dimensions of electrical outlets, doors, windows, etc. Make a list of your needs.

                    </li>
                    <li className="ml-4 my-4 opacity-70 text-[15px]">
                        <strong>Bring your measurements,</strong> list of needs, and style notes to the appointment. A drawing or photo of the space is useful, too. We’ll discuss layouts and solutions to create a plan and a shopping list.

                    </li>
                    <li className="ml-4 my-4 opacity-70 text-[15px]">
                        <strong>Take time to assess the plan and next steps.</strong> Do you need to make changes? Start over? Buy now? When you’re ready, visit us online or in-store to order."

                    </li>
                </ol>
            </section>

            <Plannings content={content.plannings} />
            <Checkout content={content.checkout} />
        </div>
    )
}