document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio");
  const playPauseButton = document.getElementById("play-pause");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const volumeControl = document.getElementById("volume");
  const trackSlider = document.getElementById("track-slider");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalDurationDisplay = document.getElementById("total-duration");
  const ribbon = document.getElementById("ribbon");
  const trackNameDisplay = document.getElementById("track-name");
  const albumPhoto = document.getElementById("album-photo");

  let isPlaying = false;
  let currentTrack = 0;
  let audioPosition = 0;

  const trackList = [
    "Flying - Track Tribe.mp3",
    "Girl On Top.mp3",
    "Guess I'll Never Know.mp3",
    "Ice & Fire - King Canyon.mp3",
    "Is This Really Happening.mp3",
  ];
  const albumPhotos = [
    "images-2.jpg",
    "images-3.jpg",
    "images-4.jpg",
    "images-5.jpg",
    "images-6.jpg",
  ];

  function togglePlayPause() {
    if (!isPlaying) {
      if (audioPosition === 0) {
        audio.src = trackList[currentTrack];
      }
      audio.load();
      audio.currentTime = audioPosition;
      audio
        .play()
        .then(() => {
          playPauseButton.textContent = "❚❚";
          isPlaying = true;
          updateTrackName(currentTrack);
          ribbon.style.display = "block";
          ribbon.classList.add("active");
        })
        .catch((error) => {
          console.error("Audio playback Error:" + error.message);
        });
    } else {
      audioPosition = audio.currentTime;
      audio.pause();
      playPauseButton.textContent = "►";
      ribbon.style.display = "none";
      isPlaying = false;
    }
  }
  playPauseButton.addEventListener("click", togglePlayPause);

  nextButton.addEventListener("click", function () {
    if (currentTrack < trackList.length - 1) {
      currentTrack++;
    } else {
      currentTrack = 0;
    }
    playTrack(currentTrack);
  });

  prevButton.addEventListener("click", function () {
    if (currentTrack > 0) {
      currentTrack--;
    } else {
      currentTrack = trackList.length - 1;
    }
    playTrack(currentTrack);
  });
  function playTrack(trackIndex) {
    audio.src = trackList[trackIndex];
    audio.load();
    audio.play();
    playPauseButton.textContent = "❚❚";
    isPlaying = true;
    updateTrackName(trackIndex);
  }
  function updateTrackName(trackIndex) {
    const trackName = trackList[trackIndex];
    const cleanedTrackName = trackName.replace("audio/", "");
    trackNameDisplay.textContent = cleanedTrackName;
    albumPhoto.src = albumPhotos[trackIndex];
  }
  volumeControl.addEventListener("input", function () {
    audio.volume = volumeControl.value;
  });
  audio.addEventListener("timeupdate", function () {
    const currentTime = formatTime(audio.currentTime);
    const totalDuration = formatTime(audio.duration);
    currentTimeDisplay.textContent = currentTime;
    totalDurationDisplay.textContent = totalDuration;

    const position = (audio.currentTime / audio.duration) * 100;
    trackSlider.value = position;
  });
  trackSlider.addEventListener("input", function () {
    const newPosition = (trackSlider.value / 100) * audio.duration;
    audio.currentTime = newPosition;
  });
  audio.addEventListener("ended", function () {
    if (currentTrack < trackList.length - 1) {
      currentTrack++;
    } else {
      currentTrack = 0;
    }
    playTrack(currentTrack);
  });
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
});
