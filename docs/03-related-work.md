# 03 Related Work 重構（A2Z：M → N → O）

> 對應作業項目 5「related work refactor」。結構依規範：約 1/2 AI Technology + 1/2 Domain Know-how，必須附 Article Summary Table，最後歸納 Existing Research → Limitations → Research Gap → Our Project。

## 重構了什麼（與期中稿比較）

| 期中稿的問題 | 重構後 |
|-------------|-------|
| Article Summary Table 的 [1]–[5] 沒有作者與出處，無法查證 | 換成 9 篇可查證的文獻（2020–2026，其中 2025–2026 有 7 篇），附作者、期刊或會議 |
| 部分引用和內容對不上（見文末「引用修正表」） | 逐條修正或刪除，改用可查證的來源 |
| AI 和 Domain 兩部分各自列點，沒有比較 | 新增方法分類 × 評估面向的比較表（A2Z 的 O. Organize） |
| Research Gap 只有一句話 | 拆成四個具體缺口，各自對應到 DietSense 的設計 |

---

## M. Methods：AI Technology（約 1/2）

### M1. 從文字估營養：LLM 直接估算

NutriBench [R1]（ICLR 2025）用 11,857 筆真實飲食資料轉成的自然語言餐點描述，評估 12 個 LLM 估算碳水化合物的能力。表現最好的 GPT-4o 搭配 CoT，準確率約 66.8%。另有摘要指出，模型在「一碗飯」這類自然份量描述上的表現，比「80 公克飯」差（此點來自二手摘要，引用前需回原文確認）。**意義**：文字估算可行，但份量描述的模糊程度是主要誤差來源，這正是台灣口語飲食描述的常態。

### M2. 從照片估營養：多模態 LLM

- O'Hara et al.（2025）[R2]：ChatGPT-4 辨識照片中食物的精確度約 93%，但熱量、蛋白質、碳水估算與 7 位營養師的一致性只有中等（ICC 0.31–0.67）。
- Fridolfsson et al.（2025）[R3]：52 張標準化照片，GPT-4o 和 Claude 3.5 Sonnet 的熱量 MAPE 都約 35.8%，Gemini 1.5 Pro 約 64.2%。
- Chen et al.（2025，台灣，AJCN）[R4]：客製化的 Diabot-GPT-4o 在 57 人、714 張照片上，只用影像的食物辨識率為 74%，未客製化的 GPT-4o 為 59%；熱量大致落在秤重記錄的 ±10–20% 內。**意義**：加入領域客製化（台灣食物知識）能明顯提升表現。
- DiningBench（ACL 2026）[R5]：3,021 道菜，其中 2,086 道為中式料理；表現最好的模型營養估算平均 MAPE 仍有 24.45%，作者把誤差歸因於無法從 2D 推斷 3D 份量。

### M3. 資料錨定與 Agent 化（新趨勢）

- ChatDiet（2024）[R7]：LLM + 個人模型 + 族群模型 + orchestrator，可以產生個人化、可解釋的飲食推薦；但只用一位使用者的三年資料做個案研究。
- 斯洛維尼亞食品成分 RAG 評估（2026）[R10]：在國家食品成分資料庫上建立 RAG，比較 4 個 LLM 的檢索能力。**意義**：把國家資料庫接到 LLM 的做法已有先例，但尚未延伸到對話式記錄。
- Open-KNEAD（2026）[R6]：把餐點拆解成單項，再錨定到 USDA FNDDS 代碼，屬於 training-free 的 Agent 框架。作者也發現，新一代 MLLM 直接估算已能追上甚至超過完整檢索管線。**意義**：這是對 DietSense 的重要反證，所以我們把「純 LLM」列為必測基準（見 Trade-off T2）。

## M. Methods：Domain Know-how（約 1/2）

### D1. 能量平衡與 TDEE

體重變化來自長期的能量不平衡，而且身體會動態適應，不能用「每 7,700 kcal = 1 kg」線性推算 [R18]。TDEE 估算採用 Mifflin-St Jeor 公式 [R17]，它在一般成人上是常用的實務選擇。**設計影響**：缺口分析以區間和趨勢呈現，不宣稱精確減重預測。

### D2. 自我記錄的效果與誤差

- 自我記錄和減重有一致的正相關 [R24]，但持續度會快速下降 [R11]。
- 自我報告本身就有系統性誤差，尤其是低報 [R19]。
- MyFitnessPal 在能量與巨量營養素上有可接受的相對效度 [R12]，但使用者平均漏記約 18% 的品項，而且能量明顯被低估 [R13]。**設計影響**：降低每次記錄的負擔，比把單次估算做到極致更能改善整體資料品質。

### D3. 食物成分資料與台灣在地性

