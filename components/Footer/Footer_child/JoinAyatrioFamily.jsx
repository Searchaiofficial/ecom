import Image from "next/image";
const JoinAyatrioFamily = () => {
  return (
    <div className="space-y-4">
      <h4 className="sm:text-base text-xl">Join Ayatrio Family</h4>
      <div>
        <Image width={200} height={40} src="/images/ayatriologo.webp" alt="Ayatrio Logo" priority />
      </div>
      <div>
        <h4>
          Enjoy member-only discounts & offers, early access to Ayatrio sale,
          delicious gift offers and much more. Join for free.
        </h4>
      </div>
      <button className="bg-black py-3 sm:px-7 px-3 rounded-full text-white">
        Join the club
      </button>
    </div>
  );
};

export default JoinAyatrioFamily;
