# DESIGN.md — DietSense

> 系統設計的單一入口。詳細內容由 OpenSpec 管理，本文件依規範的順序串起各部分：
> Problem → Requirements → Architecture → Components → Data → AI/Analytics → Domain Knowledge → Algorithm → Implementation → How to Run → Results。
> 狀態：**Proposal 階段**（尚無程式碼、尚無實驗結果）。

| 章節 | 內容 | 來源檔案 |
|------|------|---------|
| Problem | 記錄負擔高導致放棄；LLM 估算無來源；台灣食物資料不足 | [proposal.md](openspec/changes/add-dietsense-agent/proposal.md)、[docs/02-introduction.md](docs/02-introduction.md) |
| Requirements | 5 個 capability、可測試的 Scenario | [specs/](openspec/changes/add-dietsense-agent/specs/) |
| Architecture | ①–⑧ 模組圖與對應表 | [design.md § System Architecture](openspec/changes/add-dietsense-agent/design.md) |
| Components | 每個模組的輸入、輸出與對應 spec | 同上 |
| Data | 食藥署食品營養成分資料庫、自建台式料理庫、USDA FoodData Central、本機 SQLite 日誌 | design.md、[docs/03-related-work.md § D3](docs/03-related-work.md) |
| AI / Analytics | LLM function calling（意圖、NER、規劃）；kcal 區間、巨量營養素、TDEE | design.md § Decisions |
| Domain Knowledge | 份量對照表、AMDR / DRI、每日飲食指南、Mifflin-St Jeor、安全規則 | design.md、[docs/01-abstract-A-F.md](docs/01-abstract-A-F.md) |
| Algorithm | Algorithm 1（18 行虛擬碼）與 Flowchart | design.md § Pseudocode / Flowchart |
| Implementation | W1–W8 任務清單 | [tasks.md](openspec/changes/add-dietsense-agent/tasks.md) |
| How to Run | （W8 補上） | README.md |
| Results / Limitations | （W6–W7 實驗後補上；目前只有 Expected Outcomes） | docs/01 § F |

## 維護規則

1. 行為改變時先改 `specs/`，再改 `design.md`，最後更新本表。
2. 每次修改後執行 `openspec validate add-dietsense-agent --strict`。
3. 實作完成後用 `/opsx:archive` 把 delta specs 合併到 `openspec/specs/`，並把本表的來源連結改指向 `openspec/specs/`。
