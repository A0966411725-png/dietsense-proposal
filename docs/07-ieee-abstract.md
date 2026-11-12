# 07 IEEE Transactions Abstract（第三部分）

> 對應作業說明第三部分：「IEEE TRANSACTION ABSTRACT — ChatGPT => IEEE transaction Systems journal style」。
> **製作方式**：由 Claude 依 IEEE Transactions 的摘要規則撰寫，沒有實際使用 ChatGPT。內容與 [01 的 300 字摘要](01-abstract-A-F.md) 一致，數字都來自已查證的文獻（[03](03-related-work.md#references已查證)、[04](04-perplexity-research.md#新增來源n1n6)）。

## Title

DietSense: A Data-Grounded Conversational AI Agent With Uncertainty Intervals and Safety Guards for Calorie Intake Logging in Taiwan

## Abstract

Dietary self-monitoring is associated with weight loss, yet adherence declines quickly: in calorie-counting apps, logging frequency falls from 5.4 to 1.4 days per week within 12 weeks. Photo-based apps and large language models (LLMs) reduce the logging burden but remain unreliable for mixed dishes, with a mean absolute percentage error of about 36% for GPT-4o on meal photographs and underestimation of up to 76% for bubble milk tea, and their values are untraceable. This paper proposes DietSense, a conversational domain AI agent for calorie intake logging in Taiwan. An LLM planner performs only intent classification, food extraction, and tool orchestration. All nutrient values are retrieved from the Taiwan Food and Drug Administration food composition database, a curated Taiwanese dish database, and USDA FoodData Central, and are computed deterministically with portion conversion tables and the Mifflin–St Jeor equation. Each estimate is a low–point–high interval that widens as retrieval confidence decreases or portion descriptions become vaguer, and the agent asks at most one clarification question per food item. A rule-based safety guard evaluates intake over completed days or seven-day averages against sex-specific minimums and declines very-low-calorie plan requests. The evaluation plan comprises a 500-item annotated benchmark of Taiwanese dishes, comparisons with direct LLM estimation and manual database lookup, interval coverage analysis, a seven-day crossover user study with 20 participants, and a safety test suite. Expected outcomes, to be verified experimentally, include higher ±20% accuracy than direct LLM estimation, shorter logging time than manual lookup, and a System Usability Scale score above 70.

## Index Terms

Calorie estimation, conversational agents, dietary assessment, large language models, retrieval-augmented generation, uncertainty quantification.

---

## 依 IEEE 摘要規則自我檢查

| 規則 | 本摘要 |
|------|-------|
| 單一段落、150–250 字 | 單一段落，250 字 |
| 不含引用編號、圖表與公式 | 沒有引用編號；數字直接寫出 |
| 縮寫第一次出現時寫全名 | large language models (LLMs) 首次出現即寫全名 |
| 依序交代問題、方法、評估、結果 | 問題（持續度、誤差、無來源）→ 方法（Planner、資料錨定、區間、追問、安全守門）→ 評估（benchmark、基準、使用者研究）→ 預期成果 |
| 不得虛構結果 | 成果寫成 “Expected outcomes, to be verified experimentally” |
| Index Terms 依字母排序，第一個字大寫 | 6 個關鍵詞，依字母排序 |
| 標題的大小寫 | 四個字母以上的介系詞（With）大寫，for、in 小寫 |

## 摘要中每個數字的出處

| 數字 | 出處 |
|------|------|
| 5.4 → 1.4 days per week within 12 weeks | Dugas et al. (2026) [R11] |
| about 36% MAPE for GPT-4o on meal photographs | Fridolfsson et al. (2025) [R3]：35.8% |
| up to 76% underestimation for bubble milk tea | Li et al. (2024) [N1] |
| female 1,200 / male 1,500 kcal minimums（摘要中寫作 sex-specific minimums） | Harvard Health Publishing (2024) [R29] |
| 500 items, 20 participants, seven days, SUS > 70 | 本專題的評估計畫與預期目標（design.md Evaluation Protocol） |

## 和課堂範例的差異

課堂範例的英文摘要包含語音輸入，並引用「2024 年 26 億成人過重、9.4 億人肥胖」、「自報誤差 18–54%」。本專題的版本：

- 不寫語音輸入：語音是 W8 的延伸目標，不在 Proposal 範圍內（design.md Decision 6）。
- 肥胖數字改用 WHO 官方的 2022 年資料（25 億過重、逾 8.9 億肥胖）[R14]，放在 300 字摘要與 Introduction；英文摘要以字數為優先，改用和本專題直接相關的記錄持續度與估算誤差。
- 不使用 18–54% 這個範圍：查證後，Poslusna 等人（2009）的原文是約 30% 受試者低報、能量約低估 15% [R19]。
