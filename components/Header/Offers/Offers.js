import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed and imported
import { useRouter } from 'next/navigation'; // Update import for useRouter
import styles from '../styles.module.css'; // Import CSS module

const OfferSection = ({ toggleMobileMenu }) => {
    const [allOffers, setAllOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleMouseEnter = (offer) => {
        setSelectedOffer(offer);
    };

    const handleClick = () => {

        toggleMobileMenu();

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
        <div className="container mx-auto h-screen sm:h-[50vh]">
            <header className="flex flex-col md:flex-row w-full h-full overflow-hidden">
                {window.innerWidth > 800 && (
                    <OfferAsideBox offers={allOffers} onMouseEnter={handleMouseEnter} selectedOffer={selectedOffer} />
                )}
                <div className="md:inline-block md:h-full md:min-h-[1em] md:w-[0.5px] md:self-stretch md:bg-[#f5f5f5]"></div>
                {selectedOffer && <OfferDisplayBox selectedOffer={selectedOffer} handleClick={handleClick} />}
            </header>
        </div>
    );
};

const OfferAsideBox = ({ offers, onMouseEnter, selectedOffer }) => (
    <aside
        className={`w-full md:w-1/4 lg:w-1/5 md:sticky md:top-0 h-full overflow-y-auto ${styles['services-scrollbar']} my-2`}
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

const OfferDisplayBox = ({ selectedOffer, handleClick }) => {
    const router = useRouter();

    const handleClickOffer = (offer) => {
        if (window.innerWidth < 700) {
            handleClick();
        }
        router.push(`/offers/new/${offer.type.replace(/%/g, "percent").replace(/ /g, "-")}`);
    };

    return (
        <div className={`w-full md:w-3/4 lg:w-4/5 pl-5 h-full overflow-y-auto my-2 ${styles.servicesScrollbar}`}>
            <h2 className="lg:text-[14px] text-[18px] p-2 mb-2 font-semibold w-full">{selectedOffer.type}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="p-[15px] hover:bg-zinc-100 max-w-[270px]">
                    <div onClick={() => handleClickOffer(selectedOffer)} className="cursor-pointer">
                        <h3 className="text-[14px] font-semibold md:max-w-50% line-clamp-1">{selectedOffer.type}</h3>
                        <p className="text-[12px] line-clamp-1">Description for {selectedOffer.type}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferSection;
