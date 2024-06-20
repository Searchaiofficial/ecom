"use client"
import { useRouter } from 'next/navigation';

export default function Warranty() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className="md:px-[67px] mx-auto px-[20px] pt-[170px]">
            <h1 className="text-black text-4xl font-bold mb-12 pl-6">
                Warranty
            </h1>
            <div className="flex flex-col md:flex-row gap-3 p-4">
                <div
                    className="flex-1 bg-gray-200 p-6 m-3 cursor-pointer"
                    onClick={() => handleNavigation('/warranty/registration')}
                >
                    <div className="h-[200px] flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-center">Warranty Registration</h2>
                    </div>
                </div>
                <div
                    className="flex-1 bg-gray-200 p-6 m-3 cursor-pointer"
                    onClick={() => handleNavigation('/warranty/claim')}
                >
                    <div className="h-[200px] flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-center">Warranty Claim</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
