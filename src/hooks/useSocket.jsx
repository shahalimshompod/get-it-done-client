import { useEffect, useCallback, useState } from "react";
import { io } from "socket.io-client";

// Create socket instance only once, but don't connect immediately
const socket = io("https://get-it-done-server.onrender.com", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: false, // Prevents auto-connecting before event listeners are set
});

const useSocket = (event, callback) => {
  const stableCallback = useCallback(callback, []);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); // Connect only when needed
    }

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(event, stableCallback);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(event, stableCallback);
    };
  }, [event, stableCallback]);

  return { socket, isConnected };
};

export default useSocket;