台灣的官方來源是食藥署「台灣地區食品營養成分資料庫」[R22]，以原料與初級加工食品為主，複合熟食料理很少；USDA FoodData Central [R23] 涵蓋廣，但缺乏台灣小吃。**設計影響**：需要自建台式料理庫，以食材拆解計算營養，並標示資料來源與衍生方式。

### D4. 品質 vs. 數量、個人化 vs. 通用指引

- DIETFITS 隨機試驗 [R20]：健康低脂與健康低碳飲食在 12 個月的減重成效沒有顯著差異，支持「總熱量與飲食品質」比單一巨量營養素比例重要。
- Zeevi et al. [R16]：同一種食物在不同人身上的血糖反應差異很大，支持精準個人化；但需要血糖監測與腸道菌資料，超出一般使用情境。**設計影響**：採用 AMDR 等通用指引作為安全基線，不做醫療層級的個人化。

### D5. 公共衛生背景

WHO 指出 2022 年全球有 25 億成人過重，其中逾 8.9 億人肥胖 [R14]；2025 年 WHO 在 GLP-1 用藥指引中提到全球肥胖人口已超過 10 億 [R21]。台灣 2017–2020 年國民營養調查顯示，成人男性過重 30.31%、肥胖 28.12%；女性過重 22.98%、肥胖 19.57%（過重定義為 24 ≤ BMI < 27，肥胖為 BMI ≥ 27）[R15]。

---

## O. Organize：Article Summary Table

| Ref | Year | Problem | AI Method | Domain Knowledge | Dataset | Findings | Limitation |
|-----|------|---------|-----------|------------------|---------|----------|------------|
| [R1] Hua et al. | 2025 | 從餐點文字估碳水 | 12 個 LLM、CoT、RAG 等提示策略 | 全球飲食攝取調查資料、營養標註 | NutriBench，11,857 筆描述 | GPT-4o + CoT 準確率約 66.8% | 以碳水為主；非中文、非台灣食物 |
| [R2] O'Hara et al. | 2025 | 照片估營養是否可取代營養師 | ChatGPT-4（多模態） | 營養師估算作為比較 | 114 張餐點照片（38 張與營養師比較） | 食物辨識精確度約 93%；與營養師 ICC 0.31–0.67 | 樣本小；一致性只有中等 |
| [R3] Fridolfsson et al. | 2025 | 比較三個 LLM 從照片估重量與熱量 | GPT-4o、Claude 3.5 Sonnet、Gemini 1.5 Pro | 秤重參考值 | 52 張標準化照片 | 熱量 MAPE：GPT-4o 35.8%、Claude 35.8%、Gemini 64.2% | 照片標準化，與真實情境有落差；沒有資料錨定 |
| [R4] Chen et al.（台灣） | 2025 | 客製化 GPT-4o 能否提升影像飲食評估 | 客製化 Diabot-GPT-4o vs. GPT-4o | 秤重飲食記錄、台灣飲食 | 57 人、714 張照片、171 天 | 食物辨識 74% vs. 59%；熱量多在 ±10–20% | 受試者為營養系學生；需要拍照 |
| [R5] DiningBench | 2026 | 飲食領域的感知與推理 benchmark | 多個 MLLM | 中式料理營養標註 | 3,021 道菜（中式 2,086） | 最佳模型營養估算 MAPE 24.45% | 只有影像；作者指出文化偏向中式料理 |
| [R6] Open-KNEAD | 2026 | 錨定食品資料庫的營養估算 | Agentic decomposition + FNDDS 錨定 | USDA FNDDS 代碼 | 餐點影像 benchmark | 錨定可得到逐項紀錄；新一代 MLLM 直接估算已追上檢索管線 | 以美國食品代碼為主 |
| [R7] Yang et al.（ChatDiet） | 2024 | 個人化營養推薦聊天機器人 | LLM + 因果個人模型 + orchestrator | 營養成分族群模型 | 1 人 3 年穿戴裝置資料 | 推薦測試有效率 92% | n = 1；不是熱量記錄 |
| [R11] JMIR mHealth 範疇回顧 | 2026 | 熱量計數 App 的使用與持續度 | （回顧研究） | 行為體重管理 | 2013–2024 的研究 | MyFitnessPal 記錄頻率在第 4–12 週由每週 5.4 天降到 1.4 天 | 範疇回顧，沒有合併效果量 |
| [R13] Teixeira et al. | 2018 | MyFitnessPal 的相對效度 | （無；人工記錄 App） | 24 小時回憶法 | 成人 App 記錄 vs. 回憶 | 平均漏記 18% 品項；能量低估 1,863 kJ | 2018 年資料；非台灣族群 |

