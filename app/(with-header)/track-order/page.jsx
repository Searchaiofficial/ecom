export default function TrackOrder() {
    return (
        <div>
            <div className="md:px-[67px] mx-auto px-[20px] pt-[170px]">
                <div className="p-6 flex gap-6 items-center">
                    <div className="p-4 w-full md:w-[70%]">
                        <h1 className="text-black text-4xl font-bold mb-12 pr-3">
                            Track & manage my order
                        </h1>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="orderNumber" className="block text-gray-700">Order number</label>
                                <input type="text" id="orderNumber" required minLength="9" maxLength="10" autoComplete="off" inputMode="numeric" aria-required="true" className="w-full p-2 border border-black rounded mt-1 h-12" />
                                <p className="text-gray-600 text-sm mt-1">9-10 digits with no spaces</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="liteId" className="block text-gray-700">Email or phone number</label>
                                <input type="text" id="liteId" required autoComplete="off" aria-required="true" className="w-full p-2 border border-black rounded mt-1 h-12" />
                                <p className="text-gray-600 text-sm mt-1">The email or phone number used when placing the order</p>
                            </div>
                            <button type="submit" className="bg-black text-white py-3 rounded-full px-8 sm:px-12 md:px-20 mt-6 w-full sm:w-auto">
                                Look up order
                            </button>

                        </form>
                    </div>

                    <div className="hidden md:flex items-center justify-center border rounded-lg shadow-md h-[150px] w-[300px] pl-4">
                        <svg className="w-6 h-6 text-black mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 9.5c.6904 0 1.25-.5596 1.25-1.25S12.6904 7 12 7s-1.25.5596-1.25 1.25S11.3096 9.5 12 9.5zM11 11v6h2v-6h-2z"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.4771 2 2 6.4771 2 12c0 5.5228 4.4771 10 10 10 5.5228 0 10-4.4772 10-10 0-5.5229-4.4772-10-10-10zM4 12c0-4.4183 3.5817-8 8-8s8 3.5817 8 8-3.5817 8-8 8-8-3.5817-8-8z"></path>
                        </svg>
                        <p className="text-black"><a href="/login" className="text-black underline">Log in</a> to view your complete purchase history and information</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
