document.addEventListener("DOMContentLoaded", function () {
    const timerDisplay = document.getElementById("timer-display");
    const timerControls = document.getElementById("timer-controls");
    const startButton = document.getElementById("start-timer");
    const resetButton = document.getElementById("reset-timer");
    const durationInput = document.getElementById("timer-duration");

    let countdown;
    let timerDuration = 0;

    function startTimer() {
        clearInterval(countdown);
        const endTime = Date.now() + timerDuration * 1000;
        displayTimeLeft(timerDuration);

        countdown = setInterval(() => {
            const secondsLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
            displayTimeLeft(secondsLeft);

            if (secondsLeft === 0) {
                clearInterval(countdown);
            }
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
        timerDisplay.textContent = display;
        if(seconds === 0){
            window.alert("Time is up!")
        }
    }

    function resetTimer() {
        clearInterval(countdown);
        timerDisplay.textContent = "00:00";
        timerDuration = 0;
        durationInput.value = "";
        timerDisplay.classList.remove("text-danger");
    }

    startButton.addEventListener("click", () => {
        const newDuration = parseInt(durationInput.value, 10);
        if (!isNaN(newDuration) && newDuration > 0) {
            timerDuration = newDuration;
            startTimer();
            timerControls.style.display = "none";
        }
    });
    resetButton.addEventListener("click", resetTimer);
});