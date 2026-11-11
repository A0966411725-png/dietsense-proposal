# Spec Delta

## Purpose

把錨定後的營養數值轉成個人化分析：熱量區間、巨量營養素比例、TDEE 與每日缺口，並誠實傳達估算的不確定性。

## ADDED Requirements

### Requirement: 熱量以區間呈現
The system SHALL 為每筆記錄與每日總量輸出 low / point / high 三個熱量值；區間寬度 MUST 隨配對信心降低而變寬。

#### Scenario: 高信心品項
- **WHEN** 一筆記錄的配對信心為 0.95
- **THEN** 回應呈現的區間比同份量、信心 0.60 的記錄窄

#### Scenario: 每日總量
- **WHEN** 使用者詢問今天吃了多少
- **THEN** 系統回報每日總量的區間，而不是只給單一數字

### Requirement: 巨量營養素比例
The system SHALL 計算每日蛋白質、碳水化合物、脂肪的熱量占比，並以國健署每日飲食指南（醣類 50–60%、蛋白質 10–20%、脂質 20–30%）為主要比較基準，AMDR 為較寬的參考範圍。

#### Scenario: 脂肪占比超出範圍
- **WHEN** 當日脂肪熱量占比為 42%
- **THEN** 系統指出脂肪占比高於每日飲食指南與 AMDR 的建議範圍

### Requirement: 個人 TDEE
The system SHALL 依使用者資料，以 Mifflin-St Jeor 公式乘上活動係數計算 TDEE；缺少必要資料時 MUST 詢問使用者，不得使用預設值。

#### Scenario: 資料完整
- **WHEN** 使用者已提供性別、年齡、身高、體重與活動量
- **THEN** 系統回報 BMR、TDEE，以及今日攝取與 TDEE 的差距

#### Scenario: 缺少體重
- **WHEN** 使用者要求分析，但沒有體重資料
- **THEN** 系統先詢問體重，再進行分析
