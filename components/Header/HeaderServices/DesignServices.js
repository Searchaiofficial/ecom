"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import services from './servicesData';
import styles from '../styles.module.css'; // Import CSS module
import { useRouter } from 'next/navigation';

const DesignServices = ({ handleChange, toggleMobileMenu }) => {
    const [allOffers, setAllOffers] = useState([]);
    const [selectedService, setSelectedService] = useState(services[0]);

    const handleMouseEnter = (service) => {
        setSelectedService(service);
    };

    return (
        <div className="md:container mx-auto h-full overflow-y-auto md:overflow-hidden sm:h-[72vh]">
            <header className="flex flex-col sm:flex-col md:flex-row w-full h-screen overflow-auto md:overflow-hidden ">
                <AsideBox services={services} onMouseEnter={handleMouseEnter} selectedService={selectedService} toggleMobileMenu={toggleMobileMenu} />
                <div className="lg:inline-block lg:h-full lg:min-h-[1em] lg:w-[0.5px] lg:self-stretch lg:bg-[#f5f5f5] "></div>
                <DisplayBox selectedService={selectedService} handleChange={handleChange} toggleMobileMenu={toggleMobileMenu} />
            </header>
        </div>
    );
};

const AsideBox = ({ services, onMouseEnter, selectedService }) => (
    <aside className={`w-full  md:w-1/4 lg:w-1/5 md:sticky md:top-0 h-full my-2 lg:my-0  lg:pb-4 pb-0 `}>
        <div className={`h-full mb-2 pb-2 `}>
            {services.map((service) => (
                <div
                    key={service.id}
                    onMouseEnter={() => onMouseEnter(service)}
                    className={`text-[14px] p-2 cursor-pointer mb-2 font-semibold ${selectedService.id === service.id ? 'underline text-blue-600' : 'hover:underline hover:text-blue-600'}`}
                >
                    {service.name}
                </div>
            ))}
        </div>
    </aside>
);

const DisplayBox = ({ selectedService, handleChange, toggleMobileMenu, handleClick }) => {
    const router = useRouter();
    const handleClickItem = (link) => {
        console.log(link)
        if (window.innerWidth < 700) {
            toggleMobileMenu()
        }
        router.push(link);
    }
    return (
        <div className={`w-full md:w-3/4 lg:w-4/5  h-full sm:mx-5 mx-0  my-2`}>
            <h2 className="lg:text-[14px] text-[18px] p-2 mb-2 font-semibold w-full">{selectedService.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {selectedService.details.map((detail, index) => (
                    <div key={index} className="p-[10px] hover:bg-zinc-100 w-full md:max-w-[270px] m-0">
                        <div onClick={() => handleClickItem(detail.link)} >
                            <Image
                                loading="lazy"
                                src={detail.image}
                                alt={detail.title}
                                width={170}
                                height={80}
                                className="md:w-[170px] w-full h-[130px] md:h-[80px] mb-1"
                            />
                            <h3 className="text-[14px] font-semibold pt-2 line-clamp-1">{detail.title}</h3>
                            <p className="text-[12px] line-clamp-1">{selectedService.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default DesignServices;
