// Burger menu toggle
document.getElementById('burger').addEventListener('click', function() {
    document.getElementById('nav-menu').classList.toggle('active');
});

// Close menu when clicking outside or on a link
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const burger = document.getElementById('burger');
    if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('nav-menu').classList.remove('active');
    });
});

// Music Player
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const stopBtn = document.getElementById('stop');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitleEl = document.querySelector('.song-title');
const artistEl = document.querySelector('.artist');

let isPlaying = false;

// Load metadata from MP3
function loadMetadata() {
    const audioSrc = audioPlayer.querySelector('source').src;
    jsmediatags.read(audioSrc, {
        onSuccess: function(tag) {
            const title = tag.tags.title || 'Unknown Title';
            const artist = tag.tags.artist || 'Unknown Artist';
            songTitleEl.textContent = title;
            artistEl.textContent = `By: ${artist}`;
        },
        onError: function(error) {
            console.log('Error reading metadata:', error);
            // Fallback to filename if metadata fails
            const filename = audioSrc.split('/').pop().split('.')[0];
            songTitleEl.textContent = filename;
            artistEl.textContent = 'By: Unknown Artist';
        }
    });
}

// Auto-play when page loads
window.addEventListener('load', () => {
    loadMetadata();
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Stop
stopBtn.addEventListener('click', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
});

// Update progress bar and time
audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
});

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const revealColumn = document.getElementById('reveal-column');

revealColumn.addEventListener('click', () => {
    revealColumn.classList.add('revealed');
});

const photoReveal = document.getElementById('photo-reveal');

photoReveal.addEventListener('click', () => {
    photoReveal.classList.add('revealed');
});

