document.addEventListener("DOMContentLoaded", () => {
    const countInput = document.getElementById("count");
    const autoReloadInput = document.getElementById("autoReload");
    const priceOrderInput = document.getElementById("priceOrder");
    const consecutiveInput = document.getElementById("consecutive");

    // 載入設定
    chrome.storage.local.get("kktix_settings", (data) => {
        const settings = data.kktix_settings;

        if (settings) {
            countInput.value = settings.count || 1;
            autoReloadInput.checked = settings.autoReload || false;
            priceOrderInput.value = settings.priceOrder || "top-down";
            consecutiveInput.checked = settings.consecutive || false;
        }
    });

    // Toggle bot
    const toggleBtn = document.getElementById("toggle");

    chrome.storage.local.get("botEnabled", (data) => {
        const enabled = data.botEnabled || false;
        toggleBtn.textContent = enabled ? "Bot: ON" : "Bot: OFF";
        toggleBtn.style.backgroundColor = enabled ? "#5cb85c" : "#d9534f";
    });

    toggleBtn.addEventListener("click", () => {
        chrome.storage.local.get("botEnabled", (data) => {
            const newStatus = !data.botEnabled;
            chrome.storage.local.set({ botEnabled: newStatus });

            toggleBtn.textContent = newStatus ? "Bot: ON" : "Bot: OFF";
            toggleBtn.style.backgroundColor = newStatus ? "#5cb85c" : "#d9534f";

            chrome.action.setBadgeText({ text: newStatus ? "ON" : "OFF" });
            chrome.action.setBadgeBackgroundColor({
                color: newStatus ? "#5cb85c" : "#d9534f"
            });

            if (newStatus) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs.length > 0) {
                        chrome.tabs.reload(tabs[0].id);
                    }
                });
            }
        });
    });

    // 儲存設定
    document.getElementById("save").addEventListener("click", () => {
        const countRaw = parseInt(countInput.value);
        const autoReload = autoReloadInput.checked;
        const priceOrder = priceOrderInput.value;
        const consecutive = consecutiveInput.checked;

        const count = parseInt(countRaw, 10);
        if (isNaN(count) || count <= 0) {
            alert("請輸入正確的張數（大於 0）");
            return;
        }

        chrome.storage.local.set({
            kktix_settings: { date: "", price: "", count, name: "", autoReload, dateOrder: "top-down", priceOrder, session: "", consecutive }
        }, () => {
            alert("設定已儲存！");
        });
    });
});
