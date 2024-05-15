const ShippingDelivery = () => {
    return (
        <div className="mt-20 lg:px-[67px] w-full px-[20px] sm:px-[50px]">
            <div className="lg:w-[60%]">
                <h1 className=" text-[24px] lg:text-[2.25rem] text-[#111111] font-semibold mb-10">Shipping & Delivery</h1>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-[14px] mb-[8px]">Shipping & Delivery</h2>
                    <p className="text-[14px] mb-[12px] text-[#484848]">At Ayatrio, our aim is to ship our products in a quick" safe and inexpensive manner. We deliver to 130 countries worldwide, and to 511 destinations within India.</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-[14px] mb-[8px] mt-[32px]">Processing your order</h2>
                    <p className="text-[14px] mb-[12px] text-[#484848]">We try our best to ship goods to you as soon as possible. On an average, it takes us about 2 business days to ship goods out of our warehouses across India. However if the quantities ordered are more than 5 pieces per product per style, or if the item ordered is under production, it may take longer to process your order. Should this happen, we will keep you informed by email.</p>
                    <p className="text-[14px] mb-[12px] text-[#484848]">To calculate how much time it will take you to receive your Ayatrio merchandize, please add the shipping times given below to the 2 business day order processing period.</p>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-[14px] mb-[8px] mt-[32px]">Customs & International orders</h2>
                    <p className="text-[14px] mb-[12px] text-[#484848]">All of Ayatrio orders are shipped internationally from our warehouses across India to your provided shipping address via DHL/FEDEX. Due to the nature of international shipping, occasionally a customer may have to pay additional import duties and taxes which are levied once a shipment reaches your country. The large majority of orders will not have to pay any additional fees. However, we are unable to calculate when and how much these infrequent customs duty charges will be levied. In the case where additional customs charges are assessed, you will be responsible for paying these additional fees. To make your shopping experience as seamless as possible, we have arranged with DHL/FEDEX to customs clear your goods for you and deliver them to your doorstep. If you are presented with an invoice from DHL/FEDEX for import duties and taxes, you will have to pay DHL/FEDEX directly at the time of delivery.</p>
                </div>
            </div>
        </div>
    );
}

export default ShippingDelivery;