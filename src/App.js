import "./App.css";
import { io } from "socket.io-client";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterLogic from "./pages/register/RegisterLogic";
import LobbyLogic from "./pages/lobby/LobbyLogic";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants/theme";
import { routes } from "./constants/routes";

export const WebSocketContext = React.createContext();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WebSocketContext.Provider value={io}>
        <Router>
          <Switch>
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
          </Switch>
        </Router>
      </WebSocketContext.Provider>
    </ThemeProvider>
  );
}

export default App;
