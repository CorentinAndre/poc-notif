import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AddNotificationContext } from "./NotificationContexts";
import NotificationCenter from "./NotificationCenter";

function App() {
  const add = useContext(AddNotificationContext);
  const notify = type => {
    return add({ type, message: type, timeout: 2000 });
  };
  return (
    <div>
      <NotificationCenter />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button type="button" onClick={() => notify("success")}>
            Success
          </button>
          <button type="button" onClick={() => notify("warning")}>
            Warning
          </button>
          <button type="button" onClick={() => notify("error")}>
            Error
          </button>
        </header>
      </div>
    </div>
  );
}

export default App;
