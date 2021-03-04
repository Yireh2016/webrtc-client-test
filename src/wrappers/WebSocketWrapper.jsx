import React, { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_SERVER } from "../constants/websocketServer";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./MobxWrapper";

const WebSocketContext = React.createContext();

const WebSocketWrapper = observer((props) => {
  const { userId, setUserList } = useContext(StoreContext);
  const [webSocket, setWebSocket] = useState();

  useEffect(() => {
    console.log("WebSocketWrapper userId", userId, setUserList);
    if (userId) {
      const socket = io(WEBSOCKET_SERVER, {
        query: {
          id: userId,
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

          case "user-already-exist":
            // setUserList(...args);
            window.alert("user-already-exist");
            break;
          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {props.children}
    </WebSocketContext.Provider>
  );
});

export default WebSocketWrapper;
// const WebSocketWrapper = ({ children }) => {
//   const user = useSelector(getUser);
//   const [webSocket, setWebSocket] = useState();

//   useEffect(() => {
//     if (user) {
//       const socket = io(WEBSOCKET_SERVER, {
//         query: {
//           id: user,
//         },
//       });
//       setWebSocket(socket);
//       socket.connect();
//       socket.on("connect", () => {
//         console.log(socket.id);
//       });

//       socket.on("connect_error", () => {
//         console.error("Error connecting");
//       });

//       socket.on("disconnect", () => {
//         console.log(socket.id);
//       });

//       socket.onAny((eventName, ...args) => {
//         switch (eventName) {
//           case "user-list":
//             setUserList(...args);
//             break;

//           case "user-already-exist":
//             // setUserList(...args);
//             window.alert("user-already-exist");
//             break;
//           default:
//             break;
//         }
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

//   return (
//     <WebSocketContext.Provider value={webSocket}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };
