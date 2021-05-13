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

  componentDidMount = () => {
    document.querySelector("input").addEventListener("keypress", (input) => {
      if (
        input.which > 31 &&
        (input.which < 48 || input.which > 57) &&
        input.which != 46
      ) {
        input.preventDefault();
      }
    });
  };

  setTimerValue = (given) => {
    this.setState({
      setTimerValue: given.target.value,
    });
  };

  handleTimerSubmit = (event) => {
    event.preventDefault();
    document.getElementById("timer").style.display = "block";
    let timeInMinutes =
      this.state.setTimerValue <= 0 ? null : this.state.setTimerValue;
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
          <p>How long do you want to set a timer for (In Minutes)? </p>
          <input
            type="text"
            value={this.state.setTimerValue}
            onChange={this.setTimerValue}
          />
          <form onSubmit={this.handleTimerSubmit}>
            <button type="submit">Set Timer</button>
            <p>
              {this.state.setTimerValue <= 0 && this.state.setTimerValue !== ""
                ? "Please enter a number greater than 0."
                : null}
            </p>
          </form>
          <h2>{this.state.timerSet}</h2>
          <button
            id="timer"
            className="btn"
            style={{ display: "none" }}
            onClick={this.startTimer}
          >
            Start Timer
          </button>
        </header>
      </div>
    );
  }
}

export default Timer;
