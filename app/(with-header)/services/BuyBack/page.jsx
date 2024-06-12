import CabinetItem from '../../../../components/Services/CabinetItem'
import Faq from '../../../../components/Services/Faq'

export default function BuyBackPage() {
    return (
        <div className='md:px-[67px] mx-auto px-[20px]'>
            <section className="w-full pt-40">
                <h1 className="text-black text-4xl font-semibold mb-12">
                    Ayatrio Sell-back programs
                </h1>
                <div className="flex flex-wrap md:flex-nowrap gap-y-3">
                    <div className="w-full md:w-1/2 mr-3">
                        <p className="text-justify px-3 opacity-90 mb-3">
                            Every year, millions of pieces of secondhand furniture go to waste. That’s why we’re buying back your used Ayatrio furniture, to give chairs, shelves or chests of drawers as many lives as possible.
                        </p>
                        <p className="text-justify px-3 opacity-90 mb-3">
                            With the Ayatrio Sell-back program, Ayatrio Family members can receive in-store credit and give unwanted furniture a second life. This way you allow someone else to enjoy your second-hand Ayatrio furniture instead of having to buy something brand new.
                        </p>
                        <p className="text-justify px-3 opacity-90 mb-3">
                            What your used furniture is worth will vary, but you’ll get more in-store credit for pieces that are in better condition or like-new.
                        </p>
                        <ul className="flex gap-x-1 mt-3 px-3 flex-wrap">
                            <li>
                                <a href="#works" className="underline opacity-90 hover:opacity-100">How it works</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#product" className="underline opacity-90 hover:opacity-100"> Eligible products</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#donate" className="underline opacity-90 hover:opacity-100">Donate Ineligible products to Furniture</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#bank" className="underline opacity-90 hover:opacity-100">Bank</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#faq" className="underline opacity-90 hover:opacity-100">FAQ</a>
                            </li>
                        </ul>

                    </div>
                    <div className="w-full md:w-3/5 flex items-center justify-center">
                        <img
                            src="/images/services/Buy-Back/buyback.jpg"
                            alt="Financial service"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
                <hr className="mt-20" />
            </section>

            <section id="works">
                <div className="w-full md:w-1/2 mb-16">
                    <h1 className="text-black text-2xl font-bold my-10">How the Ayatrio Sell-back program works</h1>

                    <ol type='1' className="list-decimal pl-8 ">


                        <li className="ml-4 my-4 opacity-70 text-[15px]">
                            Send us 4 or more photos including the Ayatrio logo and/or article number of the item you would like to sell.
                        </li>
                        <li className="ml-4 my-4 opacity-70 text-[15px]">
                            Allow 5 business days for an assessment, then check your application status. If the item is still processing, please wait 1 day and check again.
                        </li>
                        <li className="ml-4 my-4 opacity-70 text-[15px]">
                            If your application is approved, bring your fully assembled Ayatrio item to your selected store within 30 days of the date item was accepted, along with your Ayatrio Family card and unique application code to get your in-store credit.
                        </li>
                        <li className="ml-4 my-4 opacity-70 text-[15px]">
                            Pat yourself on the back. You’ve done a good deed. You’re helping us prolong product life, promote second-hand furniture, and waste less. Thanks for contributing to a more circular Ayatrio and to becoming people and planet positive!
                        </li>
                        <li className="ml-4 my-4 opacity-70 text-[15px]">
                            Looking to replace that item you just sold back with another? Check out the As-is online marketplace for some more sustainable deals.
                        </li>
                    </ol>
                    <a id='donate' href=""
                        className="block px-4 py-2 text-center bg-black text-white rounded-full mt-8 w-[220px]"
                    >Submit an application</a>
                </div>
                <hr className="mt-20" />
            </section>

            <section id='product'>
                <div className="md:w-2/3 mt-6">
                    <h1 className="text-black text-2xl font-bold my-10">What second hand Ayatrio furniture does Ayatrio buy back?</h1>

                    <h4 className='text-black text-lg font-bold my-6'>Ayatrio products that qualify for sell-back must be:</h4>
                    <ol className="px-10 opacity-80 list-decimal">
                        <li className="mb-3">In good, resellable condition</li>
                        <li className="mb-3">Listed below as eligible</li>
                        <li className="mb-3">Complete and fully functional</li>
                        <li className="mb-3">Properly assembled when returned</li>
                        <li className="mb-3">Clean and unmodified</li>
                    </ol>
                </div>
                <hr className="mt-20" />

            </section>



            <section>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">

                        <div className="w-full md:w-1/2 px-4">
                            <CabinetItem
                                imageSrc="/images/services/Buy-Back/img1.jpg"
                                title="Second-hand furniture Ayatrio buys back"
                                description={[
                                    'Bookcases and shelf units',
                                    'Chest of Drawers, Nightstands',
                                    'Cabinets (non Kitchen)',
                                    'Chairs and stools (excluding fabric upholstered)',
                                    'Dining tables',
                                    'Office Desks & Chairs (excluding fabric upholstered)',
                                    'Multimedia furniture (tv benches, etc.)',
                                    'Small tables (side, Coffee, Nesting, etc.)',
                                    'Home Décor & Storage (excluding lighting & cookware)',
                                ]}
                            />

                        </div>

                        <div className="w-full md:w-1/2 px-4">
                            <CabinetItem
                                imageSrc="/images/services/Buy-Back/img2.jpg"
                                title="Cabinet with door (base, wall or high), starting at $119/cabinet"
                                description={[
                                    "Unfortunately, we are currently unable to accept items from the categories listed below. However, we are always looking for new opportunities to improve our services so do check back in the future.',Unfortunately, we are currently unable to accept items from the categories listed below. However, we are always looking for new opportunities to improve our services so do check back in the future.",
                                    'Non-Ayatrio products',
                                    'Products that have been used outside, including outdoor furniture',
                                    'Hacked or modified products',
                                    'Market hall items, including cookware and lighting fixtures',
                                    'Mattresses and bed textiles such as blankets and mattress protectors',
                                    'Bed frames',
                                    'Sofas and armchairs (fabric upholstered)',
                                    'Other soft furnishings such as pillows, towels, rugs, etc.',
                                    'Items that contain glass',
                                    'Kitchens including benchtops, cabinets and fronts',
                                    'PAX wardrobes and accessories',
                                    'Other over-sized items',
                                    'Appliances or other electrical items',
                                    'Children’s and baby product such as cribs, mattresses and changing tables',
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <a href=""
                    className="block px-4 py-2 text-center bg-black text-white rounded-full mt-8 w-[220px]"
                >Submit an application</a>

                <hr className="mt-20 mb-10" />

            </section>

            <section id="faq" className='mt-8'>
                <h1 className="text-black text-2xl lg:text-4xl font-semibold mb-6 lg:mb-12 px-3 lg:text-left">
                    Frequently asked questions
                </h1>
                <Faq faqFor='buy-back' />
            </section>
        </div>

    )
}