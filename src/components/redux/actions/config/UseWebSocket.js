import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const SOCKET_URL = "http://localhost:3001/https://bar-order-management-system-production.up.railway.app/websocket";

const useWebSocket = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const sock = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(() => sock);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/public", (message) => {
        if (message.body) {
          setMessage(() => JSON.parse(message.body));
        }
      });
    });

    setClient(stompClient);

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  return { client, message };
};

export default useWebSocket;