### 方法分類比較（A2Z 的 J. Judgement / O. Organize）

| 方法類別 | 準確度 | 使用者負擔 | 可追溯性 | 台灣在地性 | 主要缺點 |
|---------|-------|-----------|---------|-----------|---------|
| 手動資料庫 App（MyFitnessPal 等） | 中高（依使用者） | **高** | 中（使用者自建資料品質不一） | 低 | 搜尋、秤重、拆解很累 → 放棄 |
| 影像 MLLM 直接估算 [R2–R5] | 中（MAPE 24–36%） | 低 | **低** | 低到中 | 看不出份量與隱藏油脂；數字無來源 |
| 文字 LLM 直接估算 [R1] | 中 | **低** | **低** | 低 | 自然份量描述誤差大；可能有幻覺 |
| 錨定 / RAG Agent [R6][R10] | 中高 | 低到中 | **高** | 依資料庫而定 | 錨定資料庫缺台灣熟食；多半只處理單次估算 |
| **DietSense（本專題）** | 目標：中高（待驗證） | 低（最多一次追問） | **高** | **高**（台灣優先） | 需要自建料理庫；只支援文字 |

---

## N. New proposed：Existing Research → Limitations → Research Gap → Our Project

| Existing Research | Limitations | Research Gap | Our Project（DietSense） |
|-------------------|------------|--------------|-------------------------|
| LLM／MLLM 直接估營養 [R1–R5] | MAPE 24–36%；數字沒有來源 | **G1** 缺少「好用」又「可追溯」的估算方式 | LLM 只負責理解；數值錨定到資料庫並附來源 |
| 資料錨定 Agent [R6][R10] | 以美國或歐洲資料庫為主；缺台灣熟食 | **G2** 缺少台灣在地的錨定資料 | 食藥署資料庫優先 + 自建台式料理庫 |
| 現有研究多回報單一點估計 | 使用者看不出估算有多不確定 | **G3** 缺少不確定性的呈現與校準 | 熱量區間 + coverage／寬度校準 |
| 記錄 App 的持續度與誤差研究 [R11][R13] | 負擔高導致放棄；也缺安全機制 | **G4** 缺少兼顧低負擔與飲食安全的對話式流程 | 單次追問 + 安全守門（7 日規則、拒絕極低熱量） |

---

## References（已查證）

