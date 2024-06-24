"use client";

import { useSocket } from "@/providers/SocketProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LiveRoomAdmin = () => {
  const router = useRouter();
  const socket = useSocket();
  console.log(socket)
  const handleAcceptJoin = (data) => {
    console.log(data);
  };

  useEffect(() => {
    socket?.on("accept-join", handleAcceptJoin);

    return () => {
      socket?.off("accept-join", handleAcceptJoin);
    };
  }, [socket, handleAcceptJoin]);

  return (
    <div className="h-screen pt-10">
      <h1 className="text-center text-2xl font-bold">Live Room Admin</h1>
      <div className="grid grid-cols-6 p-4 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div>
            <h1 className="text-lg font-semibold">Name : John</h1>
            <h1 className="text-lg font-semibold">Mob no. 9876543210</h1>
            <button className="bg-green-600 text-sm text-white w-full p-2 rounded-full mt-4">
              Accept
            </button>
            <button className="bg-red-600 text-sm text-white w-full p-2 rounded-full mt-2">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRoomAdmin;
