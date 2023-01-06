const audioPlayer = document.querySelector("#audioPlayer"),
    audioTime = document.querySelector("#audioTime"),
    audio_progress = document.querySelector("#audio_progress"),
    audioTimeline = document.querySelector(".audio_timeline"),
    playerDescription = audioPlayer.querySelector("#playerDescription"),
    titleContainer = audioPlayer.querySelector("#titleContainer"),
    playPauseBtn = audioPlayer.querySelector("#play_btn"),
    playPauseBtnIcon = playPauseBtn.querySelector("i"),
    volumeBtn = audioPlayer.querySelector("#volume_btn"),
    volumeBtnIcon = volumeBtn.querySelector("i"),
    downloadBtn = audioPlayer.querySelector("#download_btn"),
    forwardBtn = audioPlayer.querySelector("#forward_btn");

let musicIndex = 0,
    audioCurrentTime = 0,
    isPlaying = false,
    isMouseDown = false;

const audio = new Audio(audioList[musicIndex].src);

function initAudioDetails() {
    var currentMusic = audioList[musicIndex];
    playerDescription.innerHTML = currentMusic.description;
    titleContainer.innerHTML = `${musicIndex + 1} ${currentMusic.artist} - ${
        currentMusic.name
    }`;
}
initAudioDetails();

audio.onpause = function onAudioPause() {
    isPlaying = false;
    playPauseBtnIcon.className = "fas fa-play";
};
audio.onplay = function onAudioPlay() {
    isPlaying = true;
    playPauseBtnIcon.className = "fas fa-pause";
};

playPauseBtn.addEventListener("click", function () {
    console.log(audio.paused);
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});
forwardBtn.addEventListener("click", function () {
    if (musicIndex + 1 < audioList.length) {
        musicIndex++;
    } else {
        musicIndex = 0;
    }
    audio.src = audioList[musicIndex].src;
    audio.play();
    initAudioDetails();
});

audioTimeline.addEventListener("mousedown", mouseDown);
audioTimeline.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", (e) => mouseUp(e, true));
audioTimeline.addEventListener("mouseleave", mouseUp);

// audioTimeline.addEventListener("touchstart", mouseDown);
// audioTimeline.addEventListener("touchmove", mouseMove);
// audioTimeline.addEventListener("touchend", mouseUp);

function mouseDown(e) {
    isMouseDown = true;
    setProgressBar(e);
}
function mouseMove(e) {
    if (isMouseDown) {
        console.log(e.offsetX);
        setProgressBar(e);
    }
}
function mouseUp(e, isDocMouseUp = false) {
    if (isMouseDown && !isDocMouseUp) {
        audio.currentTime =
            (e.offsetX / audioTimeline.offsetWidth) * audio.duration;
    } else if (isMouseDown && isDocMouseUp) {
        audio.currentTime =
            (parseFloat(audio_progress.style.width) / 100) * audio.duration;
    }
    isMouseDown = false;
}

function setProgressBar(e) {
    audio_progress.style.width =
        (e.offsetX / audioTimeline.offsetWidth) * 100 + "%";
}

audio.addEventListener("timeupdate", function () {
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = pad(Math.floor(audio.currentTime % 60));

    audioTime.innerHTML = `${minutes}:${seconds}`;

    if (!isMouseDown) {
        audio_progress.style.width =
            (audio.currentTime / audio.duration) * 100 + "%";
    }
});

audio.addEventListener("ended", function () {
    if (!isMouseDown) {
        forwardBtn.click();
    }
});

volumeBtn.addEventListener("click", function () {
    switch (audio.volume) {
        case 1:
            audio.volume = 0.5;
            volumeBtnIcon.className = "fas fa-volume";
            break;
        case 0.5:
            audio.volume = 0;
            volumeBtnIcon.className = "fas fa-volume-mute";
            break;
        default:
            audio.volume = 1;
            volumeBtnIcon.className = "fas fa-volume-up";
            break;
    }
});

function pad(value) {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}

document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 32:
            playPauseBtn.click();
            break;
        default:
            break;
    }
});
downloadBtn.addEventListener("click", () =>
    downloadFromUrl(audioList[musicIndex].src)
);

function downloadFromUrl(url) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
