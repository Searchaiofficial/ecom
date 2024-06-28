import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios'; // Ensure axios is installed and imported
import styles from '../styles.module.css'; // Import CSS module

const OfferSection = () => {
    const [allOffers, setAllOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleMouseEnter = (offer) => {
        setSelectedOffer(offer);
    };

    useEffect(() => {
        const fetchAllOffers = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getAllOffers`
                );
                setAllOffers(response.data);
                if (response.data.length > 0) {
                    setSelectedOffer(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchAllOffers();
    }, []);

    return (
        <div className="container mx-auto h-[50vh]">
            <header className="flex flex-col md:flex-row w-full h-full overflow-hidden">
                <OfferAsideBox offers={allOffers} onMouseEnter={handleMouseEnter} selectedOffer={selectedOffer} />
                {selectedOffer && <OfferDisplayBox selectedOffer={selectedOffer} />}
            </header>
        </div>
    );
};

const OfferAsideBox = ({ offers, onMouseEnter, selectedOffer }) => (
    <aside
        className={`w-full md:w-1/4 lg:w-1/5 md:sticky md:top-0 border-r h-full overflow-y-auto ${styles.servicesScrollbar} ${styles['services-scrollbar']}`}
        aria-label="Offer List"
    >
        <div className="h-full">
            {offers.map((offer) => (
                <div
                    key={offer._id}
                    onMouseEnter={() => onMouseEnter(offer)}
                    className={`text-[14px] p-2 cursor-pointer mb-2 font-semibold ${selectedOffer?._id === offer._id ? 'underline text-blue-600' : 'hover:underline hover:text-blue-600'}`}
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => onMouseEnter(offer)}
                >
                    {offer.type}
                </div>
            ))}
        </div>
    </aside>
);

const OfferDisplayBox = ({ selectedOffer }) => (
    <div className={`w-full md:w-3/4 lg:w-4/5 pl-5 h-full overflow-y-auto ${styles.servicesScrollbar}`}>
        <h2 className="lg:text-[14px] text-[18px] p-2 mb-2 font-semibold w-full">{selectedOffer.type}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="p-[15px] hover:bg-zinc-100 max-w-[270px]">
                <Link href={`/heading/offers/${selectedOffer.type.replace(/ /g, "-")}`}>
                    <h3 className="text-[14px] font-semibold md:max-w-50% line-clamp-1">{selectedOffer.type}</h3>
                    <p className="text-[12px] line-clamp-1">Description for {selectedOffer.type}</p>
                </Link>
            </div>
        </div>
    </div>
);

export default OfferSection;
