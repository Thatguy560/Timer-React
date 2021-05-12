import { Component } from "react";
import "./App.css";
import React from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Timer App - Button will set timer and count down till it reaches 0
          </p>
        </header>
      </div>
    );
  }
}

export default Timer;
