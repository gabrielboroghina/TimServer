const speedSlider = document.getElementById("spdRange");
const dirSlider = document.getElementById("dirRange");
const speedText = document.getElementById("speedVal");
const dirText = document.getElementById("dirVal");

speedText.innerHTML = speedSlider.value;
dirText.innerHTML = dirSlider.value;


speedSlider.oninput = function () {
    speedText.innerHTML = this.value;
    updateServerData();
};

dirSlider.oninput = function () {
    dirText.innerText = this.value;
    updateServerData();
};

function updateServerData() {
    // send new values for speed and direction to server
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",
        "/upd?spd=" + speedSlider.value + "&trj=" + dirSlider.value,
        true);
    xhttp.send();
}

function stop() {
    speedText.innerHTML = '0';
    speedSlider.value = 0;
    updateServerData();
}

function resetDir() {
    dirText.innerText = '0';
    dirSlider.value = 0;
    updateServerData();
}

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("ch").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", "/upd?val=5", true);
    xhttp.send();
}