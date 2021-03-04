import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../constants/routes";

const AuthWrapper = ({ children }) => {
  const user = "test";
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history && history?.push(routes.HOME);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <div>{children}</div>;
};

export default AuthWrapper;
