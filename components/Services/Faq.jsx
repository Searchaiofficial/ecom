"use client"
import React, { useState } from 'react';
import faqsDataJson from './faqData.json';

const FaqSection = ({ faqFor }) => {
    let faqsData = faqsDataJson[`${faqFor}`];
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <div className="lg:col-span-2">

                <div>
                    {faqsData.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <hr className="my-4 border-gray-300" />
                            <button
                                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-semibold">{faq.title}</span>
                                <img
                                    src={`/icons/${index === activeIndex ? 'uparrow.svg' : 'downarrow.svg'}`}
                                    alt={index === activeIndex ? 'Collapse' : 'Expand'}
                                    className="w-4 h-4 transition-transform transform"
                                />
                            </button>
                            <div className={`mt-2 px-4  transition-all duration-100 ${index === activeIndex ? 'max-h-96' : 'max-h-0 overflow-hidden'}`}>
                                <p>{faq.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
