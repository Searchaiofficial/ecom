import CheckoutBox from './CheckoutBox';

export default function Checkout({ content }) {
    return (
        <section className="my-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 " id='tools'>
            {content.map((box, idx) => (
                <CheckoutBox key={idx} boxContent={box} />
            ))}
        </section>
    );
}
