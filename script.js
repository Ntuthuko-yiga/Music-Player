const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//  Songs
const songs = [
    {
        name: 'ntuthuko-1',
        displayName: 'Mina Nawe',
        artist: 'Sao matrix ft Mashudu',
    },
    {
        name: 'jacinto-1',
        displayName: 'True Love Reggae Mix',
        artist: 'Ntuthuko ft Gugulethu',
    },
    {
        name: 'jacinto-2',
        displayName: 'Electric Chill Machine',
        artist: 'Ntuthuko ft Gugulethu',
    },
    {
        name: 'jacinto-3',
        displayName: 'Rare Genetics (Original Mix)',
        artist: 'Ntuthuko ft Gugulethu',
    },
    {
        name: 'metric-1',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Ntuthuko ft Gugulethu',
    },
    {
        name: 'bentley',
        displayName: 'Bentley',
        artist: 'Madumane ft Cassper & Howard',
    },
    {
        name: 'stay-1',
        displayName: 'Stay With Me',
        artist: 'Mick Man ft Kelvin Momo & ',
    },  {
        name: 'izono-1',
        displayName: 'Izono',
        artist: 'Kelvin Momo ft Mahoo, Babalwa & Chley',
    },  {
        name: 'sukakude-1',
        displayName: 'Sukakude',
        artist: 'Kelvin Momo & Babalwa ft Sfarzo Rtee',
    },{
        name: 'messages-1',
        displayName: 'Messages From Her',
        artist: 'Sabrina Claudio',
    }
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM 
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

// Cureent Song
let songIndex = 0;

// Previous song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select fisrst song
loadSong(songs[songIndex]);

// Pudate Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
       
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    const {duration} = music;
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);