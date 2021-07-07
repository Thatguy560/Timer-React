class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimerValue: 0,
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
    console.log(`this is the entered time - ${time}`);
    // this.resetTimer();
    // Possibly have it so it takes original time and stores it for reset
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
        const H = ("0" + parseInt(time / 3600)).slice(-2);
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

  RestartApp = () => {
    window.location.reload(false);
  };

  resetTimer = () => {
    console.log("Test");
  };

  pauseTimer = () => {
    let timeLeftInterval = this.state.timeRemainingInterval;
    clearInterval(timeLeftInterval);
    document.getElementById("PauseTimer").style.display = "none";
    document.getElementById("ResumeTimer").style.display = "block";
    console.log(`Paused at ${this.state.timeLeft} Use the time at this point`);
    // document.getElementById("Countdown").style.display = "none";
    // Have a pause/resume timer function instead and then set the state
    // to the remaining time here so it can be re-used.
  };

  resumeTimer = () => {
    document.getElementById("PauseTimer").style.display = "block";
    document.getElementById("ResumeTimer").style.display = "none";
    let resumedTime = this.state.timeLeft;
  };

  render() {
    console.log(`Time at Render ${this.state.timeLeft}`);
    let timesUp = document.getElementById("PauseTimer");
    // Call the resumed timer here in something similiar to displayedCountdownTimer
    // then in return have the same thing as h1 countdown tag except now this is the resumed time
    // Make the original countdown timer invisible and make resumed time visible
    let displayedCountdownTimer =
      this.state.timeLeft === 0 ? "00:00:00" : this.state.timeRemaining;
    if (this.state.timeLeft === 0) {
      const alarmAudio = new UIfx(audio, {
        volume: 0.3,
        throttleMs: 100,
      });
      alarmAudio.play();
      timesUp.innerHTML = "Times Up!";
      timesUp.disabled = true;
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
            onClick={this.RestartApp}
          >
            Restart Timer
          </button>
          <button className="btn" onClick={this.resetTimer}>
            Reset Timer
          </button>
        </header>
      </div>
    );
  }
}
