// useSocket.js (Custom hook)
import { useEffect } from "react";
import { io } from "socket.io-client";

// Socket instance
const socket = io("http://localhost:5000");

const useSocket = (event, callback) => {
  useEffect(() => {
    // Listen to events
    socket.on(event, callback);

    // Cleanup listener on component unmount
    return () => {
      socket.off(event);
    };
  }, [event, callback]);

  return socket;
};

export default useSocket;
