# KKTIX 自動搶票 Chrome 擴充功能

自動化搶票工具，支援票價優先順序、自動選票、電腦選號連號、自動重新整理，幫助你更快搶到票。

---

## 功能

- 票價搜尋順序（由上至下 / 由下至上 / 從中間開始）
- 自動選擇指定張數
- 自動勾選同意服務條款
- 自動點選「下一步」
- 電腦選號 + 連號自動選擇
- 票券售完或搶票失敗時自動重新整理
- 過濾輪椅席、身心障礙等特殊票種
- Popup 內 Bot ON/OFF 開關

---

## 安裝（開發模式）

1. Clone 此專案
2. 打開 Chrome，輸入 `chrome://extensions`
3. 開啟右上角「開發人員模式」
4. 點選「載入未封裝項目」，選擇此資料夾

---

## 使用說明

1. 點擊 Chrome 右上角擴充功能圖示，進入設定頁面
2. 設定：
   - **票價搜尋順序**：由上至下（最高價優先）
   - **張數**：要搶的票數
   - **自動重新整理**：找不到票時自動刷新
   - **電腦選號連號**：自動選擇電腦配位 + 連號
3. 儲存設定
4. 開啟 KKTIX 搶票頁面（直接開 registration URL 最快）
5. 點擊 Popup 的 **Bot: ON** 按鈕啟動
6. Bot 自動執行：選票 → 勾同意 → 下一步 → 電腦選號連號

---

## 注意事項

- 支援網域：`https://*.kktix.cc/events/*` 及 `https://kktix.com/events/*/registrations/*`
- 需保持分頁開啟
- Alert 彈窗（票已售完等）會自動攔截並重新整理
- 已售完或輪椅/身障票種會自動跳過
- 如果下一步因網路卡頓沒有執行，請手動點擊

---

## 專案結構

```
kktix_bot/
├── manifest.json       # Chrome 擴充功能設定
├── background.js       # Bot 開關、Badge 狀態
├── content.js          # 活動頁導向搶票頁
├── detail_script.js    # 搶票主邏輯 + 電腦選號
├── inject.js           # Alert 攔截 + 自動重整
├── options.html        # 設定頁面 UI
├── options.js          # 設定儲存與載入 + Bot 開關
├── kktix.png           # 擴充功能圖示
└── README.md
```

---

## 授權

MIT License
