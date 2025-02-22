import { useEffect } from "react";
import { io } from "socket.io-client";

// Socket instance
const socket = io("https://get-it-done-server.onrender.com", {
  transports: ["websocket", "polling"],
});


const useSocket = (event, callback) => {
  useEffect(() => {
    // Listen to events
    socket.on(event, callback);

    // Cleanup on component unmount
    return () => {
      socket.off(event);
    };
  }, [event, callback]);

  return socket;
};

export default useSocket;
