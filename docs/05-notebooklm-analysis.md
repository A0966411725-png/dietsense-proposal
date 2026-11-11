# 05 第一段：依《A2Z outline》與《期末專題提案作業規範》解析 DietSense（NotebookLM 步驟）

> 對應作業截圖第一段的 prompt：「請按照 A2Z*.PDF 和期末專題規範*.pdf 來解析（專題）內容」。
> **製作方式**：本文件由 Claude 根據兩份 PDF 與本 repo 重構後的文件完成，沒有實際使用 NotebookLM。
> 解析對象是**重構後**的版本（docs/01–04 與 openspec/），不是期中原稿。原稿的 NotebookLM 解析是你提供的「1.NBLM output 熱量AI提案解析.pdf」，本文件在表格最後一欄標出與原稿相比改了什麼。

---

## 一、依《期末專題提案作業規範》評分項目檢核

| 評分項目（比例） | 規範要求 | 本 repo 對應內容 | 狀態 | 和期中原稿相比 |
|----------------|---------|-----------------|------|--------------|
| Introduction（20%） | 重要性、動機、Evidence、Innovation；A–F 結構；有客觀證據 | [02-introduction.md](02-introduction.md)：A–F + L；WHO、國健署原始附件、2025–2026 研究 | ✅ | 移除查不到的數字；加入拍照 App 與珍奶誤差的新證據 |
| Related Work（20%） | 約 1/2 AI + 1/2 Domain；Article Summary Table；Existing → Limitations → Gap → Our Project | [03-related-work.md](03-related-work.md)：M1–M3（AI）+ D1–D5（Domain）；9 篇摘要表；4 個缺口 | ✅ | 原表 [1]–[5] 沒有作者，已全部換成可查證文獻；R1–R24 都附 DOI 或官方網址 |
| Deep Research（20%） | 5 個核心思維、3 個爭論、10 個深度問題 | 期中 Word 第四節（內容可沿用）；本文件第三節補上新證據 | ⚠️ 部分 | 爭論二的證據已更新（見第三節）；Q1–Q3 尚未搬進 repo |
| Proposed AI Agent + Architecture（20%） | ①–⑧ 模組架構圖，正文逐一說明 | [design.md](../openspec/changes/add-dietsense-agent/design.md)：Mermaid 架構圖 + 模組對應表 | ✅ | 每個模組都對應到 OpenSpec capability |
| Flowchart + Pseudocode + Feasibility（15%） | 含 Decision／Loop／Exception 的流程圖；有行號的 Pseudocode | design.md：Mermaid 流程圖、Algorithm 1（18 行） | ✅ | 修正原稿兩個錯誤：早餐後誤報、`recommend` 用到未定義變數；追問改為有上限 |
| GitHub + DESIGN.md + 完整度（5%） | 正式 Repository；從 Proposal 階段開始維護 DESIGN.md | 私人 repo `dietsense-proposal`；[DESIGN.md](../DESIGN.md) | ✅ | 原稿沒有 repo |
| Abstract（必繳） | A–F；Findings 不得虛構 | [01-abstract-A-F.md](01-abstract-A-F.md)：5 核心、3 取捨、10 細節、約 500 字摘要 | ✅ | 明確標註「預期目標，非實驗結果」 |
| Proposal PPT（必繳） | 動機、文獻、Gap、Agent Design、Architecture、Flowchart、Pseudocode | 期中 PPT 尚未依重構內容更新 | ❌ 待做 | — |

**規範的核心原則檢查：「不要只做一個 Model，也不要只做一個 Chatbot」**

| 規範要的能力 | DietSense 怎麼做到 |
|-------------|------------------|
| 懂領域 | ⑥ 份量對照表、AMDR / DRI、Mifflin-St Jeor、安全規則（確定性資料，不經 LLM） |
| 會取得資料 | ④ 食藥署資料庫、台式料理向量庫、USDA FoodData Central、個人日誌 |
| 會分析 | ⑤ kcal 區間、巨量營養素、TDEE、缺口分析 |
| 會推理 | ③ LLM Planner 決定工具呼叫順序、何時追問 |
| 提供有用結果 | ⑦⑧ 替換建議、來源、區間圖 |
| 能用客觀證據驗證 | agent-evaluation spec：500 筆標註集、三種基準、分類別誤差、安全測試 |

