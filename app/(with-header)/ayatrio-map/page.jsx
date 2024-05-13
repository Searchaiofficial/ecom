import dynamic from "next/dynamic";
const MapPage = dynamic(()=>import('@/components/mainmap/MapPage'))
const page = () => {
  return <MapPage />;
};
export default page;
