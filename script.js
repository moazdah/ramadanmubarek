const ramadanStart = new Date("2026-02-18T00:00:00+01:00");
const totalDays = 29;

function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText =
        now.toLocaleString("no-NO", { timeZone: "Europe/Oslo" });
}

function updateProgress() {
    const now = new Date();
    const diffTime = now - ramadanStart;
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays < 0) diffDays = 0;
    if (diffDays > totalDays) diffDays = totalDays;

    const percent = (diffDays / totalDays) * 100;
    const circumference = 628;
    const offset = circumference - (percent / 100) * circumference;

    document.getElementById("progressCircle").style.strokeDashoffset = offset;

    document.getElementById("progressText").innerText =
        diffDays + " / " + totalDays + " dager\n" +
        percent.toFixed(1) + "%";

    document.getElementById("dayCounter").innerText =
        "Fastet: " + diffDays +
        " | Gjenstår: " + (totalDays - diffDays);

    showImportantDays(diffDays);
}

function showImportantDays(day) {
    const section = document.getElementById("importantSection");
    section.innerHTML = "";

    if (day >= 21 && day <= 29) {
        section.innerHTML += `
        <div class="info-box">
        <h3>De siste 10 dagene</h3>
        <p>Disse dagene er ekstra viktige og inneholder Laylat al Qadr.</p>
        </div>`;
    }

    if (day === 27) {
        section.innerHTML += `
        <div class="info-box">
        <h3>Laylat al Qadr</h3>
        <p>Natten som er bedre enn tusen måneder.</p>
        <button onclick="alert('Laylat al Qadr er en av de viktigste nettene i islam. Den er nevnt i Koranen og har enorm belønning.')">
        Se mer
        </button>
        </div>`;
    }
}

function updateSun() {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;

    const sunrise = 7;
    const sunset = 18.5;

    let position;

    if (hour < sunrise) position = 0;
    else if (hour > sunset) position = 100;
    else position = ((hour - sunrise) / (sunset - sunrise)) * 100;

    const topValue = 15 + position * 0.4;
    document.getElementById("sun").style.top = topValue + "%";
}

setInterval(updateClock, 1000);
setInterval(updateProgress, 60000);
setInterval(updateSun, 60000);

updateClock();
updateProgress();
updateSun();
