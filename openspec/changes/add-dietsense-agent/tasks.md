## 1. W1 專案骨架與資料取得

- [ ] 1.1 建立 GitHub Repository、README.md、DESIGN.md（由 design.md 同步）
- [ ] 1.2 建立 Python 專案（FastAPI、pytest、ruff）與 `.env.example`（LLM、USDA API key）
- [ ] 1.3 下載食藥署「台灣地區食品營養成分資料庫」，轉成 SQLite 並記錄版本
- [ ] 1.4 串接 USDA FoodData Central 搜尋 API，加上快取

## 2. W2 Domain Knowledge 規則與資料

- [ ] 2.1 建立份量對照表（碗、份、個、杯、片 → 克數，依食物類別區分）
- [ ] 2.2 建立 AMDR / DRI / 每日飲食指南規則表
- [ ] 2.3 建立台式料理庫初版（≥ 150 道），依食材拆解計算營養並標示來源
- [ ] 2.4 建立台式料理向量索引（名稱、別名、食材）

## 3. W3 輸入處理與 Planner（①②③）

- [ ] 3.1 實作輸入正規化（繁簡、全半形、數字與單位）
- [ ] 3.2 以 function calling 實作意圖分類與食物實體抽取（輸出 JSON schema）
- [ ] 3.3 實作 Planner 的工具呼叫流程與對話狀態（每項食物的 `asked` 旗標）
- [ ] 3.4 實作單次澄清追問與「略過」路徑

## 4. W4 檢索與分析（④⑤）

- [ ] 4.1 實作多來源檢索與排序（台灣優先、信心分數）
- [ ] 4.2 實作未知食物降級：近似品項或食材拆解，並加上「近似估算」標記
- [ ] 4.3 實作 kcal 區間計算（w0、α、β 可設定）與來源追溯
- [ ] 4.4 實作 `compute_daily_state`：總量區間、巨量營養素比例、Mifflin-St Jeor TDEE
- [ ] 4.5 為 BMR、區間、份量換算撰寫單元測試

## 5. W5 決策、安全守門與輸出（⑥⑦⑧）

- [ ] 5.1 實作安全檢查：完整日與 7 日平均下限、暴食-節食模式、拒絕極低熱量請求
- [ ] 5.2 實作缺口分析與替換建議
- [ ] 5.3 實作 Markdown 回應、區間條圖、巨量營養素圓餅圖、來源展開
- [ ] 5.4 實作簡易 Web Chat 介面與非醫療聲明

## 6. W6 評估資料與離線實驗

- [ ] 6.1 擴充標註評估集至 500 筆（含類別分布與參考來源；珍奶、湯麵、燴飯、油炸物各 ≥ 30 筆）
- [ ] 6.2 建立 30 筆以上的安全測試案例
- [ ] 6.3 執行基準比較：純 LLM、手動資料庫查詢、DietSense（MAE、MAPE、±10%、±20%）
- [ ] 6.4 回報區間 coverage 與平均寬度，校準 α、β 與門檻 τ

## 7. W7 使用者研究

- [ ] 7.1 撰寫研究流程與知情同意書（20 人 × 7 天，DietSense 與傳統 App 交叉使用）
- [ ] 7.2 收集每餐記錄時間、追問率、持續記錄天數、SUS 問卷
- [ ] 7.3 分析結果並與 Expected Outcomes 比較（如實回報未達標項目）

## 8. W8 Final Handover

- [ ] 8.1 更新 DESIGN.md：Implementation Mapping、Results、Limitations
- [ ] 8.2 完成 README 的 Installation、How to Run、Demo
- [ ] 8.3 完成 Final PPT（> 20 頁）與 Demo 影片（> 10 分鐘）

## Workflow follow-up

- 每完成一組任務，執行 `openspec validate add-dietsense-agent --strict`
- 全部完成後執行 `/opsx:archive add-dietsense-agent`，把 delta specs 合併到 `openspec/specs/`
