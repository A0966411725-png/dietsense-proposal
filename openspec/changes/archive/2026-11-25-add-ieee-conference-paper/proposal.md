## Why

DIC4 要把 DietSense 的期末專題寫成 IEEE 會議論文初稿（Overleaf），並用 OpenSpec 管理整個流程。期中 Proposal 直接改寫成論文會把原本的錯誤一起帶進去：約 15 處引用查不到或對不上、虛擬碼的安全檢查會在早餐後誤報、`recommend` 分支用到未定義的變數。因此這個變更把「寫論文」拆成三步：先照期中稿原樣排出初稿（v1），再用審稿 agent 找出錯誤，最後產出修正稿（v2）。兩份 PDF 一起保留，讓修正過程可以被檢查。

## What Changes

- 新增 IEEE 會議論文的 LaTeX 專案（IEEEtran conference 格式），可直接上傳 Overleaf 編譯。
- 新增 v1 初稿：內容忠實保留期中 Proposal（含已知錯誤），只翻譯成英文並套用 IEEE 格式。
- 新增審稿 agent（`.claude/agents/ieee-paper-reviewer.md`）與審稿報告：逐條列出錯誤的位置、嚴重度、證據與修正方式。
- 新增 v2 修正稿：內容以 `add-dietsense-agent` 的規格與已查證的 docs 為準，修正審稿報告中所有 Critical 與 Major 項目。
- 新增兩份 PDF（v1、v2）與兩個 Overleaf 上傳用的 zip。

## Capabilities

### New Capabilities

- `ieee-conference-paper`：IEEE 會議論文的格式、結構、A–F 摘要、引用與數字可追溯性，以及和系統規格的一致性。
- `paper-review-agent`：審稿 agent 的檢查清單、審稿報告格式，以及修正稿必須達到的標準。

### Modified Capabilities

（無。論文描述的是 `add-dietsense-agent` 的設計，不改變系統行為。）

## Impact

- 新增 `paper/`（兩份 LaTeX 原始檔、PDF、Overleaf zip、審稿報告）與 `.claude/agents/ieee-paper-reviewer.md`。
- 編譯工具：本機用 Tectonic 0.17.0 驗證；Overleaf 使用 pdfLaTeX + BibTeX。
- 不影響 `add-dietsense-agent` 的任何規格；論文中的參數（τ、w0、α、β、安全下限）必須和它的 design.md 一致。
