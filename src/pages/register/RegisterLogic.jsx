import React, { useEffect, useState, useContext } from "react";
import RegisterUI from "./RegisterUI";
import { WebSocketContext } from "../../App";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";

const RegisterLogic = () => {
  const [userId, setUserId] = useState("");
  const [webSocketId, setWebSocketId] = useState("");
  const [webSocket, setWebSocket] = useState();
  const [userList, setUserList] = useState([]);
  const io = useContext(WebSocketContext);
  const history = useHistory();

  useEffect(() => {
    if (webSocketId) {
      const socket = io("localhost:8080", {
        query: {
          id: webSocketId,
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
  }, [webSocketId]);

  const onDone = (id) => {
    if (id) {
      setWebSocketId(id);
      history.push(routes.LOBBY);
    }
  };

  const callOut = (id) => {
    console.log({ webSocket });
  };

  return (
    <div>
      <RegisterUI
        {...{
          setUserId,
          userId,
          onDone,
          userList,
          webSocketId,
          callOut,
        }}
      />
    </div>
  );
};

export default RegisterLogic;
