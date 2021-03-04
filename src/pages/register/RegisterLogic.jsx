import React, { useState } from "react";
import RegisterUI from "./RegisterUI";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";
import { setUser } from "../../store/actions";

const RegisterLogic = () => {
  const [userId, setUserId] = useState("");
  const history = useHistory();

  const onDone = (id) => {
    if (id) {
      setUser(id);
      history.push(routes.LOBBY);
    }
  };

  return (
    <div>
      <RegisterUI
        {...{
          setUserId,
          userId,
          onDone,
        }}
      />
    </div>
  );
};

export default RegisterLogic;
