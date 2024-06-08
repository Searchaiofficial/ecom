"use client";
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
                <h1 className="text-black text-2xl lg:text-4xl font-semibold mb-6 lg:mb-12 px-3 lg:text-left">
                    Frequently asked questions
                </h1>
                <div>
                    {faqsData.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <hr className="my-4 border-gray-300" /> {/* Line before each FAQ */}
                            <button
                                className="flex items-center justify-between w-full px-4 py-2 text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="font-semibold">{faq.title}</span>
                                <svg
                                    className={`w-6 h-6 transition-transform transform ${index === activeIndex ? 'rotate-180' : ''
                                        }`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12a1 1 0 0 1 .7.29l3 3a1 1 0 1 1-1.4 1.42L10 14.42l-2.3 2.3a1 1 0 1 1-1.4-1.42l3-3A1 1 0 0 1 10 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
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
