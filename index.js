
let ListOfNames = []

function spin() {
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
    for(let i = wheel.childElementCount - 1; i >= 2; i--) {
        wheel.removeChild(wheel.children[i]);
    }
    ListOfNames.forEach((name, idx) => {
        const nameLabel = document.createElement("label");
        const angle = (360 / numberOfNames) * idx;
        const radius = wheelImage.width / 2;
        nameLabel.style.transform = "rotate(" + angle + "deg) translateY(" + radius / 5 + "px) translateX(" + radius + "px)";
        nameLabel.style.position = "absolute";
        nameLabel.style.fontSize = "20px";
        nameLabel.style.top = "50%";
        nameLabel.style.right = "50%";
        nameLabel.style.fontWeight = "bold";
        nameLabel.style.textAlign = "center";
        nameLabel.textContent = name;
        wheel.appendChild(nameLabel);
    })

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