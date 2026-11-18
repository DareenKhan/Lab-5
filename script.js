// Toronto in Sound — CCT360 Lab 5
// The soundtrack has three 25-second scenes.

const audio = document.getElementById('soundscape');
const playButton = document.getElementById('playButton');
const muteButton = document.getElementById('muteButton');
const timeline = document.getElementById('timeline');
const pictures = document.querySelectorAll('.scene-image');
const cards = document.querySelectorAll('.scene-card');

const scenes = [
  ['The city wakes.', 'Birdsong, fresh air, and a slow start to the morning.', 'Morning ambience', 'MORNING · 00:00–00:25'],
  ['The city moves.', 'Traffic, voices, and the everyday rhythm of downtown.', 'Busy city streets', 'AFTERNOON · 00:25–00:50'],
  ['The city slows.', 'Rain falls as the traffic fades into the evening.', 'Evening rain', 'EVENING · 00:50–01:15']
];

// Update the image and text to match the audio's current time.
function updateScene() {
  const seconds = audio.currentTime;
  const scene = seconds < 25 ? 0 : seconds < 50 ? 1 : 2;

  pictures.forEach((picture, i) => {
    picture.classList.toggle('is-active', i === scene);
  });

  cards.forEach((card, i) => {
    card.classList.toggle('active', i === scene);
    card.setAttribute('aria-pressed', i === scene);
  });

  document.getElementById('sceneNumber').textContent = 'SCENE 0' + (scene + 1) + ' / 03';
  document.getElementById('sceneTitle').textContent = scenes[scene][0];
  document.getElementById('sceneDescription').textContent = scenes[scene][1];
  document.getElementById('currentMood').textContent = scenes[scene][2];
  document.getElementById('sceneTime').textContent = scenes[scene][3];

  timeline.value = seconds;
  document.getElementById('currentTime').textContent =
    Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
}

// Play and pause.
playButton.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

// Jump to a scene when its card is clicked.
cards.forEach(card => {
  card.addEventListener('click', () => {
    audio.currentTime = Number(card.dataset.jump);
    updateScene();
    audio.play();
  });
});

// Move through the soundtrack with the slider.
timeline.addEventListener('input', () => {
  audio.currentTime = Number(timeline.value);
  updateScene();
});

// Mute or unmute.
muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? '×' : '♫';
  muteButton.setAttribute('aria-label', audio.muted ? 'Unmute audio' : 'Mute audio');
});

// Keep the play button and simple animation in sync.
function updatePlayButton() {
  const playing = !audio.paused;
  playButton.textContent = playing ? '❚❚' : '▶';
  playButton.setAttribute('aria-label', playing ? 'Pause soundscape' : 'Play soundscape');
  document.getElementById('stage').classList.toggle('playing', playing);
  document.querySelector('.sound-panel').classList.toggle('playing', playing);
}

audio.addEventListener('timeupdate', updateScene);
audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);
audio.addEventListener('ended', updatePlayButton);

updateScene();
