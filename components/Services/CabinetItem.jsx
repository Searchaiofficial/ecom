
const CabinetItem = ({ imageSrc, title, price, description }) => {
    return (
        <div className="pub-layout-50-50 s1cmcu6f flex flex-wrap">
            <div className=" w-full p-4">
                <div className=" vz2frqh v18by0fb">
                    <img
                        className="w-full h-auto"
                        src={imageSrc}
                        alt="Cabinet"
                    />
                </div>
            </div>
            <div className=" w-full p-4">
                <div className="">
                    <h3 className="text-xl font-semibold mb-4">{title}</h3>
                    <ul className="list-disc pl-4">
                        {description.map((item, index) => (
                            <li key={index} className="mb-2">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CabinetItem;
