import React, { useRef } from "react";
import UIfx from "uifx";
import audio from "../assets/alarmAudio.mp3";
import "../css/App.css";

export function Timer() {
  const [time, setTime] = React.useState(0);
  const [originalTime, trackStartingTime] = React.useState(0);
  const [timerOn, IsTimerOn] = React.useState(false);
  const trackTime = useRef(0);

  const TimerValue = (givenTime) => {
    const timeInputInMinutes = givenTime.target.value * 60;
    setTime(timeInputInMinutes);
    trackStartingTime(timeInputInMinutes);
  };

  const SubmitTime = (e) => {
    e.preventDefault();
    document.getElementById("Container").style.display = "none";
    document.getElementById("Countdown").style.display = "inline-block";
    document.getElementById("StartTimer").style.display = "inline-block";
  };

  const playAlarmSound = () => {
    const alarmAudio = new UIfx(audio, {
      volume: 0.3,
      throttleMs: 100,
    });
    alarmAudio.play();
  };

  React.useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        if (time === 0) {
          setTime(0);
          playAlarmSound();
        } else {
          trackTime.current = time - 1;
          setTime(trackTime.current);
          if (time <= 60)
            document.getElementById("Countdown").style.color = "red";
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div id="Container">
          <h2 id="Intro">
            How long do you want to set a timer for in Minutes?
          </h2>
          <p id="Warning">Please enter a number greater than 0.</p>
          <input
            type="text"
            placeholder="Please enter a timer limit..."
            id="Input"
            onChange={TimerValue} // (givenTime) => setTime(givenTime.target.value)
          />
          <form onSubmit={SubmitTime}>
            <button type="submit" id="SetTimer">
              Set Timer
            </button>
          </form>
        </div>
        <div>
          <h1 id="Countdown" style={{ display: "none" }}>
            {("0" + parseInt(time / 3600)).slice(-2)}:
            {("0" + parseInt((time / 60) % 60)).slice(-2)}:
            {("0" + parseInt(time % 60)).slice(-2)}
          </h1>
        </div>
        <div>
          {!timerOn && time !== 0 && (
            <button
              id="StartTimer"
              style={{ display: "none" }}
              onClick={() => IsTimerOn(true)}
            >
              Start Timer
            </button>
          )}
          {timerOn && time !== 0 && (
            <button id="PauseTimer" onClick={() => IsTimerOn(false)}>
              Pause
            </button>
          )}
          {!timerOn && time !== originalTime && time > 0 && (
            <button id="ResumeTimer" onClick={() => IsTimerOn(true)}>
              Resume
            </button>
          )}
          {timerOn && (
            <button
              id="RestartTimer"
              onClick={() => window.location.reload(false)}
            >
              Reset
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Timer;
