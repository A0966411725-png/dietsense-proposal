# ieee-conference-paper Specification

## Purpose
把 DietSense 的系統設計寫成可投稿 IEEE 會議的論文初稿（IEEEtran conference 格式），並讓論文的格式、A–F 摘要結構、引用與統計數字的出處，以及和系統規格的一致性，都能被逐項檢查與重新編譯驗證。

## Requirements

### Requirement: IEEE 會議格式
The paper SHALL 使用 IEEEtran 的 conference 格式（雙欄、A4 或 Letter），正文加參考文獻不超過 6 頁，並 MUST 能在 Overleaf 與本機 Tectonic 編譯成功、沒有未定義的引用或參照。

#### Scenario: 上傳 Overleaf
- **WHEN** 把 Overleaf zip 上傳成新專案並按下 Recompile
- **THEN** 產生 PDF，記錄中沒有 Error，也沒有 undefined citation 或 reference 的警告

#### Scenario: 頁數
- **WHEN** 編譯完成
- **THEN** PDF 不超過 6 頁

### Requirement: A–F 結構的摘要
The paper SHALL 提供單一段落、150–250 個英文單字的摘要，依序涵蓋 Attention、But、Cure、Development、Experiments、Findings 六個部分，並附上依字母排序的 Index Terms。

#### Scenario: 摘要檢查
- **WHEN** 審稿 agent 檢查摘要
- **THEN** 可以在摘要中逐一標出 A–F 六個部分，且字數在 150–250 之間

### Requirement: 章節與技術表示
The paper SHALL 包含 Introduction、Related Work（AI 技術與營養領域知識約各半）、Proposed System、Evaluation Plan、Conclusion；Proposed System MUST 包含以 ①–⑧ 編號的架構圖、有行號的演算法，以及區間計算公式。

#### Scenario: 架構圖編號
- **WHEN** 讀者對照架構圖與正文
- **THEN** 圖中的每個模組編號都在正文有對應的說明

### Requirement: 引用與數字可追溯
The paper MUST 只引用可查證的文獻（附 DOI、arXiv 編號或官方網址）；正文中的每個統計數字 MUST 對應到一筆參考文獻，且數字與原文一致。

#### Scenario: 查不到的引用
- **WHEN** 審稿時發現某筆引用在 PubMed、Crossref、arXiv 與出版社網站都查不到
- **THEN** 該引用與它支撐的數字從修正稿中移除或替換

### Requirement: 不得虛構結果
The paper MUST 把尚未完成的實驗成果寫成預期目標（expected outcomes），不得寫成已觀察到的結果，也不得使用「顯著優於」這類需要統計檢定的措辭。

#### Scenario: 預期成果措辭
- **WHEN** 論文提到 SUS、命中率或記錄時間的目標
- **THEN** 句子明確標示這些是預期目標

### Requirement: 與系統規格一致
The paper SHALL 使用和 `add-dietsense-agent` design.md 相同的參數與規則：τ = 0.80、τ_low = 0.50、w0 = 0.10、α = 0.50、β = 0.15、w_max = 0.60，安全下限女性 1,200 kcal、男性 1,500 kcal，以完整日或 7 日平均判斷。

#### Scenario: 參數不一致
- **WHEN** 論文中的任一參數和 design.md 不同
- **THEN** 審稿報告把它列為 Major 項目
