import { RoomsPage } from "@/components/Rooms/RoomsPage";


const page = ({ params }) => {
    return (
        <>
            <RoomsPage params={params.roomType} />
        </>
    );
};

export default page;
