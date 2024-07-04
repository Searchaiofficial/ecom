import Image from "next/image";
export default function PlanningCard({ content = {} }) {
    return (
        <section className="m-10" id="appointment">
            <div>
                <Image
                    src={`${content.image}`}
                    alt="image"
                    width={500}
                    height={300}
                    className="h-[300px]"
                />
            </div>

            <div>
                <h3 className="text-black text-2xl font-semibold my-6">{content.title}</h3>
                <h4 className="text-black text-lg font-bold mb-3 opacity-70">{content.subtitle}</h4>
                <p className="mb-3 opacity-70">{content.description}</p>
                <button className="rounded-full bg-black text-white px-10 text-wrap w-200 text-md font-bold my-3 py-2 max-h-[100px]">{content.button}</button>
            </div>

            <div>
                <ul>
                    {content.links.map((link, idx) => (
                        <li
                            key={idx}
                            className="
                            ml-4 
                            my-2 
                            opacity-70 
                            text-[15px] 
                            underline 
                            hover:opacity-100 
                            cursor-pointer 
                            sm:text-sm 
                            sm:ml-2 
                            md:text-base 
                            lg:text-lg 
                            xl:text-xl
                        ">
                            {link}
                        </li>

                    ))}
                </ul>
            </div>


        </section>
    );
}
