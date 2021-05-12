import { Component } from "react";
import React from "react";
import "./App.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimerValue: "",
    };
  }

  setTimerValue = (given) => {
    this.setState({
      setTimerValue: given.target.value,
    });
  };

  handleTimerSubmit = (event) => {
    event.preventDefault();
    const timeInMinutes = this.state.setTimerValue;
    const H = ("0" + parseInt(timeInMinutes / 60)).slice(-2);
    const M = ("0" + parseInt(timeInMinutes % 60)).slice(-2);
    const S = ("0" + parseInt((timeInMinutes * 60) % 60)).slice(-2);
    const timeFormat = `${H}:${M}:${S}`;
    this.setState({
      timerSet: timeFormat,
    });
  };

  startTimer = (event) => {
    event.preventDefault();
    console.log("This will start the timer");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <link
            href="https://fonts.googleapis.com/css?family=Orbitron"
            rel="stylesheet"
          />
          <p>How long do you want to set a timer for (In Minutes)? </p>
          <input
            type="text"
            value={this.state.setTimerValue}
            onChange={this.setTimerValue}
          />
          <form onSubmit={this.handleTimerSubmit}>
            <button type="submit">Set Timer</button>
          </form>
          <h2>{this.state.timerSet}</h2>
          <button className="btn" onClick={this.startTimer}>
            Start Timer
          </button>
        </header>
      </div>
    );
  }
}

export default Timer;
