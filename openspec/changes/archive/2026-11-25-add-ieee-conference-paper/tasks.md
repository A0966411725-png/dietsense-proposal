## 1. OpenSpec 與 agent

- [x] 1.1 建立 `add-ieee-conference-paper` 變更（proposal、specs、design、tasks）並通過 `--strict` 驗證
- [x] 1.2 撰寫審稿 agent 定義 `.claude/agents/ieee-paper-reviewer.md`

## 2. v1 初稿（壞）

- [x] 2.1 把期中 Proposal 原樣翻成英文，套用 IEEEtran conference 格式
- [x] 2.2 期中稿的引用整理成 BibTeX（保留原本的錯誤）
- [x] 2.3 編譯 v1 PDF

## 3. 審稿

- [x] 3.1 用審稿 agent 檢查 v1，產出審稿報告（編號、位置、嚴重度、證據、修正方式）
- [x] 3.2 和 docs/03 的引用修正表交叉比對，補上遺漏的項目

## 4. v2 修正稿（好）

- [x] 4.1 依 `add-dietsense-agent` 規格與 docs 撰寫 v2（摘要、Introduction、Related Work、Proposed System、Evaluation Plan、Conclusion）
- [x] 4.2 以 TikZ 畫出 ①–⑧ 架構圖；以 algorithmic 寫出有行號的 Algorithm 1
- [x] 4.3 整理已查證的 BibTeX（附 DOI、arXiv 或網址）
- [x] 4.4 編譯 v2 PDF，確認不超過 6 頁、沒有未定義的引用
- [x] 4.5 在審稿報告中填上每個項目的處理方式

## 5. 繳交

- [x] 5.1 打包兩個 Overleaf zip，並在 `paper/README.md` 說明上傳方式與兩份 PDF 的差異
- [x] 5.2 更新 repo README 的作業對照表
- [x] 5.3 執行 `openspec validate --strict`，完成後封存這個變更
