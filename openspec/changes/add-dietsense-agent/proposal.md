## Why

飲食自我記錄是行為減重最有效的工具之一，但使用者很快就放棄：熱量 App 的記錄頻率在第 4 到第 12 週之間，從每週約 5.4 天降到 1.4 天（JMIR mHealth uHealth, 2026, scoping review）。放棄的原因是記錄太費力：要搜尋品項、估計份量、手動拆解複合料理，而且資料庫幾乎沒有台灣小吃。另一方面，直接問 LLM 也不可靠：GPT-4o 從照片估熱量的 MAPE 約 36%（Fridolfsson et al., 2025），而且數字無法追溯來源。DietSense 要在「好用」與「有依據」之間取得平衡。

## What Changes

- 新增一個對話式 Domain AI Agent，讓使用者用一句中文描述飲食（例如「一碗加蛋的台式牛肉麵，湯喝一半」），就能完成記錄。
- 新增多來源營養資料錨定流程：台灣食品成分資料庫優先，其次是 USDA FoodData Central 和自建台式料理向量庫。每個數值都要附上來源。
- 新增信心門檻與澄清迴圈：信心不足時最多追問一次，不足的部分改用區間呈現，而不是一直追問。
- 新增熱量區間（low / point / high）、巨量營養素比例與 Mifflin-St Jeor TDEE 分析。
- 新增飲食安全守門：攝取過低、暴食-節食模式時給予提示與轉介，並拒絕產生更嚴格的限制建議。
- 新增評估框架：500 筆台式料理標註集、基準方法比較，以及 20 人 7 天使用者研究。

## Capabilities

### New Capabilities

- `conversational-food-logging`：從自然語言飲食描述抽取食物、份量、餐別，並在資訊不足時追問澄清。
- `nutrient-retrieval`：從多個營養資料庫錨定食物品項，回傳附來源的營養數值；遇到未知食物時改用相近品項估算。
- `energy-analytics`：計算熱量區間、巨量營養素比例、個人 TDEE 與每日缺口。
- `dietary-safety-guard`：偵測不安全的飲食模式與請求，輸出安全提示並限制建議內容。
- `agent-evaluation`：用標註資料集與基準方法量測準確度、記錄時間、可用性與安全攔截率。

### Modified Capabilities

（無，這是專案的第一個變更。）

## Impact

- 新增 Python 後端服務（FastAPI）與 Agent 編排層，使用 LLM function calling。
- 外部相依：USDA FoodData Central API（需要 API key）、食藥署食品營養成分資料庫（離線匯入）、LLM API、向量資料庫。
- 個人資料：身高、體重、年齡、性別與飲食日誌只存在本機 SQLite，不上傳給 LLM 供應商以外的第三方。
- 文件：`DESIGN.md` 會從本變更的 `design.md` 同步產生，並持續維護到期末 Final Handover。
