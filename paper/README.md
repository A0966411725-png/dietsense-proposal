# DIC4：DietSense IEEE 會議論文初稿（Overleaf + OpenSpec）

作業要求：
1. overleaf draft for IEEE conference
2. openspec on github

## 繳交的兩份 PDF（一壞一好）

| 版本 | 內容 | PDF | Overleaf zip |
|------|------|-----|-------------|
| **v1 初稿（壞）** | 期中 Proposal 原樣翻成英文、套 IEEE 格式；數字、引用與虛擬碼**刻意不修正** | [pdf/DietSense_IEEE_v1_draft.pdf](pdf/DietSense_IEEE_v1_draft.pdf) | [overleaf/DietSense_IEEE_v1_draft.zip](overleaf/DietSense_IEEE_v1_draft.zip) |
| **v2 修正稿（好）** | 依審稿報告修正；內容以 OpenSpec 規格與已查證的 docs 為準 | [pdf/DietSense_IEEE_v2_revised.pdf](pdf/DietSense_IEEE_v2_revised.pdf) | [overleaf/DietSense_IEEE_v2_revised.zip](overleaf/DietSense_IEEE_v2_revised.zip) |

兩者之間的每一處修正都記在 [review/review-report.md](review/review-report.md)：錯誤編號、位置、嚴重度、證據，以及在 v2 的處理方式。

## 審稿結果

審稿 agent 在 v1 找到 **48 處問題**：Critical 5、Major 33、Minor 10。v2 修正了全部 48 項，包括 Critical、Major 與 Minor（E48 作者區塊已加上系所；email 依作者意願不列）。之後作者又逐句核對 v2 與原始來源，另外修正 11 項（引用精確度、符號衝突、縮寫、DOI 顯示等），記在審稿報告第五節。

| 最重要的問題 | v1 | v2 |
|-------------|----|----|
| E25 安全檢查誤報 | 用「當日累計 < 1,200 kcal」判斷，吃完早餐、甚至當天第一則訊息就觸發 | 只在當日結算或 7 日平均判斷，下限依性別區分 |
| E27 未定義變數 | `rec`、`tdee`、`macro_ratio` 只在某些分支有值，幾乎每種意圖都會出錯 | 先計算共用的每日狀態，`rec` 只在分析與建議時產生 |
| E26 暴食-節食警示失效 | 回傳的 `WARNING` 沒有被處理 | 所有風險等級都會觸發提示 |
| E03 摘要引用不存在 | Teixeira 2025 查不到（該編號其實是另一篇 2022 年論文） | 改引 Burke 2011 與 Dugas 2026 |
| E38 把目標寫成結果 | 「±20% 命中率 > 85%、SUS > 70、顯著優於」寫在 Findings | 獨立成 Expected Outcomes，明確標示不是結果 |

| 比較 | v1 初稿 | v2 修正稿 |
|------|--------|----------|
| 頁數 | 3 | 5（上限 6） |
| 摘要 | A–F 標籤條列，含引用 | 單一段落 250 字，依 A→F 順序 |
| Index Terms | 無 | 6 個，依字母排序 |
| 參考文獻 | 10 筆（2 筆沒被引用），至少 4 筆查不到或內容不符，沒有 DOI | 30 筆，全部被引用；期刊印出 DOI、預印本附 arXiv 編號、網站附網址與存取日期；拍照 App 研究引用 ASN 新聞稿並註明為初步結果 |
| 文獻摘要表 | 5 篇沒有作者的 [1]–[5] | 9 篇已查證文獻，以 \cite 編號 |
| 架構圖 | 文字條列 | TikZ 繪製的 ①–⑧ 架構圖 |
| 演算法 | Python 風格程式碼，行號重複 | algorithmic 環境，1–20 行 |
| 公式 | 無 | 熱量、區間半寬、每日合併三條公式 |

## 流程

```text
期中 Proposal ──► v1 初稿（IEEE 格式，內容不改）
                    │
                    ▼
        ieee-paper-reviewer（審稿 agent）
                    │  六類檢查：A–F 摘要、引用、數字與出處、演算法邏輯、過度主張、IEEE 格式
                    ▼
            review/review-report.md
                    │
openspec/changes/add-dietsense-agent ──┐
docs/01–07（已查證）───────────────────┼──► v2 修正稿
                    review report ─────┘
```

| 步驟 | 對應的 OpenSpec 或檔案 |
|------|----------------------|
| 論文的需求（格式、A–F 摘要、引用、不得虛構結果、與系統規格一致） | `ieee-conference-paper` 規格 |
| 審稿 agent 的檢查清單與報告格式 | `paper-review-agent` 規格；agent 定義在 [.claude/agents/ieee-paper-reviewer.md](../.claude/agents/ieee-paper-reviewer.md) |
| 任務清單 | 變更 `add-ieee-conference-paper` 的 tasks.md（完成後已封存，規格合併到 `openspec/specs/`） |

## 上傳到 Overleaf

1. 登入 Overleaf → **New Project** → **Upload Project**。
2. 選 `overleaf/DietSense_IEEE_v2_revised.zip`（要看初稿就選 v1）。
3. 開啟後按 **Recompile**。Overleaf 預設的 pdfLaTeX 即可，不需要改編譯器；IEEEtran 與 BibTeX 都是內建的。

## 本機重新編譯

這台電腦沒有 TeX 發行版，所以用 [Tectonic](https://tectonic-typesetting.github.io/)（單一執行檔，會自動下載需要的套件）：

```bash
TECTONIC=path/to/tectonic.exe python scripts/build_paper.py
```

`main.tex` 會自動判斷編譯器：Tectonic（XeTeX）時用 TeX Gyre Termes 字型，Overleaf（pdfLaTeX）時用 IEEEtran 預設的 Times，兩邊版面相近。

## 關於 MCP

這台電腦沒有可用的 Overleaf MCP，所以 Overleaf 這一步是用 zip 上傳完成。論文的撰寫、審稿與查證是在 Claude Code 中完成，文獻查證使用 PubMed E-utilities、Crossref、arXiv 與出版社網站。
