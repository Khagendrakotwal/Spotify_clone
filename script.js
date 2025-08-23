let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let MyProgressBar = document.getElementById('MyProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let SongItem = Array.from(document.getElementsByClassName('SongItem'));

let songs = [
    { Songname: "MC STAN - Basti Ka Hasti", filepath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { Songname: "Broken But Beautiful Mashup", filepath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { Songname: "Chitta", filepath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { Songname: "Diljit Dosanjh - Lemonade", filepath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { Songname: "HEER RANJHA - Rito Riba", filepath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { Songname: "R.C.R.", filepath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { Songname: "Kesariya", filepath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { Songname: "Navrai", filepath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { Songname: "Sooraj Dooba Hain", filepath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { Songname: "Das Das ki Note", filepath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Load covers and names
SongItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("Songname")[0].innerText = songs[i].Songname;
});

// Master Play/Pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    MyProgressBar.value = progress;
});

// Seek
MyProgressBar.addEventListener('change', () => {
    audioElement.currentTime = MyProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons
const makeallplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Individual song play
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeallplays();
        songIndex = parseInt(e.target.id) - 1; // ✅ fixed index
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filepath;
        mastersongname.innerText = songs[songIndex].Songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filepath;
    mastersongname.innerText = songs[songIndex].Songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.add('fa-circle-pause');
    masterplay.classList.remove('fa-circle-play');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? 0 : songIndex - 1;
    audioElement.src = songs[songIndex].filepath;
    mastersongname.innerText = songs[songIndex].Songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.add('fa-circle-pause');
    masterplay.classList.remove('fa-circle-play');
});
