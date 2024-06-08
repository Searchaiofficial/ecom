import Faq from '../../../../components/Services/Faq'


export default function FinanceServicesPage() {
    return (
        <div className='md:px-[67px] mx-auto px-[20px]'>
            {/* 1st div */}
            <section className="w-full pt-40">
                <div className="flex flex-wrap md:flex-nowrap gap-y-3">
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <h1 className="text-black text-4xl font-semibold mb-12 px-3">
                            Financial services
                        </h1>
                        <p className="text-justify px-3 opacity-90 mb-3">
                            At Ayatrio, we think everyone deserves a well-designed, functional home – and that paying for it shouldn’t be difficult.
                        </p>
                        <p className="text-justify px-3 opacity-90">
                            That's why we offer flexible payment options that allow you to realize your dream home today.
                        </p>
                        <ul className="flex gap-x-1 mt-3 px-3 flex-wrap">
                            <li>
                                <a href="#payment" className="underline opacity-90 hover:opacity-100">Pay in 4 interest-free* payments with Afterpay</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#RBC" className="underline opacity-90 hover:opacity-100"> PayPlan by RBC<sup>TM</sup></a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#options" className="underline opacity-90 hover:opacity-100"> Payment Options</a>
                            </li>
                            <li className="opacity-50"> | </li>
                            <li>
                                <a href="#faq" className="underline opacity-90 hover:opacity-100">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-3/5 flex items-center justify-center">
                        <img
                            src="/services/FinanceServices/services.jpg"
                            alt="Financial service"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>


            <h1 className="text-black text-2xl lg:text-4xl font-semibold my-6 lg:mb-12 px-3">
                Explore our financial service options
            </h1>

            {/* 2nd div */}
            <section className="flex flex-col md:flex-row bg-gray-100 my-12" id='payment'>
                <div className="w-full md:w-[70%]">
                    <img
                        src="/services/FinanceServices/a-man-tossing-a-plush-toy-to-a-young-child.jpg"
                        alt="A man tossing a plush toy to a young child."
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-[30%] flex flex-col justify-center p-6 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Four interest-free* payments with Afterpay
                    </h2>
                    <div className="text-gray-900 space-y-4">
                        <p>Afterpay allows you to split your purchase into four interest-free* payments.</p>
                        <p>The first payment is taken when the order is placed and the remaining three are automatically processed every two weeks.</p>
                        <p>Available for purchases between $50 and $1,000 including services and taxes.&nbsp;</p>
                        <p>Currently available for online purchases only.</p>
                    </div>
                    <a
                        href=""
                        className="inline-block bg-black text-white font-bold py-2 px-6 rounded-full mt-6 w-[270px]"
                    >
                        Learn more about Afterpay
                    </a>
                </div>

                <hr className="mt-20" />
            </section>


            {/* 3rd section */}
            <section className="flex flex-col md:flex-row-reverse bg-gray-100 my-12" id='RBC'>

                <div className="w-full md:w-[70%]">
                    <img
                        src="/services/FinanceServices/a-couple-inside-an-store.jpg"
                        alt="A couple inside an Ayatrio store shopping for a kitchen sink."
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-[30%] flex flex-col justify-center p-6 md:p-12 bg-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        PayPlan by RBC™
                    </h2>
                    <div className="text-gray-900 space-y-4">
                        <p>You can spread the cost of larger purchases over time with a PayPlan by RBC installment loan. Shop with confidence and manage your budget.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Quick and easy application process</li>
                            <li>No hidden fees or early repayment penalty</li>
                        </ul>
                        <p><a href="" className="underline opacity-90 hover:opacity-100">Learn more about PayPlan by RBC™</a></p>
                        <p>PayPlan by RBC installment loans are provided by RBC Ampli Inc., a wholly-owned subsidiary of Royal Bank of Canada.</p>
                        <p><strong>PayPlan is available in Ayatrio stores only. PayPlan is not currently available at Ayatrio St. Catherines or Windsor Plan and order points, or for orders placed online or by telephone.</strong></p>
                    </div>
                    <a
                        href="/services/FinanceServices/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-black text-white font-bold py-2 px-6 rounded-full mt-6 w-[140px]"
                    >
                        Apply now
                    </a>
                </div>

                <hr className="mt-20" />

            </section>


            {/* Payment */}
            <h1 className="text-black text-2xl lg:text-4xl font-semibold mb-6 lg:mb-12 px-3" id='options'>
                Payment Options
            </h1>
            <div className="flex flex-col lg:flex-row lg:gap-6">

                <div className="flex flex-col justify-center lg:col-span-1">
                    <div className="flex justify-center mb-6">
                        <img src="/services/FinanceServices/in-store-payment-options.jpg" alt="In store payment options" className="max-w-full h-auto" />
                    </div>
                    <div className="opacity-90 mb-20">
                        <p className="font-bold mb-4">In store payment options:</p>
                        <ul className="list-disc list-inside ml-10 space-y-2">
                            <li>Ayatrio Gift Cards</li>
                            <li>Interac/Debit</li>
                            <li>VISA</li>
                            <li>MasterCard</li>
                            <li>American Express</li>
                            <li>JCB</li>
                            <li>Discover</li>
                            <li>Union Pay</li>
                            <li>Cash</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col justify-center lg:col-span-1 lg:mb-20">
                    <div className="flex justify-center mb-6">
                        <img src="/services/FinanceServices/online-payment-options.jpg" alt="Online payment options" className="max-w-full h-auto" />
                    </div>
                    <div className="opacity-90 mb-8">
                        <p className="font-bold mb-4">Online payment options:</p>
                        <ul className="list-disc list-inside ml-10 space-y-2">
                            <li>Ayatrio gift cards</li>
                            <li>VISA credit and debit cards</li>
                            <li>MasterCard credit and debit cards</li>
                            <li>American Express</li>
                            <li>Afterpay</li>
                            <li>PayPal</li>
                            <li>Apple Pay</li>
                            <li>By phone <a href="tel:1-866-866-4532" className="underline">1-866-866-4532</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <section id="faq">

                <Faq faqFor='payment' />
            </section>

        </div>
    );
}
