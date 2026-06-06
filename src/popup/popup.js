document.addEventListener("DOMContentLoaded", () => {
    const loginStatus = document.getElementById("login-status");
    const twitchStatus = document.getElementById("twitch-status");
    const yearContainer = document.getElementById("current-year");

    if (yearContainer) {
        yearContainer.textContent = new Date().getFullYear();
    }

    browser.storage.local.get(["twitchLoggedIn", "twitchChannelPage"]).then((data) => {

        if (data.twitchLoggedIn) {
            loginStatus.textContent = "Logged";
            loginStatus.style.color = "green";
        } else {
            loginStatus.textContent = "Not logged";
            loginStatus.style.color = "red";
        }

        if (data.twitchChannelPage) {
            twitchStatus.textContent = "True";
            twitchStatus.style.color = "green";
        } else {
            twitchStatus.textContent = "False";
            twitchStatus.style.color = "red";
        }
    });
});