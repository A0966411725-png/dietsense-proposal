# Spec Delta

## Purpose

提供可重複執行的評估流程，用客觀數據驗證 DietSense 的準確度、效率、可用性與安全性，並與基準方法比較。

## ADDED Requirements

### Requirement: 台式料理標註資料集
The system SHALL 提供至少 500 筆台式料理自然語言描述的評估集，每筆包含參考熱量、巨量營養素、份量重量與參考來源。

#### Scenario: 資料集載入
- **WHEN** 執行評估指令
- **THEN** 系統載入評估集，並回報筆數與各類別（小吃、便當、飲料、夜市、西式）的分布

### Requirement: 參考值驗證
The system SHALL 為評估集的參考熱量提供三層驗證紀錄：全部以食材拆解計算並附來源；至少 50 筆由兩位標註者獨立計算並回報一致性；至少 30 筆與業者公開營養標示交叉比對。

#### Scenario: 一致性報告
- **WHEN** 雙人標註完成
- **THEN** 報告列出兩位標註者差距在 10% 以內的比例，以及經第三人仲裁的筆數

#### Scenario: 業者標示比對
- **WHEN** 某筆參考熱量與業者營養標示差距超過 20%
- **THEN** 該筆被標記為待複查，修正前不納入主要指標計算

### Requirement: 高誤差類別分項報告
The system SHALL 讓評估集涵蓋已知誤差最高的類別（含料飲料如珍珠奶茶、湯麵、燴飯與勾芡料理、油炸物），每類至少 30 筆，並分類別回報誤差。

#### Scenario: 分類別結果
- **WHEN** 評估完成
- **THEN** 報告列出每個類別的 MAPE 與 ±20% 命中率，並標示誤差最高的三個類別

### Requirement: 基準方法比較
The system SHALL 在同一評估集上比較 DietSense 與至少兩種基準方法：純 LLM 直接估算（無資料錨定，Base 與 Chain-of-Thought 兩種提示）與傳統資料庫手動查詢（可使用至少 100 筆的分層抽樣子集）。

#### Scenario: 產出比較表
- **WHEN** 評估完成
- **THEN** 系統輸出每種方法的 MAE、MAPE、±10% 與 ±20% 命中率

#### Scenario: 成對比較
- **WHEN** 比較 DietSense 與純 LLM 在同一批資料上的結果
- **THEN** 報告附上兩者誤差差異的 95% 信賴區間，不只列出平均值

### Requirement: 區間校準度
The system SHALL 回報參考熱量落在系統輸出區間內的比例（coverage）與平均區間寬度，每筆層級與每日層級都要回報。

#### Scenario: 校準報告
- **WHEN** 評估完成
- **THEN** 報告同時列出 coverage 與平均區間寬度，避免以過寬區間換取高 coverage

### Requirement: 安全測試集
The system SHALL 提供至少 30 筆不安全請求與風險模式的測試案例，並回報攔截率與誤報率。

#### Scenario: 安全測試
- **WHEN** 執行安全測試
- **THEN** 系統回報攔截率與誤報率，並列出每一筆未攔截的案例
