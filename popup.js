document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("login-status");

    browser.storage.local.get("twitchLoggedIn").then((data) => {
        if (data.twitchLoggedIn === true) {
            statusElement.textContent = "Logged";
            statusElement.style.color = "green";
        } else {
            statusElement.textContent = "Not logged";
            statusElement.style.color = "red";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("twitch-status");

    browser.storage.local.get("isChannelPage").then((data) => {
        if (data.isChannelPage === true) {
            statusElement.textContent = "True";
            statusElement.style.color = "green";
        } else {
            statusElement.textContent = "False";
            statusElement.style.color = "red";
        }
    });
});
