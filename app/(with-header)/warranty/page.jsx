export default function Warranty() {
    return (
        <div className="md:px-[67px] mx-auto px-[20px] pt-[170px]">
            <h1 className="text-black text-4xl font-bold mb-12 pl-6">
                Warranty
            </h1>
            <div className="flex flex-col md:flex-row gap-3 p-4">
                <a href="/warranty/registration" className="flex-1 bg-gray-200 p-6 m-3">
                    <div className="h-[200px] flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-center">Warranty Registration</h2>
                    </div>
                </a>
                <a href="/warranty/claim" className="flex-1 bg-gray-200 p-6 m-3">
                    <div className="h-[200px] flex items-center justify-center">
                        <h2 className="text-4xl font-bold text-center">Warranty Claim</h2>
                    </div>
                </a>
            </div>
        </div>
    );
}
