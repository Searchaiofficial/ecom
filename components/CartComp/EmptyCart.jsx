import Image from "next/image";

export default function Emptycart() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-4 md:p-8">
            <div className="order-1 md:order-2 mt-6 md:mt-0 md:ml-8 w-full md:w-1/2 lg:w-1/2">
                <Image
                    src="/images/empty_bag.jpg"
                    className="w-full h-full object-cover"
                    alt="empty bag"
                    width={300}
                    height={300}
                />
            </div>
            <div className="order-2 md:order-1 text-center md:text-left w-full md:w-1/2 lg:w-1/2">
                <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                    Your shopping bag is empty
                </h1>
                <p className="text-gray-600 mb-6">
                    When you add products to your shopping bag, they will appear here.
                </p>
                <a
                    className="bg-black text-white inline-block px-6 py-3 md:px-8 md:py-4 rounded-full text-center"
                    href="#"
                >
                    Log in or sign up
                </a>
            </div>
        </div>
    );
}
