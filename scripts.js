var sessionTime = 25; // set default session time
var breakTime = 5; // set default break time
var currentTimer = 'new'; // Let's the button know what to do on the first click
var tomato = ''; // makes sure that undefined doesn't show when a tomato is added
var startTime, xSession, xBreak, currentTime, currentTime, percentComplete, percentRound, widthAttribute, tone; //declaring global variables

window.onload = function() {
  // button control to reduce session length
  var smallSession = document.getElementById("smallSession");

  smallSession.onclick = function() {
    sessionTime -= 1;
    document.getElementById("sessionTime").innerHTML = sessionTime;
    currentTimer !== 'breakPause' ? document.getElementById("countdownCount").innerHTML = sessionTime + ':00' : '';
    return false;
  }

  // button control to increase session length
  var bigSession = document.getElementById("bigSession");

  bigSession.onclick = function() {
    sessionTime += 1;
    document.getElementById("sessionTime").innerHTML = sessionTime;
    currentTimer !== 'breakPause' ? document.getElementById("countdownCount").innerHTML = sessionTime + ':00' : '';
    return false;
  }

  // button control to reduce break length
  var smallBreak = document.getElementById("smallBreak");

  smallBreak.onclick = function() {
    breakTime -= 1;
    document.getElementById("breakTime").innerHTML = breakTime;
    currentTimer === 'breakPause' ? document.getElementById("countdownCount").innerHTML = breakTime + ':00' : '';
    return false;
  }

  // button contorl to increase break length
  var bigBreak = document.getElementById("bigBreak");

  bigBreak.onclick = function() {
    breakTime += 1;
    document.getElementById("breakTime").innerHTML = breakTime;
    currentTimer === 'breakPause' ? document.getElementById("countdownCount").innerHTML = breakTime + ':00' : '';
    return false;
  }

  // load the audio file to use at the end of a session or breakTime
  tone = document.getElementById("myAudio");

  // big round button controls
  var countDownBox = document.getElementById("countDownBox");

  countDownBox.onclick = function() {
    if (currentTimer === 'new') { // first time the session starts
      setSessionTime();
      setScreenSession();
    } else if (currentTimer === 'session') { // pausing a session
      clearInterval(xSession);
      currentTimer = 'sessionPause';
      document.getElementById("sessionName").innerHTML = 'Pause';
      document.getElementById("bar").setAttribute("class", "progress-bar progress-bar-danger");
    } else if (currentTimer === 'break') { // pausing a break
      clearInterval(xBreak);
      currentTimer = 'breakPause';
      document.getElementById("sessionName").innerHTML = 'Pause';
      document.getElementById("bar").setAttribute("class", "progress-bar progress-bar-success");
    } else if (currentTimer === 'sessionPause') { // restarting a sesssion
      if (startTime === sessionTime) { //determine if the time has been adjusted while on break
        setScreenSession();
      } else {
        setSessionTime();
        setScreenSession();
      }
    } else if (currentTimer === 'breakPause') { //restarting a break
      if (startTime === breakTime) { //determine if the time has been adjusted while on break
        setScreenBreak();
      } else {
        setBreakTime();
        setScreenBreak();
      }
    }
  }
}

// starts the session timer and changes elements of the screen to green
function setScreenSession() {
  xSession = setInterval(sessionTimer, 1000);
  document.getElementById("sessionName").innerHTML = 'Session';
  document.getElementById("footer").setAttribute("style", "background-color:#d9534f");
  document.getElementById("header").setAttribute("color", "#d9534f");
  document.getElementById("bar").setAttribute("class", "progress-bar progress-bar-danger progress-bar-striped active");
}

// starts the break timer and changes elements of the screen to greeen
function setScreenBreak() {
  xBreak = setInterval(breakTimer, 1000);
  document.getElementById("sessionName").innerHTML = 'Break';
  document.getElementById("footer").setAttribute("style", "background-color:#5cb85c");
  document.getElementById("header").setAttribute("color", "#5cb85c");
  document.getElementById("bar").setAttribute("class", "progress-bar progress-bar-success progress-bar-striped active");
}

// calculates the progress and updates the time and background of the progress button
function adjustProgressBar() {
  percentComplete = Math.round(((startTime - (currentTime/60000)) / startTime) * 100);
  widthAttribute = "width:" + percentComplete + "%;";
  document.getElementById("bar").setAttribute("aria-valuenow", percentComplete);
  document.getElementById("bar").setAttribute("style", widthAttribute);
  var minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
  document.getElementById("countdownCount").innerHTML = seconds < 10 ? minutes + ':0' + seconds : minutes + ':' + seconds;
}

// plays the audio tone
function playAudio() {
    tone.play();
}

// resets the start and current time for sessions
function setSessionTime() {
  startTime = sessionTime + 0;
  currentTime = sessionTime * 60000;
}

// resets the start and current time for breaks
function setBreakTime() {
  startTime = breakTime + 0;
  currentTime = breakTime * 60000;
}

// run the session timer
function sessionTimer() {
  currentTimer = 'session';
  adjustProgressBar();
  currentTime -=1000;
  if (currentTime === 2000) {
    playAudio();
  }
  if (currentTime < 0) {
    clearInterval(xSession);
    tomato += '<img src="https://s3.amazonaws.com/assetsanewdevio/fccpomodoro/tomato.png" alt="tomato">'; // add a tomato!
    document.getElementById("tomato").innerHTML = tomato;
    setBreakTime();
    setScreenBreak();
  }
}

// run the break timer
function breakTimer() {
  currentTimer = 'break';
  adjustProgressBar();
  currentTime -=1000;
  if (currentTime === 2000) {
    playAudio();
  }
  if (currentTime < 0) {
    clearInterval(xBreak);
    setSessionTime();
    setScreenSession();
  }
}
