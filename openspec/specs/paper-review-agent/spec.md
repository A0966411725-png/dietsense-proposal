# paper-review-agent Specification

## Purpose
用一個固定六類檢查清單的審稿 agent（A–F 摘要、引用、數字與出處、演算法邏輯、過度主張、IEEE 格式）找出論文初稿的錯誤，輸出附證據與嚴重度的審稿報告，並讓初稿到修正稿的每一處修改都可以被追溯與驗證。

## Requirements

### Requirement: 審稿檢查清單
The review agent SHALL 依序檢查六類問題：A–F 摘要結構、引用可查證性、數字與出處是否一致、演算法與流程的邏輯錯誤、主張是否超出證據、IEEE 格式。

#### Scenario: 逐類檢查
- **WHEN** 審稿 agent 收到一份論文初稿
- **THEN** 報告中六類問題都有結論，沒有問題的類別也要寫明「未發現問題」

### Requirement: 審稿報告格式
The review agent SHALL 為每個問題提供編號、位置（章節或行號）、嚴重度（Critical、Major、Minor）、證據與建議修正方式；Critical 指會讓結論或系統行為錯誤的問題，Major 指無法查證或與出處不符的內容，Minor 指格式與措辭。

#### Scenario: 查不到的引用
- **WHEN** 某筆引用查不到
- **THEN** 報告寫出查詢過的資料庫，並把它標為 Major 以上

### Requirement: 修正稿的驗收
The revised paper MUST 解決報告中全部 Critical 與 Major 項目；審稿報告 SHALL 有一欄記錄每個項目在修正稿中的處理方式與位置。

#### Scenario: 驗收修正稿
- **WHEN** 修正稿完成
- **THEN** 報告中每個 Critical 與 Major 項目的狀態都是「已修正」或「已移除」，並註明修正稿中的位置

### Requirement: 一好一壞兩份 PDF
The workflow SHALL 同時保留初稿（v1）與修正稿（v2）的 PDF，讓讀者可以對照修正前後的差異。

#### Scenario: 繳交檔案
- **WHEN** 繳交 DIC4
- **THEN** `paper/pdf/` 中有 v1 與 v2 兩份 PDF，README 說明兩者的差異
