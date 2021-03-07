import React from "react";
import Counter from "./components/counter";
import logo from "./logo.svg";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <Counter message={"debug"}></Counter>
    </div>
  );
}

export default App;
