import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_SERVER } from "../constants/websocketServer";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./MobxWrapper";

export const Signaling = React.createContext();

class SignalingService {
  constructor(socket) {
    this.socket = socket;
    this.connect();
    this.socket.on("connect", () => {
      console.log("connect", this.socket.id);
    });

    this.socket.on("connect_error", () => {
      console.error("Error connecting");
    });

    this.socket.on("disconnect", () => {
      console.log(this.socket.id);
    });
    console.log("new SignalingService");
  }

  send(message, data) {
    console.log(`signaling send`, { message, data });
    this.socket.emit(message, data);
  }

  listen(callback) {
    this.socket.onAny((eventName, ...args) => {
      console.log("listen", { eventName, ...args });
      callback && callback(eventName, ...args);
    });
  }

  connect() {
    this.socket.connect();
  }
}

const WebSocketWrapper = observer(({ children }) => {
  const context = useContext(StoreContext);
  const [webSocket, setWebSocket] = useState();
  const { username } = context;
  console.log("WebSocketWrapper", { webSocket });
  useEffect(() => {
    if (username) {
      const socket = io(WEBSOCKET_SERVER, {
        query: {
          id: username,
        },
      });

      setWebSocket(new SignalingService(socket));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return <Signaling.Provider value={webSocket}>{children}</Signaling.Provider>;
});

export default WebSocketWrapper;
