# DietSense — DIC3 Project Proposal Refactor using OpenSpec

對話式每日熱量攝取 Domain AI Agent 的提案重構。本資料夾用 OpenSpec（spec-driven development）重新整理期中 Proposal。

## 作業項目對照

| 作業要求 | 完成內容 | 檔案 |
|---------|---------|------|
| 1. install openspec and be familiar with spec-driven development | 已安裝 `@fission-ai/openspec` 1.17.0；`openspec init --tools claude --language zh-TW`；變更 `add-dietsense-agent` 通過 `--strict` 驗證 | [openspec/](openspec/)、[.claude/commands/opsx/](.claude/commands/opsx/) |
| 2. make clear of your project A to F：5 cores、3 trade-offs、10 details | 5 個核心、3 個取捨、10 個細節、A–F 對照表、約 500 字專業摘要 | [docs/01-abstract-A-F.md](docs/01-abstract-A-F.md) |
| 3. convert design.md to workflow in openspec | 期中稿第五節 → `proposal → specs → design → tasks` 四份文件；修正原稿 3 個設計問題；tasks 依 W1–W8 排成可追蹤的 workflow | [openspec/changes/add-dietsense-agent/](openspec/changes/add-dietsense-agent/)、[DESIGN.md](DESIGN.md) |
| 4. Introduction refactor | A–F 重寫，所有數據改用可查證來源，補上 A2Z 的 L | [docs/02-introduction.md](docs/02-introduction.md) |
| 5. related work refactor | 1/2 AI + 1/2 Domain；9 篇文獻的 Article Summary Table；方法比較表；4 個 Research Gap；引用修正表 | [docs/03-related-work.md](docs/03-related-work.md) |
| 第一段 NotebookLM：依 A2Z 與規範解析 | 規範評分項目檢核、A2Z 26 字母對照、Deep Research 爭論證據更新、送出前待辦 | [docs/05-notebooklm-analysis.md](docs/05-notebooklm-analysis.md) |
| 第一段 ChatGPT：A4 橫式高密度編號資訊圖表 | 9 個編號區塊的一頁圖表（HTML、PDF、PNG） | [docs/infographic/](docs/infographic/) |
| 第二段 Perplexity：最新研究、數據與案例 | Interesting／Innovation／Important 證據、預期貢獻與學術價值、A–F 補強建議 | [docs/04-perplexity-research.md](docs/04-perplexity-research.md) |
| 規範第三節 Deep Research（20%） | Q1 五個核心思維、Q2 三個爭論、Q3 十個問題＋回答；引用全部重新核對 | [docs/06-deep-research.md](docs/06-deep-research.md) |
| 規範必繳 Proposal PPT | 依重構內容重建的 24 頁簡報（PPTX、PDF、產生腳本） | [presentation/](presentation/) |

## OpenSpec workflow

```text
/opsx:explore  → 釐清想法（docs/01 的 5 核心 / 3 取捨）
/opsx:propose  → proposal.md + specs/ + design.md + tasks.md   ← 目前在這一步
/opsx:apply    → 依 tasks.md 實作（W1–W8）
/opsx:archive  → 實作完成後把 delta specs 合併到 openspec/specs/
```

常用指令：

```bash
openspec list
```

```bash
openspec show add-dietsense-agent
```

```bash
openspec validate add-dietsense-agent --strict
```

## 5 個 capability

| Capability | 負責 | 架構模組 |
|-----------|------|---------|
| `conversational-food-logging` | 意圖、食物抽取、單次追問、修改記錄 | ①②③ |
| `nutrient-retrieval` | 多來源錨定、來源追溯、未知食物降級 | ④ |
| `energy-analytics` | 熱量區間、巨量營養素、TDEE | ⑤⑥ |
| `dietary-safety-guard` | 攝取過低、拒絕極低熱量、暴食-節食提示 | ⑥⑦ |
| `agent-evaluation` | 500 筆標註集、基準比較、校準、安全測試 | 評估 |

## 關於 Perplexity、NotebookLM、ChatGPT 步驟

這三個步驟的產出都由 Claude 用網路搜尋與本機工具完成，**沒有實際使用這三個服務**；各文件開頭都有註明。數字盡量回到原始來源（期刊、PubMed、官方網站）確認，只有二手資料的項目會標示「二手」。

## 設計決定（原 Open Questions）

| 問題 | 決定 | 理由 |
|------|------|------|
| 安全下限要不要依性別區分 | 要：女性 1,200、男性 1,500 kcal；未提供性別先詢問，回答前暫用 1,200 | Harvard Health（2024）的一般建議；單一 1,200 對男性太寬鬆 |
| 語音輸入放在哪一週 | 不列入 Proposal 範圍；W8 延伸目標，只在 W1–W7 完成時才做 | 避免語音辨識錯誤和熱量誤差混在一起；保住 W5 安全守門的時間 |
| 營養師複核台式料理庫 | 主要靠三層驗證（食材拆解、≥ 50 筆雙人標註、≥ 30 筆業者標示比對）；營養師是加分項 | 找不到營養師也不會卡住 W6 |

詳細的替代方案與取捨見 [design.md Decisions 5–7](openspec/changes/add-dietsense-agent/design.md)。

## 待補事項

- N2（NUTRITION 2026）是研討會摘要，尚未經完整同儕審查；正式論文發表後再更新。
- W1 記得向營養相關系所或保健中心詢問營養師複核意願（任務 1.5）。
- R28（國健署每日飲食指南的三大營養素比例）目前經政府教材引用核對，正式引用時建議附上國健署手冊網址。
- 簡報用 `presentation/build-deck.js` 產生（pptxgenjs），想改內容可以直接改腳本重建，或在 PowerPoint 裡編輯。
