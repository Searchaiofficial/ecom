import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import services from './servicesData';
import styles from './styles.module.css'; // Import CSS module

const DesignServices = () => {
    const [allOffers, setAllOffers] = useState([]);
    const [selectedService, setSelectedService] = useState(services[0]);

    const handleMouseEnter = (service) => {
        setSelectedService(service);
    };

    return (
        <div className="container mx-auto h-[64vh]">
            <header className="flex flex-col md:flex-row w-full h-full overflow-hidden">
                <AsideBox services={services} onMouseEnter={handleMouseEnter} selectedService={selectedService} />
                <DisplayBox selectedService={selectedService} />
            </header>
        </div>
    );
};

const AsideBox = ({ services, onMouseEnter, selectedService }) => (
    <aside className={`w-full md:w-1/4 lg:w-1/5 md:sticky md:top-0 border-r h-full overflow-y-auto ${styles['services-scrollbar']}`}>
        <div className="h-full">
            {services.map((service) => (
                <div
                    key={service.id}
                    onMouseEnter={() => onMouseEnter(service)}
                    className={`text-[14px] p-2 cursor-pointer mb-2 font-semibold ${selectedService.id === service.id ? 'underline text-blue-600' : 'hover:underline hover:text-blue-600'
                        }`}
                >
                    {service.name}
                </div>
            ))}
        </div>
    </aside>
);

const DisplayBox = ({ selectedService }) => (
    <div className={`w-full md:w-3/4 lg:w-4/5 pl-5 h-full overflow-y-auto ${styles['services-scrollbar']}`}>

        <h2 className="lg:text-[14px] text-[18px] p-2 mb-2 font-semibold w-full">{selectedService.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
            {selectedService.details.map((detail, index) => (
                <div key={index} className="p-[10px] hover:bg-zinc-100 max-w-[270px] m-0">
                    <Link href={detail.link}>
                        <Image
                            src={detail.image}
                            alt={detail.title}
                            width={170}
                            height={80}
                            className="w-[170px] h-[80px] mb-1"
                        />
                        <h3 className="text-[14px] font-semibold pt-2 line-clamp-1">{detail.title}</h3>
                        <p className="text-[12px] line-clamp-1">{selectedService.description}</p>
                    </Link>
                </div>
            ))}
        </div>


    </div>
);

export default DesignServices;
