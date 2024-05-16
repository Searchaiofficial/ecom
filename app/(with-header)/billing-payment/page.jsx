import Image from "next/image";

const BillingPayment = () => {
    return (
        <div className="mt-20 lg:px-[67px] w-full px-[20px] sm:px-[50px]">
            <div className="lg:w-[60%]">
                <h1 className=" text-[24px] lg:text-[2.25rem] text-[#111111] font-semibold mb-10">Billing & Payment</h1>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-[14px] mb-[8px]">Billing & Payment</h2>
                    <p className="text-[14px] mb-[12px] text-[#484848]">Ayatrio enables online verification and authorisation of payments through three payment services: the CCAvenue payment gateway (www.ccavenue.com), PayU payment gateway (www.payubiz.in) and through PayPal (https://www.paypal.com). Ayatrio.com is a Verisign secured site with 128 bit SSL encryption.</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-[14px] mb-[8px] mt-[32px]">A. The following payment methods are accepted through the CCAvenue/PayU payment gateway:</h2>
                    <div className="ml-2">
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold"> 1. Credit Cards:</span> Domestic and International Visa, MasterCard and American Express credit cards.</p>
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">2. Debit Cards:</span> Debit cards issued by most of the major banks.</p>
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">3. Net banking:</span> We allow net banking transactions from nearly 50 major Indian banks.</p>
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">4. UPI</span></p>
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">5. GPay</span></p>
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">6. Wallets:</span> (Freecharge, airtel money, amazon pay, phonePe, Amex ezeClick, Oxygen, Olamoney, jio money, citi bank reward points, ItzCash, Paycash, HDFC PayZapp)</p>
                        <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">7. Loyalty Points</span></p>
                    </div>
                    <p className="text-[14px] mb-[12px] text-[#484848]"><span className="font-semibold">Note:</span> Your billing amount will be shown in Indian Rupees on the payment gateway. This is equivalent to your order value</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-[14px] mb-[8px] mt-[32px]">B. Fabindia also accepts payments made via Paypal.</h2>
                    <p className="text-[14px] mb-[12px] text-[#484848]">International customers can pay from their PayPal account if they have a PayPal account. They can also choose to use their credit card to pay if they do not have a PayPal account. This option is not available to Indian residents as per RBI regulations.</p>
                </div>
            </div>
        </div>
    );
}

export default BillingPayment;