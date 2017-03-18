
//test script

var sessionTime = 25;
var breakTime = 5;

window.onload = function() {

  var smallSession = document.getElementById("smallSession");
  var largeSession = document.getElementById("bigSession");
  var smallBreak = document.getElementById("smallBreak");
  var largeBreak = document.getElementById("bigBreak");

  smallSession.onclick = function() {
    sessionTime -= 1;
    document.getElementById("sessionTime").innerHTML = numSessionTime;
    return false;
  }
  bigSession.onclick = function() {
    sessionTime += 1;
    document.getElementById("sessionTime").innerHTML = numSessionTime;
    return false;
  }
  smallBreak.onclick = function() {
    breakTime -= 1;
    document.getElementById("breakTime").innerHTML = numBreakTime;
    return false;
  }
  bigBreak.onclick = function() {
    breakTime += 1;
    document.getElementById("breakTime").innerHTML = numBreakTime;
    return false;
  }

}
