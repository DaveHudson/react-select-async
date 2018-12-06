import React, { Component } from "react";
import ReactDOM from "react-dom";
import AsyncSelect from "react-select/lib/Async";
import "./styles.css";

// TODO: react-select example with randomuser.me info
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
