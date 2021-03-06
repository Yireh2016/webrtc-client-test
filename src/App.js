import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterLogic from "./pages/register/RegisterLogic";
import IncommingCallLogic from "./pages/incommingCall/IncommingCallLogic";
import LobbyLogic from "./pages/lobby/LobbyLogic";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants/theme";
import { routes } from "./constants/routes";
import WebSocketWrapper from "./wrappers/WebSocketWrapper";
import AuthWrapper from "./wrappers/AuthWrapper";
import MobxWrapper from "./wrappers/MobxWrapper";

function App() {
  return (
    <MobxWrapper>
      <ThemeProvider theme={theme}>
        <WebSocketWrapper>
          <Router>
            <Switch>
              <AuthWrapper>
                <Route exact path={routes.LOBBY}>
                  <LobbyLogic />
                </Route>
                <Route exact path={routes.HOME}>
                  <RegisterLogic />
                </Route>
                <Route exact path={routes.INCOMMING_CALL}>
                  <IncommingCallLogic />
                </Route>
              </AuthWrapper>
            </Switch>
          </Router>
        </WebSocketWrapper>
      </ThemeProvider>
    </MobxWrapper>
  );
}

export default App;
