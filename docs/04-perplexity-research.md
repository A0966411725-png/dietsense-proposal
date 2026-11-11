# 04 第二段：最新研究、數據與案例（Perplexity 步驟）

> 對應作業截圖第二段的三個 prompt：
> 1. 「有關下面內容主題，請查找最新研究報告數據、案例新聞，使得研究有說服力：Interesting、Innovation、Important」
> 2. 「幫我整理這份研究主題的預期貢獻與學術價值」
> 3. 「(Continue) review A to F，你想加強的部分盡量補充」
>
> **製作方式**：本文件由 Claude 用網路搜尋完成，沒有實際使用 Perplexity。每個數字都回到原始來源（期刊、PubMed、Crossref、官方報告）確認；N3 為科技媒體報導，數字由收購方提供。
> 文獻編號 R1–R29 見 [03-related-work.md](03-related-work.md)；本文件新增的來源編號為 N1–N6。

---

## 一、Interesting：為什麼這個題目有趣

| # | 證據 | 為什麼和 DietSense 有關 | 來源等級 |
|---|------|------------------------|---------|
| I-1 | 雪梨大學評估 18 個飲食 App（從 800 個中篩選）：AI 影像辨識把**越南牛肉河粉**的熱量高估 49%，把**珍珠奶茶**低估最多 76%；作者指出 App 對混合料理特別不準，而這正是多數亞洲料理的型態 [N1] | 珍奶、湯麵、燴飯是台灣日常飲食，現有 App 在這裡誤差最大，也是 DietSense 要補的地方 | 期刊論文 |
| I-2 | 美國 NIDDK 研究團隊在 NUTRITION 2026 發表：在代謝廚房秤重到 0.1 公克的 102 份餐點上，MyFitnessPal、Lose It!、Cal AI、Appediet 四個拍照 App **平均每餐少算 250–345 kcal、脂肪少算約 30 公克**，大約低估三分之一 [N2] | 「拍照就好」並不等於準；看不見的油脂與份量是主要誤差。DietSense 選擇讓使用者用語言補充（「湯喝一半」、「多加辣油」） | 研討會摘要（尚未經完整同儕審查）＋新聞 |
| I-3 | 中式料理 benchmark DiningBench（ACL 2026）收錄 2,086 道中式料理，表現最好的模型營養估算 MAPE 仍有 24.45% [R5] | 即使是最新的模型，中式料理也還沒有被解決 | 頂會論文 |

## 二、Innovation：為什麼現在做、新在哪裡

| # | 證據 | 對 DietSense 的意義 | 來源等級 |
|---|------|--------------------|---------|
| V-1 | 台灣團隊在 AJCN（2025）發表：加入台灣食物知識的客製化 Diabot-GPT-4o，只用影像的食物辨識率為 74%，未客製化的 GPT-4o 為 59% [R4] | **在地知識確實有用**，支持「台灣資料優先」的設計 | 頂級期刊 |
| V-2 | Open-KNEAD（2026）把餐點拆成單項，再錨定到 USDA 食品代碼；作者也發現新一代 MLLM 直接估算已追上檢索管線 [R6] | 「Agent + 資料錨定」是 2026 年的新方向；但也提醒我們必須和純 LLM 正面比較 | 預印本 |
| V-3 | 斯洛維尼亞團隊（2026）把國家食品成分資料庫接上 RAG，評估 4 個 LLM 的檢索能力 [R10] | 「國家資料庫 + LLM」已有歐洲先例，但台灣還沒有 | 預印本 |
| V-4 | MyFitnessPal 於 2026 年 3 月 2 日宣布收購拍照記熱量的 Cal AI；依 MyFitnessPal 提供的數字，Cal AI 兩年內安裝數超過 1,500 萬、年營收超過 3,000 萬美元；交易已於 2025 年 12 月完成，金額未公開 [N3] | 市場已證明「低負擔記錄」有強烈需求；但 I-2 顯示準確度還跟不上 | 科技媒體報導（數字由收購方提供，非稽核數字） |

