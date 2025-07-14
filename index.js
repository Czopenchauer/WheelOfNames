
let ListOfNames = []
let youtubeVideo = '';
let time = 0;
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

function spin() {
    if(time !== undefined){
        player.loadVideoById({'videoId': youtubeVideo,
            'startSeconds': time});
    }
    player.loadVideoById({'videoId': youtubeVideo});
    const randomDegree = Math.floor(Math.random() * 10000);
    document.getElementById("wheel-pudelko").animate(
        [
            { transform: 'rotate(' + randomDegree + 'deg)' }
        ], {
            fill: 'forwards',
            duration: 3000,
            iterations: 1
        }
    )
}

function addNieszczesliwca() {
    const input = document.getElementById("nieszczesliwcy");
    ListOfNames = input.value
        .split("\n")
        .map(x => x.trim())
        .filter(x => x !== "");

    const wheel = document.getElementById("wheel-pudelko");
    const wheelImage = document.getElementById("wheel");

    const numberOfNames = ListOfNames.length;
    for(let i = wheel.childElementCount - 1; i >= 1; i--) {
        wheel.removeChild(wheel.children[i]);
    }
    ListOfNames.forEach((name, idx) => {
        const nameLabel = document.createElement("label");
        const angle = (360 / numberOfNames) * idx;
        const radius = wheelImage.width / 2;
        nameLabel.style.transform = "rotate(" + angle + "deg) translateY(" + radius / 5 + "px) translateX(" + radius + "px)";
        nameLabel.style.position = "absolute";
        nameLabel.style.fontSize = "30px";
        nameLabel.style.color = "red";
        nameLabel.style.top = "50%";
        nameLabel.style.right = "45%";
        nameLabel.style.fontWeight = "bold";
        nameLabel.style.textAlign = "center";
        nameLabel.textContent = name;
        wheel.appendChild(nameLabel);
    });

    const line = document.getElementById('wheel-canvas');
    const ctx = line.getContext('2d');
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
}

function setVideo(){
    const ytRegex = /\/([^\/?]+)\?/;
    const timeRegex = /\?t=(\d+)/;
    const videoId = ytRegex.exec(document.getElementById("youtube-url").value);
    const timeMatch = timeRegex.exec(document.getElementById("youtube-url").value);

    console.log(videoId);
    youtubeVideo = videoId[1] ?? videoId[0];
    time = timeMatch[1] !== undefined ? parseInt(timeMatch[1]) : 0;
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '200',
        width: '200',
        events: {
            // 'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        setTimeout(stopVideo, 6000);
    }
}
function stopVideo() {
    player.stopVideo();
}