---

## 二、依《A2Z SOP outline》26 個字母對照

| 字母 | A2Z 定義 | DietSense 重構後內容 | 文件位置 |
|------|---------|--------------------|---------|
| **A** | Attention Getter | WHO 2022 年逾 8.9 億成人肥胖 [R14]；台灣男性過重 + 肥胖 58.4%、女性 42.6% [R15] | 01、02-A |
| **B** | But | App 持續度 5.4 → 1.4 天／週 [R11]；漏記 18% [R13]；拍照 App 每餐少算 250–345 kcal [N2]；珍奶低估 76% [N1] | 01、02-C |
| **C** | Cure | DietSense 對話式熱量攝取 Domain AI Agent | 01、proposal |
| **D** | Development | LLM Planner + 台灣優先 RAG + 份量表 + Mifflin-St Jeor + 區間 + 安全守門 | 01、design |
| **E** | Experiments | 500 筆標註集（高誤差類別各 ≥ 30 筆）、純 LLM 與手動查詢兩種基準、20 人 7 天 | 01、agent-evaluation spec |
| **F** | Findings | Expected：±20% 命中率優於純 LLM、記錄時間短於手動、SUS > 70（非實驗結果） | 01 |
| **G** | General 現況 | 肥胖盛行率倍增；LLM 與 Agent 技術讓「一句話記錄」可行 | 02-A、B |
| **H** | However | 四個障礙：查詢負擔、份量模糊、複合料理、在地資料不足 | 02-C |
| **I** | In literature | 手動 App → 影像 MLLM → 文字 LLM → 資料錨定 Agent | 03-M1～M3 |
| **J** | Judgement | 方法比較表：準確度、負擔、可追溯性、在地性、缺點 | 02-D、03-O |
| **K** | Keypoint | 6 個創新點（分工、台灣優先、語言補足照片、區間、追問上限、安全） | 02-E |
| **L** | List organization | 章節結構說明 | 02-L |
| **M** | Methods | AI 三類（M1–M3）+ Domain 五類（D1–D5） | 03 |
| **N** | New proposed | Existing → Limitations → Gap（G1–G4）→ DietSense | 03-N |
| **O** | Organize | Article Summary Table（9 篇）+ 方法比較表 | 03-O |
| **PA** | Aim | 低負擔、可追溯、在地化、誠實呈現不確定性的熱量 Agent | proposal Why |
| **PB** | Based on | 食藥署資料庫、USDA FDC、AMDR、Mifflin-St Jeor、能量平衡 [R17][R18] | design Context |
| **PC** | Cure / Cause | LLM 不產生數值 → 消除幻覺；單次追問 → 降低模糊又不增加負擔 | design Decisions 1、4 |
| **PD** | Design | 典範轉移：從「使用者配合資料庫填表」到「Agent 理解口語並自行查資料」 | design Architecture |
| **PE** | Paper element | ①–⑧ 八個模組 | design 模組對應表 |
| **PF** | Formulation | kcal = 克數 × kcal/100g ÷ 100；半寬比例 w = w0 + α(1 − c) + β·模糊度；BMR 公式 | design Pseudocode |
| **PG** | Graph | Mermaid 架構圖與流程圖 | design |
| **PH** | How | NER 抽取 → 多來源檢索排序 → 信心門檻 → 區間 → 安全檢查 | design Flowchart |
| **PI** | Implementation | Algorithm 1（18 行）+ tasks.md 31 項任務 | design、tasks |
| **PJ** | Jump to an example | 「一碗加蛋的台式牛肉麵，湯喝一半」端到端範例 | conversational-food-logging spec |
| **PK** | Key contribution | 系統、500 筆台式料理標註集、評估框架、錨定管線 | 02-F、04 第四節 |
| **PL** | Later simulation | W6 離線評估 + W7 使用者研究 | tasks 6–7 |
| **PM** | Math proof | 區間 coverage 與寬度校準（避免以過寬區間換取覆蓋率） | agent-evaluation spec |
| **Q** | Quality & Quantity | MAE、MAPE、±10%／±20%、coverage、寬度、記錄秒數、追問率、SUS、攔截率、誤報率 | agent-evaluation spec |
| **R** | Related method | 純 LLM、手動資料庫查詢（可選：商業拍照 App） | agent-evaluation spec |
| **S** | Simulation setup | 500 筆標註集 + 30 筆安全測試 + 本機向量庫與真實 API | tasks 6 |
| **T** | Tuning | τ = 0.80、w0 = 0.10、α = 0.50、β = 0.15 | design Pseudocode |
| **U** | Useful results | 熱量區間、巨量營養素圖、TDEE 缺口、分類別誤差 | energy-analytics spec |
| **V** | Verify | 和基準比較；記錄時間與 SUS 驗證可用性 | tasks 6.3、7.3 |
| **W** | What proposed | 解決「記錄負擔高 → 放棄」與「AI 數字無來源」兩個問題 | 結論（Final 再寫） |
| **X** | eXcel | 台灣外食、混合料理、口語份量描述 | 02-E |
| **Y** | Yields | GitHub repo、DESIGN.md、OpenSpec 規格、標註集、評估報告 | README |
| **Z** | Zen | 限制：只支援文字、自報偏差仍在、安全下限採固定值；未來：影像輸入、微量營養素、依性別調整下限 | design Non-Goals、Open Questions |

