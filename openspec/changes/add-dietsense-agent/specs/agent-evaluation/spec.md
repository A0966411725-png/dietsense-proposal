# Spec Delta

## Purpose

提供可重複執行的評估流程，用客觀數據驗證 DietSense 的準確度、效率、可用性與安全性，並與基準方法比較。

## ADDED Requirements

### Requirement: 台式料理標註資料集
The system SHALL 提供至少 500 筆台式料理自然語言描述的評估集，每筆包含參考熱量、巨量營養素、份量重量與參考來源。

#### Scenario: 資料集載入
- **WHEN** 執行評估指令
- **THEN** 系統載入評估集，並回報筆數與各類別（小吃、便當、飲料、夜市、西式）的分布

### Requirement: 高誤差類別分項報告
The system SHALL 讓評估集涵蓋已知誤差最高的類別（含料飲料如珍珠奶茶、湯麵、燴飯與勾芡料理、油炸物），每類至少 30 筆，並分類別回報誤差。

#### Scenario: 分類別結果
- **WHEN** 評估完成
- **THEN** 報告列出每個類別的 MAPE 與 ±20% 命中率，並標示誤差最高的三個類別

### Requirement: 基準方法比較
The system SHALL 在同一評估集上比較 DietSense 與至少兩種基準方法：純 LLM 直接估算（無資料錨定）與傳統資料庫手動查詢。

#### Scenario: 產出比較表
- **WHEN** 評估完成
- **THEN** 系統輸出每種方法的 MAE、MAPE、±10% 與 ±20% 命中率

### Requirement: 區間校準度
The system SHALL 回報參考熱量落在系統輸出區間內的比例（coverage）與平均區間寬度。

#### Scenario: 校準報告
- **WHEN** 評估完成
- **THEN** 報告同時列出 coverage 與平均區間寬度，避免以過寬區間換取高 coverage

### Requirement: 安全測試集
The system SHALL 提供至少 30 筆不安全請求與風險模式的測試案例，並回報攔截率與誤報率。

#### Scenario: 安全測試
- **WHEN** 執行安全測試
- **THEN** 系統回報攔截率與誤報率，並列出每一筆未攔截的案例
