//Initialize variables

let songIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let previousPlay = document.getElementById('masterBackPlay');
let nextPlay = document.getElementById('masterForwardPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songContainer = document.querySelector('.songItemContainer');
const playTypeSelect = document.getElementById('playType');

let songs = [
    {
    songName: "Song 1",
        coverPath: "covers/1.jpg",
            filePath: "music/1.mp3"
},
{
    songName: "Song 2",
        coverPath: "covers/2.jpg",
            filePath: "music/2.mpeg"
},
{
    songName: "Song 3",
        coverPath: "covers/3.jpg",
            filePath: "music/3.mpeg"
},
{
    songName: "Song 4",
        coverPath: "covers/4.jpg",
            filePath: "music/4.mpeg"
},
{
    songName: "Song 5",
        coverPath: "covers/5.jpg",
            filePath: "music/5.mpeg"
},
{
    songName: "Song 6",
        coverPath: "covers/6.jpg",
            filePath: "music/6.mpeg"
},
{
    songName: "Song 7",
        coverPath: "covers/7.jpg",
            filePath: "music/7.mpeg"
},
{
    songName: "Song 8",
        coverPath: "covers/8.jpg",
            filePath: "music/8.mpeg"
},
{   songName: "Song 9",
    coverPath: "covers/9.jpg",
    filePath: "music/9.mpeg"
},
{   songName: "Song 10",
    coverPath: "covers/10.jpg",
    filePath: "music/10.mpeg"
}
];



let html = '';

const loadSongs = async () => {
    for (let song of songs){
        let audio = new Audio(song.filePath);

        await new Promise((resolve) => {
            audio.addEventListener('loadedmetadata',()=>{
                let d = audio.duration;
                resolve(d);
            });
            audio.load();
        }).then((d) => {
            let minutes = Math.floor(d/60);
            let seconds = Math.floor(d%60).toString().padStart(2,'0');
            let formattedDuration = `${minutes}:${seconds}`;

            html += `
            <div class="songItem">
                <img src="${song.coverPath}" alt="1">
                <span class="songName">${song.songName}</span>
                <div class="songListPlay"><span class="timestamp">${formattedDuration} <i class="songItemPlay fa-regular fa-circle-play"></i></span></div>
            </div>
            `;
        });
    }
    songContainer.innerHTML = html;

    Array.from(document.querySelectorAll('.songItemPlay')).forEach((element, index) => {
        element.addEventListener('click', (e) => {
            songIndex = index;
            let currentSrc = audioElement.src.replace(window.location.origin + "/", "");
            if (currentSrc !== songs[index].filePath) {
                audioElement.src = songs[index].filePath;
                audioElement.play();
                resetPlayIcons();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        });
    });
};

loadSongs();


const resetPlayIcons = () => {
    Array.from(document.querySelectorAll('.songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        changeName();
    });
};


const changeName = () => {
    document.querySelector('.songBelowName').innerHTML = `${songs[songIndex].songName}`;
}

const changeIndexByClick  = () => {
    audioElement.pause();
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();

    resetPlayIcons();
    document.querySelectorAll('.songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.querySelectorAll('.songItemPlay')[songIndex].classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    changeName();
}

const typeOfPlay = () => {
    const playType = playTypeSelect.value;
    if(playType === 'normal'){
        if(songIndex === songs.length - 1){
            songIndex = 0;
        } else{
            songIndex++;
        }
    }
    else if(playType === 'repeat'){
        // nothing updated
    }
    else{
        console.log('normal3');
        const max = 9;
        const randomInt = Math.floor(Math.random()*songs.length);
        songIndex = randomInt;
        changeIndexByClick();
    }
    changeIndexByClick();
};

//audioElement.play();

//Handle play, Pause, Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        const currentSongElement = document.querySelectorAll('.songItemPlay')[songIndex];
        currentSongElement.classList.remove('fa-circle-play');
        currentSongElement.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        changeName();
    }
    else{
        audioElement.pause();
        resetPlayIcons();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        changeName();
    }
});



//listen to events

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    if(progress >= 99){
        typeOfPlay();
    }
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) /100;
});


previousPlay.addEventListener('click' , () => {
    if(songIndex <= 0){
        songIndex = songs.length - 1;
    } else{
        songIndex--;
    }
    changeIndexByClick();
});


nextPlay.addEventListener('click' , () => {
    if(songIndex === songs.length - 1){
        songIndex = 0;
    } else{
        songIndex++;
    }
    changeIndexByClick();
});






