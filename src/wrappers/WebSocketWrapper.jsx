import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_SERVER } from "../constants/websocketServer";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./MobxWrapper";
import logguer from "../helpers/logguer";

export const Signaling = React.createContext();

class SignalingService {
  constructor(socket) {
    this.socket = socket;
    this.connect();
    this.socket.on("connect", () => {
      logguer("connect", this.socket.id);
    });

    this.socket.on("connect_error", () => {
      console.error("Error connecting");
    });

    this.socket.on("disconnect", () => {
      logguer("disconnect", this.socket.id);
    });
  }

  send(message, data) {
    logguer(`signaling send`, { message, data });
    this.socket.emit(message, data);
  }

  listen(callback) {
    this.socket.onAny((eventName, ...args) => {
      logguer("listen", { eventName, ...args });
      callback && callback(eventName, ...args);
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const WebSocketWrapper = observer(({ children }) => {
  const context = useContext(StoreContext);
  const [webSocket, setWebSocket] = useState();
  const { username } = context;
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
