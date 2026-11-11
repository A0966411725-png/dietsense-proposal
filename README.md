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

## 待補事項

- 二手資料 N3–N5（Cal AI 營收、台灣外食超過七成、AI 青少年菜單）還缺原始來源；正式文件目前沒有引用 N3、N4，N5 只出現在 Deep Research 補充。
- N2（NUTRITION 2026）是研討會摘要，尚未經完整同儕審查。
- 依重構內容更新 Proposal PPT（規範必繳）。
- 把 Deep Research Q1–Q3 搬進 repo 並套用 docs/05 第三節的證據更新。
- `design.md` 的 Open Questions（安全下限是否依性別區分、語音輸入時程、營養師抽樣複核）。
