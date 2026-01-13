const vinyl = document.getElementById('vinyl');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const playIcon = document.getElementById('playIcon');
const progressBar = document.getElementById('progressBar');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songListContainer = document.querySelector('.song-list ul');
const volumeUp = document.getElementById('volumeUp');
const volumeDown = document.getElementById('volumeDown');
const volumeMute = document.getElementById('volumeMute');

let isPlaying = false;
let currentSongIndex = { cat: 0, song: 0 };

const songCategories = [
  {
    name: "Kanye West",
    songs: [
      { src: "Stronger.mp3", title: "Stronger", artist: "Kanye West" },
      { src: "Flashing Lights.mp3", title: "Flashing Lights", artist: "Kanye West" },
      { src: "Runaway.mp3", title: "Runaway", artist: "Kanye West" },
      { src: "monster.mp3", title: "Monster", artist: "Kanye West" },
      { src: "All Falls Down.mp3", title: "All Falls Down", artist: "Kanye West" },
      { src: "Through The Wire.mp3", title: "Through The Wire", artist: "Kanye West" },
      { src: "paid.mp3", title: "paid", artist: "Kanye West" },
      { src: "Paperwork.mp3", title: "Paperwork", artist: "Kanye West" },
      { src: "Do it.mp3", title: "Do it", artist: "Kanye West" },
      { src: "Hoodrat.mp3", title: "Hoodrat", artist: "Kanye West" },
      { src: "Back to me.mp3", title: "Back to me", artist: "Kanye West" },
      { src: "Keys to my life.mp3", title: "Keys to my life", artist: "Kanye West" },
      { src: "Carnival.mp3", title: "Carnival", artist: "Kanye West" },
      { src: "Stars.mp3", title: "Stars", artist: "Kanye West" },
      { src: "Good Morning.mp3", title: "Good Morning", artist: "Kanye West" }

    ]
  },
  {
    name: "Tyler The Creator",
    songs: [
        {src: "SWEET I THOUGHT YOU WANTED TO DANCE.mp3",title:"SWEET/I THOUGHT YOU WANTED TO DANCE",artist:"Tyler The Creator"},
        {src: "st.Chroma.mp3",title:"St.Chroma",artist:"Tyler The Creator"},
        {src: "Like Him.mp3",title:"Like Him",artist:"Tyler The Creator"}
      
    ]
  },
  {
    name: "The weeknd",
    songs: [
        {src: "sao Paulo.mp3",title:"Sao Paulo",artist:"The Weeknd "},
        {src: "Wake me up.mp3",title:"Wake me up",artist:"The Weeknd "},
        {src: "Cry for me.mp3",title:"Cry for me",artist:"The Weeknd "},
        {src: "Baptized in fear.mp3",title:"Baptized in fear",artist:"The Weeknd "}
    ]
  },

  {
    name: "Frank Ocean",
    songs: [
        {src: "Pink + White.mp3",title:"Pink + White ",artist:"Frank Ocean"},
      
    ]
  },

];

function generateSongList() {
  songListContainer.innerHTML = ""; 

  songCategories.forEach((category, catIndex) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = "category";

    const header = document.createElement('div');
    header.className = "category-header";
    header.textContent = category.name;
    header.style.cursor = "pointer";

    const list = document.createElement('ul');
    list.className = "category-songs";
    list.style.display = "none";

    category.songs.forEach((song, songIndex) => {
      const li = document.createElement('li');
      li.textContent = `${song.title} - ${song.artist}`;
      li.setAttribute('data-cat-index', catIndex);
      li.setAttribute('data-song-index', songIndex);
      li.style.cursor = "pointer";
      li.addEventListener('click', () => {
        currentSongIndex = { cat: catIndex, song: songIndex };
        changeSong(catIndex, songIndex);
      });
      list.appendChild(li);
    });

    header.addEventListener('click', () => {
      list.style.display = list.style.display === "none" ? "block" : "none";
    });

    categoryDiv.appendChild(header);
    categoryDiv.appendChild(list);
    songListContainer.appendChild(categoryDiv);
  });
}


function changeSong(catIndex, songIndex) {
  const song = songCategories[catIndex].songs[songIndex];
  audio.src = song.src;
  audio.volume = 1.0;
  audio.muted = false;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  progressBar.value = 0;

  audio.play().then(() => {
    vinyl.style.animationPlayState = 'running';
    playIcon.src = 'images/pause.png';
    isPlaying = true;
  }).catch(error => {
    console.error("Erreur lecture audio:", error);
  });
}


volumeUp.addEventListener('click', () => {
  if (audio.volume < 1) {
    audio.volume = Math.min(audio.volume + 0.1, 1);
    console.log("Volume:", audio.volume.toFixed(1));
  }
});

volumeDown.addEventListener('click', () => {
  if (audio.volume > 0) {
    audio.volume = Math.max(audio.volume - 0.1, 0);
    console.log("Volume:", audio.volume.toFixed(1));
  }
});

volumeMute.addEventListener('click', () => {
  audio.muted = !audio.muted;
  console.log("Muted:", audio.muted);
});


function prevSong() {
  if (currentSongIndex.song > 0) {
    currentSongIndex.song--;
  } else {
    
    if (currentSongIndex.cat > 0) {
      currentSongIndex.cat--;
      currentSongIndex.song = songCategories[currentSongIndex.cat].songs.length - 1;
    }
  }
  changeSong(currentSongIndex.cat, currentSongIndex.song);
}

function nextSong() {
  if (currentSongIndex.song < songCategories[currentSongIndex.cat].songs.length - 1) {
    currentSongIndex.song++;
  } else {
   
    if (currentSongIndex.cat < songCategories.length - 1) {
      currentSongIndex.cat++;
      currentSongIndex.song = 0;
    }
  }
  changeSong(currentSongIndex.cat, currentSongIndex.song);
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    vinyl.style.animationPlayState = 'paused';
    playIcon.src = 'images/play.png';
  } else {
    audio.play().catch(error => {
      console.error("Erreur lecture audio:", error);
    });
    vinyl.style.animationPlayState = 'running';
    playIcon.src = 'images/pause.png';
  }
  isPlaying = !isPlaying;
});

document.getElementById('prev').addEventListener('click', prevSong);
document.getElementById('next').addEventListener('click', nextSong);


audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
});


generateSongList();

  
  
