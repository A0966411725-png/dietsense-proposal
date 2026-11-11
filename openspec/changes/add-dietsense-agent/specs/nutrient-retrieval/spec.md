# Spec Delta

## Purpose

把抽取出的食物錨定到可信的營養資料庫品項，讓每個營養數值都能追溯來源，避免 LLM 自行產生數字（幻覺）。

## ADDED Requirements

### Requirement: 多來源錨定與優先順序
The system SHALL 依序查詢台灣地區食品營養成分資料庫、自建台式料理庫、USDA FoodData Central，並回傳排序後的候選品項與配對信心。

#### Scenario: 台灣在地食物
- **WHEN** 查詢「滷肉飯」
- **THEN** 最高分的候選品項來自台灣資料庫或自建台式料理庫

#### Scenario: 進口或西式食物
- **WHEN** 查詢「凱薩沙拉」，且台灣資料庫沒有相符品項
- **THEN** 系統回傳 USDA 的候選品項

### Requirement: 數值來源可追溯
The system MUST 為每筆營養數值附上資料來源名稱與品項識別碼；LLM 產生的文字 MUST NOT 作為營養數值的來源。

#### Scenario: 回應顯示來源
- **WHEN** 系統回報一筆熱量
- **THEN** 回應中可展開查看「資料來源：<資料庫>／<品項 ID>」

### Requirement: 未知食物降級處理
The system SHALL 在所有資料庫都沒有足夠相符品項時，改用最相近的品項或依食材拆解估算，並明確標示為「近似估算」。

#### Scenario: 資料庫查無此物
- **WHEN** 查詢「阿嬤自製芋粿巧」，且所有候選信心都低於 0.50
- **THEN** 系統依食材（糯米、芋頭、餡料）拆解估算，標示為近似估算並使用較寬的區間
