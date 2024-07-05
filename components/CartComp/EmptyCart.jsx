import Image from "next/image";

export default function Emptycart() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="order-1 md:order-2 md:ml-8 w-full md:w-1/2 lg:w-1/2">
                <Image
                    src="/images/empty_bag.webp"
                    className="md:w-[80%] h-full object-cover md:ml-[140px]"
                    alt="empty bag"
                    width={250}
                    height={250}
                    loading="lazy"
                />
            </div>
            <div className="order-2 md:order-1 text-center md:text-left w-full md:w-1/2 lg:w-1/2">
                <h1 className="text-3xl md:text-5xl font-semibold mb-4">
                    Your shopping bag is empty
                </h1>
                <p className="text-gray-600 mb-6">
                    When you add products to your shopping bag, they will appear here.
                </p>
                <a
                    className="bg-black text-white inline-block px-6 py-3 md:px-8 md:py-4 rounded-full text-center w-full"
                    href="/login"
                >
                    Log in or sign up
                </a>
            </div>
        </div>
    );
}
