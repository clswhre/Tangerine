document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("login-status");

    browser.storage.local.get("twitchLoggedIn").then((data) => {
        if (data.twitchLoggedIn === true) {
            statusElement.textContent = "User is logged in";
            statusElement.style.color = "green";
        } else {
            statusElement.textContent = "User is not logged in !!";
            statusElement.style.color = "red";
        }
    });
});