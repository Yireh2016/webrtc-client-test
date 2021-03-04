import React, { useState, useContext } from "react";
import RegisterUI from "./RegisterUI";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../wrappers/MobxWrapper";

const RegisterLogic = observer(() => {
  const context = useContext(StoreContext);
  const { setUsername } = context;

  const [userId, setUserId] = useState("");
  const history = useHistory();

  console.log({ context });
  const onDone = (id) => {
    if (id) {
      setUsername(id);
      history.push(routes.LOBBY);
    }
  };

  return (
    <RegisterUI
      {...{
        setUserId,
        userId,
        onDone,
      }}
    />
  );
});

export default RegisterLogic;
