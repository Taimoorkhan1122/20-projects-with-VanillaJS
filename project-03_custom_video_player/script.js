const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

//Play/Pause video
function toggleVideoStatus() {
  console.log("clicked");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update Play/Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = "<i class='fa fa-play fa-2x'><i/>";
  } else {
    play.innerHTML = "<i class='fa fa-pause fa-2x'><i/>";
  }
}

//Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//Update Progress and Timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //Get Minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //Get Seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

//Set Progress Value
function seteProgressValue() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", seteProgressValue);
