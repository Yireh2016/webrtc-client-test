import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterLogic from "./pages/register/RegisterLogic";
import LobbyLogic from "./pages/lobby/LobbyLogic";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants/theme";
import { routes } from "./constants/routes";
import { Provider } from "react-redux";
import store from "./store";
import WebSocketWrapper from "./wrappers/WebSocketWrapper";
import AuthWrapper from "./wrappers/AuthWrapper";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <WebSocketWrapper>
          <Router>
            <Switch>
              <AuthWrapper>
                {/* <Route path="/about">
              <About />
            </Route>
             */}
                <Route exact path={routes.LOBBY}>
                  <LobbyLogic />
                </Route>
                <Route exact path="/">
                  <RegisterLogic />
                </Route>
              </AuthWrapper>
            </Switch>
          </Router>
        </WebSocketWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
