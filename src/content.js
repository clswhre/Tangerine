const browser = window.browser || chrome;

function isLoggedIn() {
    return document.querySelector('button[data-a-target="login-button"]') === null;
}

function isChannelPage() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    return pathSegments.length === 1 && !pathSegments[0].startsWith('directory') && !pathSegments[0].startsWith('videos');
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getStatus") {
        sendResponse({
            twitchLoggedIn: isLoggedIn(),
            twitchChannelPage: isChannelPage()
        });
    }
});