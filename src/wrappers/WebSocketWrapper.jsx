import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_SERVER } from "../constants/websocketServer";
import { useSelector } from "react-redux";
import { getUser } from "../store/selectors";
import { setUserList } from "../store/actions";
import { useHistory } from "react-router-dom";
import { routes } from "../constants/routes";

const WebSocketContext = React.createContext();

const WebSocketWrapper = ({ children }) => {
  const user = useSelector(getUser);
  const [webSocket, setWebSocket] = useState();

  useEffect(() => {
    if (user) {
      const socket = io(WEBSOCKET_SERVER, {
        query: {
          id: user,
        },
      });
      setWebSocket(socket);
      socket.connect();
      socket.on("connect", () => {
        console.log(socket.id);
      });

      socket.on("connect_error", () => {
        console.error("Error connecting");
      });

      socket.on("disconnect", () => {
        console.log(socket.id);
      });

      socket.onAny((eventName, ...args) => {
        switch (eventName) {
          case "user-list":
            setUserList(...args);
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketWrapper;