| 編號 | 文獻 | 查證狀態 |
|------|------|---------|
| R1 | Hua, A., et al. (2025). NutriBench: A dataset for evaluating large language models on nutrition estimation from meal descriptions. *ICLR 2025*. arXiv:2407.12843 | 已確認（ICLR proceedings、arXiv） |
| R2 | O'Hara, C., et al. (2025). An evaluation of ChatGPT for nutrient content estimation from meal photographs. *Nutrients*, 17(4), 607. | 已確認（MDPI、PMC11858203） |
| R3 | Fridolfsson, J., Sjöberg, E., Thiwång, M., & Pettersson, S. (2025). Performance evaluation of 3 large language models for nutritional content estimation from food images. *Current Developments in Nutrition*, 9(10), 107556. | 已確認（PMC12513282） |
| R4 | Chen, Y. J., … Wei, P. H., & Chang, J. S. (2025). Customized multimodal Diabot-GPT-4o enhances accuracy of image-based dietary assessments in dietetic trainees in Taiwan: Validation against weighed food records. *American Journal of Clinical Nutrition*, 122(6), 1836–1849. | 已確認（UMN Experts 收錄頁） |
| R5 | DiningBench: A hierarchical multi-view benchmark for perception and reasoning in the dietary domain. *ACL 2026* (long). arXiv:2604.10425 | 已確認題名與數據；**作者需補** |
| R6 | Open-KNEAD: Knowledge-grounded nutrition estimation via agentic decomposition (2026). arXiv:2607.12911 | 已確認（arXiv）；**作者需補**；預印本 |
| R7 | Yang, Z., et al. (2024). ChatDiet: Empowering personalized nutrition-oriented food recommender chatbots through an LLM-augmented framework. arXiv:2403.00781 | 已確認（arXiv） |
| R8 | Lo, F. P.-W., et al. (2024). Dietary assessment with multimodal ChatGPT: A systematic analysis. *IEEE JBHI*. arXiv:2312.08592 | 已確認 arXiv；期刊卷期需補 |
| R9 | Coburn, B., et al. (2025). Evaluating large multimodal models for nutrition analysis: A benchmark enriched with contextual metadata. arXiv:2507.07048 | 已確認（arXiv）；第一作者姓名需再核對 |
| R10 | Evaluation of LLMs in retrieving food and nutritional context for RAG systems (Slovenian food composition data) (2026). arXiv:2603.09704 | 已確認 arXiv 編號；**完整題名與作者需補** |
| R11 | Scoping review of calorie-counting apps (2013–2024). *JMIR mHealth and uHealth*, 2026, 14, e64139. | 已確認期刊、編號與數據；**題名與作者需補**（網站無法擷取） |
| R12 | Evenepoel, C., et al. (2020). Accuracy of nutrient calculations using the consumer-focused online app MyFitnessPal. *JMIR*, 22(10), e18237. | 已確認（PMC7641788） |
| R13 | Teixeira, V., Voci, S. M., Mendes-Netto, R. S., & da Silva, D. G. (2018). The relative validity of a food record using the smartphone application MyFitnessPal. *Nutrition & Dietetics*, 75(2), 219–225. | 已確認研究與數據；卷期頁碼請再核對 |
| R14 | World Health Organization (2025). Obesity and overweight [Fact sheet], updated Dec 2025. | 已確認（who.int） |
| R15 | 衛生福利部國民健康署。2017–2020 年國民營養健康狀況變遷調查。 | 已確認數據；引用時附國健署原始報告網址 |
| R16 | Zeevi, D., et al. (2015). Personalized nutrition by prediction of glycemic responses. *Cell*, 163(5), 1079–1094. | 經典文獻 |
| R17 | Mifflin, M. D., et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. *AJCN*, 51(2), 241–247. | 經典文獻 |
| R18 | Hall, K. D., et al. (2011). Quantification of the effect of energy imbalance on bodyweight. *The Lancet*, 378(9793), 826–837. | 經典文獻（期中稿誤植為 2012） |
| R19 | Poslusna, K., et al. (2009). Misreporting of energy and micronutrient intake estimated by food records and 24 hour recalls. *British Journal of Nutrition*, 101(S2), S73–S85. | 經典文獻 |
| R20 | Gardner, C. D., et al. (2018). Effect of low-fat vs low-carbohydrate diet on 12-month weight loss (DIETFITS). *JAMA*, 319(7), 667–679. | 經典文獻 |
| R21 | WHO (2025, Dec 1). WHO issues global guideline on the use of GLP-1 medicines in treating obesity [News release]. | 已確認（who.int） |
| R22 | 衛生福利部食品藥物管理署。台灣地區食品營養成分資料庫。 | 官方資料庫；使用時記錄版本 |
| R23 | U.S. Department of Agriculture. FoodData Central. https://fdc.nal.usda.gov/ | 官方資料庫 |
| R24 | Burke, L. E., Wang, J., & Sevick, M. A. (2011). Self-monitoring in weight loss: A systematic review of the literature. *J Am Diet Assoc*, 111(1), 92–102. | 經典文獻 |

## 引用修正表（期中稿 → 重構後）

| 期中稿內容 | 問題 | 處理方式 |
|-----------|------|---------|
| Teixeira et al. (2025) *Obesity Reviews* e13450，「自我記錄者減重成功率為 2 倍」 | 查不到此篇 | 刪除；改用 Burke 2011 [R24] 與 JMIR 2026 範疇回顧 [R11] |
| 「85% 用戶 30 天內放棄」（Helander et al., 2014） | Helander 2014 的主題是**自我量體重**的中斷，不是飲食 App 放棄率 | 改用 [R11]：記錄頻率在 12 週內由每週 5.4 天降到 1.4 天 |
| Cheng et al. (2024) NeurIPS Workshop，「GPT-4 估熱量 83% 準確」 | 查不到此篇 | 刪除；改用 NutriBench [R1] 與 Fridolfsson [R3] |
| Subar et al. (2015)，「自報份量誤差達 50%」 | 列出的題名其實是 2006 年 food propensity questionnaire 論文，主題不符 | 改用 Poslusna 2009 [R19] |
| Ludwig et al. (2018) *JAMA Internal Medicine* | 正文寫 JAMA IM，參考文獻寫 *Science*，兩處不一致 | 爭論一改以 DIETFITS [R20] 為主要證據 |
| Hall et al. (2012) | 年份錯誤 | 改為 2011 [R18] |
| 「Lancet 2025：全球 43% 成人過重」、「台灣過重率 47.9%」、「醫療支出 500 億」、「App 市場 68 億美元」 | 找不到可查證的原始來源 | 改用 WHO [R14][R21] 與國健署 [R15]；市場規模數字刪除 |
| Article Table [1]–[5]（沒有作者） | 無法查證 | 全部換成上表 9 篇 |
| 「USDA 900,000+ 品項」、「台灣資料庫 6,000+ 品項」 | 數字未查證 | 改成描述資料庫範圍，實際筆數在 W1 匯入時記錄 |
