import React from 'react';

const Card = ({ title, items, colors }) => {
    return (
        <div className="swiper-slide">
            <div className="overflow-hidden w-full md:w-74 m-2 border">
                <div className={`px-4 py-5 text-white flex justify-between items-center`} style={{ backgroundColor: colors.header }}>
                    <div>
                        <h2 className="text-sm">Bestseller</h2>
                        <h2 className="text-xl font-semibold">{title}</h2>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                        </svg>
                    </div>
                </div>
                <div className="p-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center mb-4 py-2">
                            <div className="mr-4 text-2xl font-bold" style={{ color: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'inherit' }}>
                                {index + 1}
                            </div>
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mx-4 " />
                            <div className="flex-grow">
                                <div className="text-lg font-medium">{item.name}</div>
                                <div className="text-gray-600">{item.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
