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

  setTimerValue = (givenTime) => {
    this.setState({
      setTimerValue: givenTime.target.value,
    });
  };

  resetTimer = () => {
    window.location.reload(false);
  };

  handleTimerSubmit = (event) => {
    event.preventDefault();
    document.getElementById("StartTimer").style.display = "block";
    let timeInMinutes =
      this.state.setTimerValue <= 0 ? "" : this.state.setTimerValue * 60;
    if (timeInMinutes <= 0) {
      document.getElementById("StartTimer").style.display = "none";
    }
    this.setState({
      time: timeInMinutes,
    });
  };

  startTimer = (event) => {
    event.preventDefault();
    let time = parseInt(this.state.time);
    document.getElementById("Countdown").style.display = "block";
    // document.getElementById("Countdown").style.opacity = "1";
    document.getElementById("ResetTimer").style.display = "block";
    document.getElementById("StopTimer").style.display = "block";
    document.getElementById("StartTimer").style.display = "none";
    document.getElementById("SetTimer").style.display = "none";
    document.getElementById("Input").style.display = "none";
    document.getElementById("Intro").style.display = "none";
    let myInterval = setInterval(() => {
      if (time === 0) {
        time = 0;
      } else {
        time -= 1;
        const H = ("0" + parseInt(time / (60 * 60))).slice(-2);
        const M = ("0" + parseInt((time / 60) % 60)).slice(-2);
        const S = ("0" + parseInt(time % 60)).slice(-2);
        var finalTimeFormat = `${H}:${M}:${S}`;
        if (time < 60) document.getElementById("Countdown").style.color = "red";
        if (time === 0) clearInterval(myInterval);
      }
      this.setState({
        timeLeft: time,
        timeRemaining: finalTimeFormat,
      });
    }, 1000);
  };

  stopTimer = () => {
    console.log("This should stop the timer");
    clearTimeout(this.state.setTimerValue);
    clearTimeout(this.state.timeLeft);
    clearInterval(this.state.timeRemaining);
  };

  testAudio = () => {
    // let alarmAudio = new Audio("./Audio/250629__kwahmah-02__alarm1.mp3");
    let alarmAudio = new Audio("src/250629__kwahmah-02__alarm1.mp3");
    alarmAudio.volume = 0.5;
    alarmAudio.play();
  };

  render() {
    let displayedCountdownTimer =
      this.state.timeLeft === 0 ? "00:00:00" : this.state.timeRemaining;
    if (this.state.timeLeft === 0) {
      alert("TIMES UP");
      let alarmAudio = new Audio("./Audio/250629__kwahmah-02__alarm1.mp3");
      alarmAudio.volume = 0.5;
      alarmAudio.play();
    }

    return (
      <div className="App">
        <header className="App-header">
          <h2 id="Intro">
            How long do you want to set a timer for (In Minutes)?
          </h2>
          <p>
            {this.state.setTimerValue <= 0 && this.state.setTimerValue !== ""
              ? "Please enter a number greater than 0."
              : null}
          </p>
          <input
            type="text"
            id="Input"
            value={this.state.setTimerValue}
            onChange={this.setTimerValue}
          />
          <form onSubmit={this.handleTimerSubmit}>
            <button type="submit" id="SetTimer">
              Set Timer
            </button>
          </form>
          <button
            id="StartTimer"
            className="btn"
            style={{ display: "none" }}
            onClick={this.startTimer}
          >
            Start Timer
          </button>
          <h1 id="Countdown" style={{ display: "none" }}>
            {displayedCountdownTimer}
          </h1>
          <button
            id="StopTimer"
            // className="btn"
            type="button"
            class="btn btn-warning"
            style={{ display: "none" }}
            onClick={this.stopTimer}
            type="button"
          >
            Stop Timer
          </button>
          <button
            id="ResetTimer"
            className="btn"
            style={{ display: "none" }}
            onClick={this.resetTimer}
            type="button"
          >
            Restart Timer
          </button>
          <button className="btn" onClick={this.testAudio}>
            Test Audio
          </button>
        </header>
      </div>
    );
  }
}

export default Timer;
