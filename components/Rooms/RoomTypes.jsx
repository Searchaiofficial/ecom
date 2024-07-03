import React from 'react';
import temp from '../../public/product/room.jpg';
import Image from 'next/image';
import Link from 'next/link';

const RoomTypes = () => {
    const roomOptions = ["Living Room", "Bedroom", "Dining Room", "Bathroom", "Balcony", "Office Room", "Guest Room", "Pooja Room", "Kids Room", "Kitchen"];

    return (
        <div className="pt-12 bg-white sm:px-[50px] px-[20px]">
            <div className="mb-2 w-full flex justify-between items-center">
                <h2 className="font-semibold text-2xl py-[15px]">Room Types</h2>
            </div>
            <div className="flex flex-wrap">
                {roomOptions.map((room, index) => (
                    <div key={index} className="w-1/5 p-4">
                        <Link href={`/rooms/${room.replace(/\s+/g, '-')}`} passHref>
                            <div className="flex rounded-md overflow-hidden">
                                <Image src={temp} className="w-16 h-16 object-cover rounded-md" alt={room || "room"} />
                                <div className="p-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{room}</h3>
                                    <p className="text-sm text-gray-500">Description</p>
                                </div>
                            </div>

                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomTypes;
