import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../constants/routes";
import { observer } from "mobx-react-lite";
import { StoreContext } from "./MobxWrapper";

const AuthWrapper = observer(({ children }) => {
  const { username } = useContext(StoreContext);
  const history = useHistory();

  useEffect(() => {
    if (!username) {
      history && history?.push(routes.HOME);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return <div>{children}</div>;
});

export default AuthWrapper;
