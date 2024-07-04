import Faq from '../../../../components/Services/Faq'
import Image from 'next/image'
export default function ClickAndCollectServicePage() {
    return (
        <div className='md:px-[67px] mx-auto px-[20px]'>
            <section className="w-full pt-40">
                <div className="flex flex-wrap md:flex-nowrap gap-y-3">
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <h2 className="text-black text-2xl font-semibold mb-12 mb-12 px-3">
                            Click and collect
                        </h2>
                        <p className="text-justify px-3 opacity-90 mb-3">
                            With Ayatrio Click and collect, you’re in control. Place an order online when it’s convenient and choose when and where to collect it. You’ll still make a trip, but we’ll gather your items so that you have more time and energy for assembling instead.
                        </p>
                        <div className="h-10"></div>

                    </div>
                    <div className="w-full md:w-3/5 flex items-center justify-center">
                        <Image
                            src="/images/services/ClickCollectService/services.jpg"
                            alt="Financial service"
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="md:w-[60%] mt-6">
                    <p className="text-justify px-3 opacity-80 mb-3">
                        Contactless Click and collect service is available at select Pick-up locations nationwide.
                        <strong> Starting at $5</strong>, you can place an order online and collect it from your local
                        <a href="" className="underline">Ayatrio store</a>,
                        <a href="" className="underline">Pick-up locker*</a>
                        (free for Ayatrio Family members) or an external
                        <a href="" className="underline"> Pick-up location</a>.
                    </p>

                    <p className="text-justify px-3 opacity-80 mb-3">
                        *Pick-up lockers are only available at select stores.
                        <a href="" className="underline">
                            Click here for details.
                        </a>
                    </p>
                    <ul className="flex gap-x-1 mt-3 px-3 flex-wrap">
                        <li>
                            <a href="#options" className="underline opacity-90 hover:opacity-100">Options and pricing</a>
                        </li>
                        <li className="opacity-50"> | </li>
                        <li>
                            <a href="#works" className="underline opacity-90 hover:opacity-100"> How it works </a>
                        </li>
                        <li className="opacity-50"> | </li>
                        <li>
                            <a href="#know" className="underline opacity-90 hover:opacity-100"> Good to know </a>
                        </li>
                        <li className="opacity-50"> | </li>
                        <li>
                            <a href="#faq" className="underline opacity-90 hover:opacity-100">FAQ</a>
                        </li>
                    </ul>

                </div>

                <hr className="mt-20" />

            </section>

            <section id='options'>
                <div className='flex-col md:w-2/3 my-8'>
                    <h2 className='text-black text-2xl font-semibold mb-12'>Click and collect options and pricing</h2>
                    <p className='text-justify px-3 opacity-90 my-3'>
                        You can collect your order at an Ayatrio store or a local Pick-up location. Pricing details, approximate lead time, maximum package specifications, Pick-up locations, etc. are specified below.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <div className="pb-[56.49761904761905%] relative">
                            <Image src="/images/services/ClickCollectService/car.jpg"
                                alt="Cars parked in front of an Ayatrio store"
                                width={300}
                                height={300}
                                className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                            <a href="" className="absolute inset-0 flex items-center justify-center">
                                {null}
                            </a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">Collect at an Ayatrio store</h3>
                            <ul className="mt-2 list-disc pl-4">
                                <li>$5 flat rate (<a href="">free for Ayatrio Family members</a>)</li>
                                <li>Approximate lead time: Two hours to two days after placing order</li>
                                <li>Maximum package size: No limit</li>
                                <li>Maximum package weight: No limit</li>
                            </ul>
                        </div>
                        <a href=""
                            className="block px-4 py-2 text-center bg-black text-white rounded-full mt-4 w-[300px]"
                        >View all Ayatrio store locations</a>
                    </div>
                    <div className="col-span-1">
                        <div className="pb-[56.2%] relative">
                            <Image src="/images/services/ClickCollectService/pickup.jpg"
                                alt="A person riding a cargo bicycle with Ayatrio boxes"
                                className="absolute inset-0 w-full h-full object-cover"
                                width={300}
                                height={300}
                                loading="lazy" />
                            <a href="" className="absolute inset-0 flex items-center justify-center ">
                                {null}
                            </a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">Use a Pick-up location</h3>
                            <p className="mt-2">Enjoy flat-rate shipping with our Pick-up locations. Collect your online orders at convenient partner locations.</p>
                        </div>
                        <a href=""
                            className="block px-4 py-2 text-center bg-black text-white rounded-full mt-4 w-[270px]"
                        >View all Pick-up locations</a>
                    </div>
                    <div className="col-span-1">
                        <div className="pb-[56.2%] relative">
                            <Image src="/images/services/ClickCollectService/deliver.jpg"
                                alt="FedEx worker helping a customer"
                                width={300}
                                height={300}
                                className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                            <a href="" className="absolute inset-0 flex items-center justify-center ">{null}</a>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">Pickup your small packages at a FedEx retail location near you</h3>
                            <p className="mt-2">Enhance your Ayatrio online shopping experience with convenient package pickup service. Choose your preferred pickup location during checkout.</p>
                        </div>
                        <a href=""
                            className="block px-4 py-2 text-center bg-black text-white rounded-full mt-4 w-[320px]"
                        >Find a FedEx retail location near you</a>
                    </div>
                </div>
                <hr className="mt-20" />

            </section>

            <section id='works'>
                <div className="w-full md:w-2/3 mb-16">
                    <h2 className="text-black text-2xl font-semibold mb-12 mt[20px]">How Click and collect works </h2>

                    <ul type='1' className="pl-8 opacity-90">
                        <li className="mb-3"><strong className="opacity-90">Step 1:</strong> Choose ‘Click and collect’ at checkout and you will be able to select an <a href="" className="underline">Ayatrio Store</a>,
                            <a href="" className="underline">Pick-up locker</a> or a nearby <a href="" className="underline">Pick-up location</a>, operated by a third-party partner.</li>

                        <li className="mb-3"><strong className="opacity-90">Step 2:</strong> Wait until you receive the “Ready for pickup” email before heading to the store or the Pick-up location.</li>

                        <li className="mb-3"><strong className="opacity-90">Step 3:</strong> Follow the instructions in the email and proceed to your selected store or Pick-up location. While collection will be contactless, pick-up processes may vary from location to location. Further direction will be communicated upon arrival.</li>

                    </ul>
                </div>
                <hr className="mt-20" />
            </section>




            <section className='mb-4' id='know'>
                <div className="w-full md:w-2/3 mb-16">
                    <h2 className="ttext-black text-2xl font-semibold mb-12 mt-[20px]">Good-to-know basics </h2>

                    <ul className="list-disc list-inside opacity-90">
                        <li className="mb-3 ml-6 ">Due to high demand, time slots may be limited. Available times are listed during online check-out.</li>
                        <li className="mb-3 ml-6 ">If you can’t place an order at your desired <a href="" className="underline">Ayatrio store</a>, try another location, remove an out-of-stock item from your cart or order later when stock is replenished.</li>
                        <li className="mb-3 ml-6 ">Consider package dimensions and weights, so your order will fit in your vehicle. This information is on each product’s webpage.</li>
                        <li className="mb-3 ml-6 ">Decide in advance who will collect your order. You can list an alternate collector while placing your order.</li>
                        <li className="mb-3 ml-6 ">Want an order update? If you have an order confirmation number, you can <a title="track your order" href="" className="underline">track your order</a>.</li>
                        <li className="mb-3 ml-6 ">Shopping for your business? Check out <a href="" className="underline">Ayatrio for Business</a>. We’ll do more work for you so that you can spend more time on your customers.</li>
                    </ul>
                </div>
                <hr className="mt-20" />
            </section>
            <section id="faq" className='mt-8'>
                <h2 className="text-black text-2xl font-semibold mb-12">
                    Frequently asked questions
                </h2>
                <Faq faqFor='clickandcollect' />
            </section>

        </div>
    )
}