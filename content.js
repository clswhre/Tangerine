// Універсальна підтримка Firefox та Brave/Chrome
const browser = window.browser || chrome;

console.log('🔍 Content.js ЗАПУЩЕНИЙ на:', window.location.href);
console.log('🔍 Browser глобальний об\'єкт:', typeof window.browser !== 'undefined' ? 'Firefox' : 'Chrome/Brave');

function isLoggedIn() {
    return document.querySelector('button[data-a-target="login-button"]') === null;
}

function isChannelPage() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    return pathSegments.length === 1 && !pathSegments[0].startsWith('directory') && !pathSegments[0].startsWith('videos');
}

// Слухаємо запити від popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('📨 Отримано повідомлення від popup:', message);
    
    if (message.action === "getStatus") {
        const status = {
            twitchLoggedIn: isLoggedIn(),
            twitchChannelPage: isChannelPage()
        };
        console.log('📤 Відправляємо статус:', status);
        sendResponse(status);
        return true;
    }
});

console.log('✅ Content.jsListener зареєстрований!');