## 三、Important：為什麼重要

| # | 證據 | 來源等級 |
|---|------|---------|
| P-1 | WHO：2022 年全球 25 億成人過重，其中逾 8.9 億人肥胖；肥胖盛行率 1990–2022 年間增加超過一倍 [R14]；2025 年 12 月 WHO 發布首份 GLP-1 用藥指引，指出全球肥胖人口已超過 10 億 [R21] | 官方 |
| P-2 | 台灣 2017–2020 年國民營養調查：成人男性過重 30.31%、肥胖 28.12%；女性過重 22.98%、肥胖 19.57% [R15] | 官方（已讀取原始附件） |
| P-3 | 國民營養健康狀況變遷調查（106–109 年）成果報告表 3.9.1（n = 9,954）：19 歲以上成人有 **68.0%** 每週外食 7 次以上（平均每天至少一餐），只有 11.4% 完全不外食；19–44 歲成人每週外食 7 次以上達 **83.7%** [N4] | 官方報告（已讀取原始 PDF） |
| P-4 | 熱量 App 的記錄頻率在第 4 到 12 週間由每週 5.4 天降到 1.4 天 [R11]；即使有記錄，使用者也平均漏記約 18% 的品項 [R13] | 期刊論文 |
| P-5 | Bilen 等人（2026，*Frontiers in Nutrition*）讓 ChatGPT-4o、Gemini 2.5 Pro、Claude 4.1、Bing Chat、Perplexity 替 4 位虛構的過重／肥胖 15 歲青少年排三天菜單：AI 菜單平均每天比營養師的菜單少約 **695 kcal**，碳水偏低、蛋白質與脂肪偏高 [N5] | 期刊論文（書目經 Science News 報導核對；樣本為 4 個虛構個案，提示詞為土耳其文） |
| P-6 | 台灣 30 位營養師評估 ChatGPT 給大學生的飲食建議：242 則回饋中，最常見的疑慮（52 次）是資訊不夠周延或嚴謹，容易造成誤解或誤用 [N6] | 期刊論文 |

**一句話總結**：問題很大（P-1～P-3）、現有工具在台灣常見食物上最不準（I-1～I-3）、而 AI 工具也可能帶來安全風險（P-5、P-6）。DietSense 的「在地資料錨定 + 區間 + 安全守門」剛好對準這三點。

---

## 四、預期貢獻與學術價值

### 預期貢獻（交付什麼）

1. **系統**：第一個以繁體中文、台灣外食情境為對象的對話式熱量 Domain AI Agent，每個營養數值都能追溯到資料來源。
2. **資料**：500 筆台式料理自然語言描述標註集，包含參考熱量、份量重量與來源；可作為後續中文營養 NLP 研究的 benchmark。
3. **方法**：一套「LLM 理解 + 資料庫錨定 + 確定性計算 + 區間校準」的設計模式，可套用到其他需要數值正確性的 Domain Agent（例如藥物劑量、碳排計算）。
4. **評估框架**：同時量測準確度、不確定性校準（coverage 與寬度）、使用負擔（記錄秒數、追問率）、可用性（SUS）與安全性（攔截率、誤報率）。

### 學術價值（為什麼值得發表）

| 面向 | 價值 | 對應的研究缺口 |
|------|------|--------------|
| 在地化 | 現有 benchmark 以西式或中國料理為主 [R1][R5]，台灣小吃與飲料（珍奶誤差最多 76% [N1]）仍缺少系統性評估 | G2 |
| 可信度 | 回答「資料錨定是否仍比新一代 LLM 直接估算好」這個 2026 年仍有爭議的問題 [R6] | G1 |
| 不確定性 | 多數研究只回報點估計；本研究把「區間是否校準」列為主要指標 | G3 |
| 安全 | 把飲食失調風險當作系統需求並可量測，而不是事後附註 [N5] | G4 |
| 人因 | 量化「追問次數 vs. 準確度 vs. 放棄」的取捨（Trade-off T1） | G4 |

---

