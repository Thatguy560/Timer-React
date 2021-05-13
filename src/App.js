import { Component } from "react";
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
        input.which !== 46
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
      this.state.setTimerValue <= 0 ? null : this.state.setTimerValue * 60;
    const H = ("0" + parseInt(timeInMinutes / (60 * 60))).slice(-2);
    const M = ("0" + parseInt((timeInMinutes / 60) % 60)).slice(-2);
    const S = ("0" + parseInt(timeInMinutes % 60)).slice(-2);
    const timeFormat = `${H}:${M}:${S}`;
    this.setState({
      time: timeInMinutes,
      timerSet: timeFormat,
    });
  };

  startTimer = (event) => {
    event.preventDefault();
    let time = parseInt(this.state.time);
    document.getElementById("Countdown").style.display = "block";
    document.getElementById("timerSet").style.display = "none";
    setInterval(() => {
      if (time === 0) {
        // console.log("Time over");
      } else {
        time -= 1;
        const H = ("0" + parseInt(time / (60 * 60))).slice(-2);
        const M = ("0" + parseInt((time / 60) % 60)).slice(-2);
        const S = ("0" + parseInt(time % 60)).slice(-2);
        var timeTest = `${H}:${M}:${S}`;
      }
      this.setState({
        timeLeft: time,
        timeRemaining: timeTest,
      });
    }, 1000);
  };

  render() {
    var test =
      this.state.timeLeft === 0 ? "Times Up!" : this.state.timeRemaining;
    console.log(test);

    return (
      <div className="App">
        <header className="App-header">
          <h2>How long do you want to set a timer for (In Minutes)?</h2>
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
          <h2 id="timerSet" style={{ display: "block" }}>
            {this.state.timerSet}
          </h2>
          <h2 id="Countdown" style={{ display: "none" }}>
            {test}
          </h2>
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
