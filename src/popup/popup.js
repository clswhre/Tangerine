// Універсальна підтримка Firefox та Brave/Chrome
const browser = window.browser || chrome;

// Функція для оновлення статусу
function updateStatus() {
    const loginStatus = document.getElementById("login-status");
    const twitchStatus = document.getElementById("twitch-status");

    if (!loginStatus || !twitchStatus) return;

    console.log('📋 Оновлюємо статус...');

    // Запитуємо активну вкладку
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0]) {
            console.error('❌ Немає активної вкладки');
            return;
        }

        const currentTab = tabs[0];
        const url = currentTab.url;
        
        console.log('📍 Поточна URL:', url);

        // Перевіряємо чи це Twitch
        if (!url.includes('twitch.tv')) {
            console.log('❌ Не на Twitch');
            loginStatus.textContent = "Not on Twitch";
            loginStatus.style.color = "orange";
            twitchStatus.textContent = "—";
            twitchStatus.style.color = "gray";
            return;
        }

        // Якщо це Twitch, запитуємо статус у content.js
        browser.tabs.sendMessage(currentTab.id, { action: "getStatus" }, (response) => {
            if (browser.runtime.lastError) {
                console.error('❌ Помилка контакту з content.js:', browser.runtime.lastError);
                console.log('📋 Content ID:', currentTab.id);
                console.log('📋 Вкладка URL:', currentTab.url);
                loginStatus.textContent = "Error: " + (browser.runtime.lastError.message || 'Unknown');
                loginStatus.style.color = "red";
                twitchStatus.textContent = "—";
                twitchStatus.style.color = "red";
                return;
            }

            console.log('📥 Отримано:', response);
            
            const isLogged = response.twitchLoggedIn === true;
            const isChannel = response.twitchChannelPage === true;
            
            loginStatus.textContent = isLogged ? "Logged" : "Not logged";
            loginStatus.style.color = isLogged ? "green" : "red";
            
            twitchStatus.textContent = isChannel ? "True" : "False";
            twitchStatus.style.color = isChannel ? "green" : "red";
        });
    });
}

// Запускаємо при завантаженні popup
document.addEventListener("DOMContentLoaded", () => {
    const yearContainer = document.getElementById("current-year");
    if (yearContainer) {
        yearContainer.textContent = new Date().getFullYear();
    }

    updateStatus();
});

// Слухаємо зміни активної вкладки в браузері
browser.tabs.onActivated.addListener(() => {
    console.log('🔄 Вкладка змінилась, оновлюємо...');
    updateStatus();
});