## 五、A–F 補強建議（review A to F）

| 段落 | 原本 | 建議補強 | 已套用到 |
|------|------|---------|---------|
| **A. Attention** | WHO + 國健署數據 | 加一句「台灣成人 68% 平均每天至少外食一餐」[N4]；用 Cal AI 被收購的案例說明市場需求 [N3] | 01 摘要 A、02 Introduction A／B；Cal AI 放在 02 Background 與簡報 |
| **B. But** | 持續度下降、LLM MAPE 約 36% | 加入 NIDDK 2026「拍照 App 每餐少算 250–345 kcal」[N2] 與雪梨大學「珍奶低估最多 76%」[N1]，讓挑戰更貼近台灣 | 01 摘要 B、02 Introduction C/D |
| **C. Cure** | DietSense 對話式 Agent | 明確點出「讓使用者用語言補充照片看不到的資訊（油、湯、份量）」 | 01 摘要 C |
| **D. Development** | LLM + RAG + 公式 + 區間 + 安全 | 補一句「以台灣在地知識客製化可提升辨識」的證據 [R4] | 02 Introduction E |
| **（摘要字數）** | — | 加入 B 的新證據後，約 500 字摘要只改寫一句，避免超出字數 | 01 摘要 |
| **E. Experiments** | 500 筆標註集、兩種基準 | 標註集**必須包含**珍奶、湯麵、燴飯等高誤差類別，並單獨回報各類別誤差；另外加入「商業拍照 App」作為第三個參考基準（若時間允許） | design.md、agent-evaluation spec |
| **F. Findings** | 預期目標 | 補上預期的**學術**產出（台式料理 benchmark、區間校準結果），不只是系統指標 | 01 摘要 F |

---

## 新增來源（N1–N6）

| 編號 | 來源 | 等級 |
|------|------|------|
| N1 | Li, X., Yin, A., Choi, H. Y., Chan, V., Allman-Farinelli, M., & Chen, J. (2024). Evaluating the quality and comparative validity of manual food logging and artificial intelligence-enabled food image recognition in apps for nutrition care. *Nutrients*, 16(15), 2573. https://doi.org/10.3390/nu16152573 ；雪梨大學新聞稿（2024-08-29） | 期刊論文（Crossref 已確認） |
| N2 | Hengist, A., et al. (2026). 拍照熱量 App 準確度研究，發表於 American Society for Nutrition 年會 NUTRITION 2026；ScienceDaily（2026-07-26）、Newsweek、HealthDay（2026-07-27）報導 | 研討會摘要，尚未經完整同儕審查；第一作者以正式摘要為準 |
| N3 | Bort, J. (2026, March 2). MyFitnessPal has acquired Cal AI, the viral calorie app built by teens. *TechCrunch*. https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens | 科技媒體；營收與下載數由 MyFitnessPal 提供 |
| N4 | 潘文涵（計畫主持人）。國民營養健康狀況變遷調查（106–109 年）成果報告。衛生福利部國民健康署委託研究計畫。第三章第九節「國人外食情形」，表 3.9.1，頁 162–163。https://www.hpa.gov.tw/Pages/ashx/GetFile.ashx?lang=c&type=1&sid=dbeb2e2da047472f9a8dd816d0b021ac | 官方報告（已讀取原始 PDF；68.0% = 34.8 + 27.2 + 6.0） |
| N5 | Bilen, A. B., Kalkan, G. E., & Yılmaz Önal, H. Y. (2026). Artificial intelligence diet plans underestimate nutrient intake compared to dietitians in adolescents. *Frontiers in Nutrition*, 13, 1765598. https://doi.org/10.3389/fnut.2026.1765598 | 期刊論文（Crossref 已確認） |
| N6 | Liao, L.-L., Chang, L.-C., & Lai, I.-J. (2024). Assessing the quality of ChatGPT's dietary advice for college students from dietitians' perspectives. *Nutrients*, 16(12), 1939. https://doi.org/10.3390/nu16121939 | 期刊論文（PubMed 38931294 已確認） |
