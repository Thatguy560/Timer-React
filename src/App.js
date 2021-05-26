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
    const timeInput = givenTime.target.value;
    const SetTimerDisplay = document.getElementById("SetTimer").style;
    if (timeInput > 0 && timeInput !== "") {
      SetTimerDisplay.display = "block";
    } else {
      SetTimerDisplay.display = "none";
    }
    this.setState({
      setTimerValue: timeInput,
    });
  };

  resetTimer = () => {
    window.location.reload(false);
  };

  handleTimerSubmit = (event) => {
    event.preventDefault();
    document.getElementById("StartTimer").style.display = "block";
    let timeInMinutes = this.state.setTimerValue * 60;
    this.setState({
      time: timeInMinutes,
    });
  };

  startTimer = (event) => {
    event.preventDefault();
    let time = parseInt(this.state.time);
    // document.getElementById("Countdown").style.opacity = "1";
    document.getElementById("Countdown").style.display = "block";
    document.getElementById("ResetTimer").style.display = "block";
    document.getElementById("PauseTimer").style.display = "block";
    document.getElementById("StartTimer").style.display = "none";
    document.getElementById("SetTimer").style.display = "none";
    document.getElementById("Input").style.display = "none";
    document.getElementById("Intro").style.display = "none";
    document.getElementById("Warning").style.display = "none";
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
        timeRemainingInterval: myInterval,
      });
    }, 1000);
  };

  pauseTimer = () => {
    let timeLeftInterval = this.state.timeRemainingInterval;
    clearInterval(timeLeftInterval);
    document.getElementById("PauseTimer").style.display = "none";
    document.getElementById("ResumeTimer").style.display = "block";
  };

  resumeTimer = () => {
    document.getElementById("PauseTimer").style.display = "block";
    document.getElementById("ResumeTimer").style.display = "none";
  };

  testAudio = () => {
    let alarmAudio = new Audio("./Audio/250629__kwahmah-02__alarm1.mp3");
    alarmAudio.volume = 0.5;
    alarmAudio.play();
  };

  render() {
    let displayedCountdownTimer =
      this.state.timeLeft === 0 ? "00:00:00" : this.state.timeRemaining;
    if (this.state.timeLeft === 0) {
      alert("TIMES UP");
      // let alarmAudio = new Audio("./Audio/250629__kwahmah-02__alarm1.mp3");
      // alarmAudio.volume = 0.5;
      // alarmAudio.play();
    }

    return (
      <div className="App">
        <header className="App-header">
          <h2 id="Intro">How long do you want to set a timer for? (Minutes)</h2>
          <p id="Warning">
            {this.state.setTimerValue <= 0 && this.state.setTimerValue !== ""
              ? "Please enter a number greater than 0."
              : null}
          </p>
          <input
            type="text"
            placeholder="Please enter a timer limit..."
            id="Input"
            value={this.state.setTimerValue}
            onChange={this.setTimerValue}
          />
          <form onSubmit={this.handleTimerSubmit}>
            <button type="submit" id="SetTimer" style={{ display: "none" }}>
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
            id="PauseTimer"
            className="btn"
            type="button"
            style={{ display: "none" }}
            onClick={this.pauseTimer}
          >
            Pause Timer
          </button>
          <button
            id="ResumeTimer"
            className="btn"
            type="button"
            style={{ display: "none" }}
            onClick={this.resumeTimer}
          >
            Resume Timer
          </button>
          <button
            id="ResetTimer"
            type="button"
            className="btn"
            style={{ display: "none" }}
            onClick={this.resetTimer}
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
