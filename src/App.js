import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [webSocketId, setWebSocketId] = useState("");
  const [webSocket, setWebSocket] = useState();
  const [userList, setUserList] = useState([]);
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
        console.log(socket.id); // undefined
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
  }, [webSocketId]);

  const setIdHandler = (id) => {
    if (id) {
      setWebSocketId(id);
    }
  };

  const callOut = (id) => {
    console.log({ webSocket });
  };
  console.log({ userList });
  return (
    <div className="App">
      <input
        type="text"
        onChange={({ target }) => setUserId(target.value)}
        value={userId}
      />
      <button onClick={() => setIdHandler(userId)}>Set ID</button>
      <div>
        {userList.length > 0 &&
          userList.map(({ user_id }) => {
            return (
              <div key={user_id}>
                {webSocketId === user_id ? null : (
                  <h2 onClick={() => callOut(user_id)}>{user_id}</h2>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
