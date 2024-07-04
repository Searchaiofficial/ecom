import Image from "next/image";
export default function CheckoutBox({ boxContent }) {
    return (
        <div className="flex flex-col justify-center items-start sm:items-center bg-gray-100 py-4 px-10 border border-white">
            <div className="flex justify-start sm:justify-center w-full">
                <Image src={`${boxContent.icon}`} alt="" className="w-4 opacity-50" width={4} height={4} />
            </div>
            <h2 className="text-black text-lg font-semibold my-2 text-left sm:text-center">
                {boxContent.title}
            </h2>
            <h3 className="my-2 text-left sm:text-center">
                {boxContent.description}
            </h3>
            <a href={`${boxContent.icon}`} className="underline opacity-70 hover:opacity-100 text-left sm:text-center">
                {boxContent.linkText}
            </a>
        </div>
    );
}
