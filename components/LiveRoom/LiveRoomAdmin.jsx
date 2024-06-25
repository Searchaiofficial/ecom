"use client";

import { useSocket } from "@/providers/SocketProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LiveRoomAdmin = () => {
  const router = useRouter();
  const socket = useSocket();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("join_request", (data) => {
        setRequests((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const handleResponse = (socketId, accepted) => {
    if (socket) {
      const roomId = Math.floor(1000 + Math.random() * 9000);
      socket.emit("admin_response", { socketId, accepted, roomId });
      if (accepted) {
        setRequests([]);
        router.push(`/liveroom/${roomId}`);
      } else {
        setRequests((prev) => prev.filter((req) => req.socketId !== socketId));
      }
    }
  };

  return (
    <div className="h-screen pt-10">
      <h1 className="text-center text-2xl font-bold">Live Room Admin</h1>
      <div className="grid grid-cols-6 p-4 gap-4 mt-4">
        {requests && requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.socketId}
              className="col-span-6 bg-white p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  className="object-cover w-12 h-12 rounded-full"
                  src={req.image}
                  alt="Profile"
                />
                <div>
                  <h1 className="text-lg font-semibold">{req.displayName}</h1>
                  <p className="text-sm text-gray-500">{req.email}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleResponse(req.socketId, true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleResponse(req.socketId, false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="col-span-6 text-center text-lg font-semibold">
            No requests
          </h1>
        )}
      </div>
    </div>
  );
};

export default LiveRoomAdmin;
