import SocketProvider from "@/providers/SocketProvider";

const LiveRoomLayout = ({ children }) => {
  return <SocketProvider>{children}</SocketProvider>;
};

export default LiveRoomLayout;