---

## 三、Deep Research 更新（以新證據修正期中稿）

期中 Word 第四節的 Q1（5 個核心思維）、Q3（10 個深度問題）可以沿用。Q2（3 個爭論）有兩處需要更新證據：

### 爭論一：Calorie Quantity vs. Food Quality

- 期中稿把 Ludwig et al. (2018) 寫成 *JAMA Internal Medicine*，但參考文獻列的是 *Science*，兩處不一致。
- **建議改用**：DIETFITS 隨機試驗 [R20]（609 位成人、12 個月）發現，健康低脂與健康低碳飲食的減重成效沒有顯著差異。這支持「總熱量 + 飲食品質」比單一巨量營養素比例重要，也是 DietSense 同時顯示熱量與巨量營養素的理由。

### 爭論二：AI 份量估算準確度（LLM 足夠 vs. 需要硬體輔助）

期中稿引用的 Cheng et al. (2024)「GPT-4 達 83% 準確」查不到，Subar et al. (2015) 題名也對不上。**建議改用以下證據**：

| 觀點 A：AI 已經夠用 | 觀點 B：AI 還不夠準 |
|-------------------|-------------------|
| 客製化 GPT-4o 的熱量多落在秤重記錄 ±10–20% 內 [R4] | GPT-4o、Claude 照片估熱量 MAPE 約 36% [R3] |
| 新一代 MLLM 直接估算已追上檢索管線 [R6] | 拍照 App 每餐少算 250–345 kcal，脂肪少算約 30 g [N2] |
| NutriBench：多數 LLM 比營養師更快、更準 [R1] | 混合料理誤差最大，珍奶低估最多 76% [N1] |

- **目前共識**：AI 適合日常趨勢追蹤，不適合臨床精確計算；誤差集中在份量、隱藏油脂與混合料理。
- **尚未解決**：如何讓使用者理解並正確使用不確定性；哪種錨定方式在新一代模型上仍有優勢。
- **對 DietSense 的影響**：熱量以區間呈現；高誤差類別分項評估；純 LLM 列為必測基準。

### 爭論三：個人化 vs. 通用指引

證據（Zeevi et al. 2015 [R16]）可沿用。補充：AI 聊天機器人替青少年產生的菜單平均每天少將近 700 kcal 的報導 [N5]（二手資料），說明「個人化」若缺少安全基線可能造成傷害，支持 DietSense 以通用指引作為安全底線的設計。

---

## 四、整體評語與待辦

**亮點**
1. 引用全面改成可查證來源，並保留「引用修正表」，口試時能說明每個數字的出處。
2. 設計從 Word 文件變成可驗證的 OpenSpec 規格（`--strict` 通過），每個需求都有測試情境。
3. 誠實處理反證（Open-KNEAD），把它變成實驗設計的一部分。

**送出前還要做的事**
1. 依重構內容更新 Proposal PPT（規範必繳）。
2. 把 Deep Research Q1–Q3 搬進 repo（例如 `docs/06-deep-research.md`），並套用第三節的證據更新。
3. 補上「台灣外食超過七成」與「AI 青少年菜單」兩筆二手資料的原始來源；找不到就不要放進正式文件。
