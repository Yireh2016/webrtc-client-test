import React, { useState, useContext, useEffect } from "react";
import RegisterUI from "./RegisterUI";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../wrappers/MobxWrapper";
import { Signaling } from "../../wrappers/WebSocketWrapper";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";
import { signalingEvents } from "../../constants/signalingEvents";

const RegisterLogic = observer(() => {
  const { setUsername, setUserList } = useContext(StoreContext);
  const signaling = useContext(Signaling);
  const history = useHistory();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (signaling) {
      signaling.listen((eventName, ...args) => {
        switch (eventName) {
          case signalingEvents.USER_LIST:
            setUserList(...args);
            break;

          case signalingEvents.USER_ALREADY_EXIST:
            window.alert("user-already-exist");
            break;
          case signalingEvents.USER_REGISTERED:
            history.push(routes.LOBBY);
            break;

          default:
            break;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signaling]);

  const onDone = (id) => {
    id && setUsername(id);
  };

  const onUserKeyDown = (event) => {
    if (event.key === "Enter") {
      onDone(userId);
    }
  };

  return (
    <RegisterUI
      {...{
        setUserId,
        userId,
        onDone,
        onUserKeyDown,
      }}
    />
  );
});

export default RegisterLogic;
