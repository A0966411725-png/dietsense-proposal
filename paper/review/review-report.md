# DietSense IEEE 會議論文 v1 草稿審查報告

| 項目 | 內容 |
|------|------|
| 審查者 | ieee-paper-reviewer agent（`.claude/agents/ieee-paper-reviewer.md`） |
| 審查對象 | `paper/v1-draft/main.tex`、`paper/v1-draft/references.bib`；版面以 `paper/pdf/DietSense_IEEE_v1_draft.pdf`（3 頁）核對 |
| 審查日期 | 2026-11-25 |
| 依據（權威順序） | ① `openspec/changes/add-dietsense-agent/design.md` 與 `specs/`；② `docs/03-related-work.md`（R1–R29、引用修正表）、`docs/04-perplexity-research.md`（N1–N6）、`docs/06-deep-research.md`；③ 網路原始來源：Crossref API、PubMed E-utilities、WHO 官網、衛福部新聞稿（經搜尋）、USDA FoodData Central 公開 API |
| 說明 | 本稿刻意保留期中 Proposal 的原文，報告只指出錯誤與修正方向，不改寫論文。編譯紀錄中的 XeTeX 字型警告（`TU/ptm` undefined）是本機編譯工具造成的，不列為論文問題。Fig. 1 的行號以 PDF 上印出的號碼為準（第一欄 1–26、第二欄從 26 重新起算）。審查後，v1 開頭加入 11 行字型設定（只讓本機編譯改用 Times 類字型，不改任何內容，字型警告也因此消除），本報告引用的 main.tex 行號已同步調整；Fig. 1 的行號不受影響。 |

---

## 一、摘要統計

### 依嚴重度

| 嚴重度 | 件數 |
|--------|------|
| Critical | 5 |
| Major | 33 |
| Minor | 10 |
| **合計** | **48** |

### 依檢查類別

| # | 類別 | Critical | Major | Minor | 小計 |
|---|------|---------|-------|-------|------|
| 1 | A–F 摘要結構 | 0 | 0 | 2 | 2 |
| 2 | 引用可查證性 | 1 | 7 | 2 | 10 |
| 3 | 數字與來源一致性 | 0 | 12 | 0 | 12 |
| 4 | 演算法與流程邏輯 | 3 | 9 | 1 | 13 |
| 5 | 超出證據的宣稱 | 1 | 5 | 1 | 7 |
| 6 | IEEE 格式 | 0 | 0 | 4 | 4 |
| | **合計** | **5** | **33** | **10** | **48** |

### 最優先處理的五項

1. **E25**：`safety_check` 用當日累計 < 1,200 kcal 判斷，早餐後、甚至當天第一則訊息（日誌為空，累計 0）就會回傳 DANGER。
2. **E27**：`rec` 只在 `recommend` 分支定義，`log_food`、`analyze` 執行到第 33 行一定出錯；`recommend` 分支又用到只在 `analyze` 定義的 `tdee`、`macro_ratio`。
3. **E38**：摘要 F 把尚未執行的目標值（±20% 命中率 > 85%、時間減少 60%、SUS > 70、「顯著較好」）寫成研究發現。
4. **E03**：摘要唯一的引用 Teixeira 2025 不存在；`Obesity Reviews` 的 e13450 其實是 2022 年一篇腎絲球病變的論文。
5. **E26**：`safety_check` 回傳的 `"WARNING"`（暴食-節食模式）在第 31 行完全不會被處理，這條安全規則永遠不會觸發。

---

## 二、問題清單

| ID | 類別 | 嚴重度 | 位置 | 問題 | 證據 | 建議修正 | v2 處理 |
|----|------|--------|------|------|------|---------|---------|
| E01 | 1 A–F 摘要 | Minor | Abstract（main.tex 第 38–43 行） | 摘要裡直接寫出「A. Attention Getter.」「B. But.」等課堂標籤，還放了引用 `[1]`；C 只有一句系統名稱，沒有說明方法；D、E 是名詞清單，不是完整句子。字數約 240–245 字（含標籤），落在 150–250 字內，但已接近上限。 | IEEE 摘要要求單段、自足、不含引用；A–F 應該是內容順序，不是印出來的標題。PDF 第 1 頁可以看到標籤和 `[1]` 印在摘要裡。 | 刪除 A–F 標籤與引用，改成依 A→F 順序連貫的完整句子；C 用一句話說明「LLM 只負責理解、數值錨定到資料庫並附區間」。 | 已修正：Abstract 改為單一段落 250 字，依 A→F 順序，無標籤與引用 |
| E02 | 1 A–F 摘要 | Minor | 摘要之後 | 沒有 Index Terms。 | main.tex 中找不到 `IEEEkeywords` 環境；PDF 第 1 頁摘要後直接進入 I. Introduction。 | 在摘要後加上 `\begin{IEEEkeywords}`，關鍵詞依字母排序（例如 Calorie estimation, Conversational agent, Dietary assessment, Large language models, Retrieval-augmented generation, Uncertainty quantification）。 | 已修正：加入 Index Terms（6 個，依字母排序） |
| E03 | 2 引用 | Critical | Abstract A；references.bib `teixeira2025` | 摘要的核心論點「持續記錄者達成目標的機率是 2 倍」引用 Teixeira et al. 2025, *Obesity Reviews* 26(1) e13450，但這篇不存在。 | Crossref `10.1111/obr.13450` 實際是 Martínez-Montoro et al., “Obesity-related glomerulopathy: Current approaches and future perspectives,” *Obesity Reviews* 23(7), 2022。以 Crossref 搜尋 Obesity Reviews 2025 年的 self-monitoring meta-analysis 也找不到 Teixeira 為作者的文章。docs/03 引用修正表也記錄「查不到此篇」。 | 刪除此引用與「2 倍」的說法；改用 Burke et al. 2011 [R24]（自我記錄與減重一致相關，但證據等級偏弱）與 Dugas et al. 2026 [R11]。 | 已移除：改引 Burke 2011 [burke2011] 與 Dugas 2026 [dugas2026]（I 節第 2 段） |
| E04 | 2 引用 | Major | I-C Problem「85% of users give up within 30 days [2]」；bib `helander2014` | 書目存在，但內容不支持引用的數字。 | PubMed 25397613（Helander et al., *PLoS ONE* 9(11) e113164, 2014）摘要：研究 40 人、2,838 筆**自我量體重**紀錄，發現中斷超過一個月與體重增加有關。摘要中沒有飲食 App 放棄率，也沒有 85% 或 30 天。docs/03 修正表結論相同。 | 改用 [R11]：MyFitnessPal 記錄頻率在第 4–12 週由每週 5.4 天降到 1.4 天；若保留 Helander，只能用來說明「記錄中斷與體重回升有關」。 | 已修正：改用 Dugas 2026 的 5.4→1.4 天／週（I 節第 2 段） |
| E05 | 2 引用 | Major | III Deep Research「Hall et al. (2012, AJCN) … metabolic-ward experiments [3]」；bib `hall2012` | 年份、期刊與研究類型都不對：正文寫 2012 年 AJCN 的代謝病房實驗，書目卻是 *Lancet* 的模型論文，年份又寫成 2012。 | Crossref `10.1016/S0140-6736(11)60812-X`：Hall, Sacks, Chandramohan…，“Quantification of the effect of energy imbalance on bodyweight,” *The Lancet* 378, 826–837，**2011 年 8 月**，是動態數學模型，不是代謝病房實驗。Hall 另有一篇 2012 年 AJCN 論文（Crossref `10.3945/ajcn.112.036350`，“Energy balance and its components,” 95(4) 989–994），但那是回顧文章，也不是代謝病房實驗。docs/06 修正表也記錄了這個問題。 | 書目年份改為 2011；正文改寫為「動態模型指出體重變化需考慮代謝適應 [R18]」；如需代謝病房證據，改引 Hall et al. 2016 AJCN [R26]。 | 已修正：Hall 2011 *Lancet* 動態模型；代謝病房改引 Hall 2016 AJCN（II-B） |
| E06 | 2 引用 | Major | III Debate 2「GPT-4 reached 83% accuracy [7]」；bib `cheng2024` | 引用的研討會論文查不到，書目也只有一位作者，沒有頁碼、URL 或 arXiv ID。 | 用完整題名搜尋網路與 Crossref，只找到 NutriBench（arXiv 2407.12843）等不同論文，沒有這個題名，也沒有 NeurIPS 2024 workshop 的紀錄；PubMed 以 Cheng[au] + LLM + calorie 搜尋，0 筆。docs/03 修正表記錄「查不到此篇」。 | 刪除；改用 NutriBench [R1]（GPT-4o + CoT 碳水準確率約 66.8%）與 Fridolfsson 2025 [R3]（照片熱量 MAPE 約 35.8%）。 | 已移除：改用 NutriBench [hua2025] 與 Fridolfsson 2025（II-A） |
| E07 | 2 引用 | Major | III Debate 2「self-reported portions have a 50% average error [8]」；bib `subar2015` | 書目的題名是 2006 年的論文，年份卻寫 2015，期刊名也用了 2012 年改名後的名稱；論文主題（Food Propensity Questionnaire）也不支持「份量誤差 50%」。 | Crossref `10.1016/j.jada.2006.07.002`：Subar, Dodd, Guenther…，*Journal of the American Dietetic Association* 106(10), 1556–1563，**2006 年 10 月**。卷期頁和 bib 相同，所以 2015 年與新期刊名都是錯的。docs/03 修正表結論相同。 | 刪除「50%」的說法；改用 Poslusna 2009 [R19] 的原文數字（見 E22）。 | 已移除：改用 Poslusna 2009 原文數字（II-B） |
| E08 | 2 引用 | Major | III Debate 1「Ludwig et al. (2018, JAMA Internal Medicine) reported metabolic advantages…[6]」；bib `ludwig2018` | 正文寫 JAMA IM，書目卻是 *Science*；而且兩篇都不是「報告低碳飲食有代謝優勢」的實證研究。 | PubMed 30442800：Ludwig, Willett, Volek, Neuhouser, “Dietary fat: From foe to friend?” *Science* 362(6416) 764–770, 2018，摘要說明這是由立場不同的學者共同撰寫、整理共識與爭議的**回顧文章**。Crossref 另有 Ludwig & Ebbeling, “The Carbohydrate-Insulin Model of Obesity,” *JAMA Intern Med* 178(8) 1098, 2018（`10.1001/jamainternmed.2018.2933`），屬於觀點文章。 | 統一成一篇正確的出處；爭論一的正反證據改用 Ebbeling 2018 *BMJ* [R25] 對照 Hall 2016 [R26] 與 DIETFITS [R20]。 | 已移除：飲食組成改以 Hall 2016 與 DIETFITS [gardner2018] 說明（II-B） |
| E09 | 2 引用 | Major | Table I Article Summary（[1]–[5]） | 表中 5 篇文獻沒有作者、題名或出處，無法查證；而且表格的 [1]–[5] 和參考文獻的 [1]–[5]（Teixeira、Helander、Hall、Poslusna、Zeevi）編號相同，讀者會以為 Table I 的 [1] 就是 Teixeira。 | PDF 第 2 頁 Table I 與 References 對照：Table I [3] 寫「LLaMA-3 FT, 2025」，但參考文獻 [3] 是 Hall 2011 的能量平衡模型。表中數字（82%、Top-5 89%、−43%、3×、76%）都沒有可追溯的來源。docs/03 修正表記錄「無法查證，全部更換」。 | 換成 docs/03 已查證的 14 篇（R1–R7、R10–R13、R19、R20、R24），每篇都用 `\cite` 引用，讓表格編號和參考文獻一致。 | 已修正：Table I 換成 9 篇已查證文獻，全部以 \cite 編號（跨欄 table*） |
| E10 | 2 引用 | Major | I-B「Van Horn et al. (2024) … 3.3 kg」；III「Koenders & van Strien, 2011」 | 正文用作者年份引用，但 references.bib 沒有這兩筆書目，所以不會出現在參考文獻中；Van Horn 2024 也查不到。 | PubMed 以 `Van Horn[au] AND 2024[dp] AND (self-monitoring OR food record* OR dietary record*)` 搜尋：0 筆。網路搜尋只找到 Raber et al. 2021（*Public Health Nutrition*）與 Burke 2011，都沒有 3.3 kg 這個數字。**未能查證**。Koenders 確實存在（Crossref `10.1097/JOM.0b013e31823078a2`，*JOEM* 53(11) 1287–1293, 2011），但沒有列入 bib，數字問題見 E24。 | 刪除 Van Horn 與 3.3 kg，或找到原文後再補書目；Koenders 補進 bib 並改用 `\cite`。 | 已移除：Van Horn 與 Koenders 不再引用 |
| E11 | 2 引用 | Minor | references.bib `hpa2025`、`who2025` | 這兩筆書目從未被 `\cite` 引用，所以不會印在參考文獻中；反過來，摘要與引言的 WHO、國健署數字在正文中都沒有引用。 | main.tex 只有 8 個 `\cite`，都不是 `hpa2025` 或 `who2025`；PDF 參考文獻只有 [1]–[8]。`hpa2025` 的題名是「2024 National Health Interview Survey Report」，正文卻寫「2025 National Health Survey」與「2024 HPA data」，年份不一致。 | 為每個公衛數字加上 `\cite`，改用 [R14][R21]（WHO）與 [R15]（國健署）的實際文件與年份。 | 已修正：每個公衛數字都有 \cite（WHO [who_fact]、國健署 [hpa_prev][nahsit_report]） |
| E12 | 2 引用 | Minor | references.bib 全部 | 所有書目都沒有 DOI；`poslusna2009` 的題名被截斷；正文混用作者年份與 IEEE 數字引用。 | Crossref 已確認的 DOI：Hall `10.1016/S0140-6736(11)60812-X`、Zeevi `10.1016/j.cell.2015.11.001`、Poslusna `10.1017/S0007114509990602`、Helander `10.1371/journal.pone.0113164`、Ludwig（Science）`10.1126/science.aau2096`、Subar（2006）`10.1016/j.jada.2006.07.002`。Poslusna 的完整題名結尾還有「…, control and adjustment methods in practice」（PubMed 19594967）。 | 補上 DOI 欄位與完整題名；正文一律用 `\cite{}`，不要寫「Hall et al. (2012, …)」。 | 已修正：期刊文獻附 DOI，預印本附 arXiv 編號；正文一律用 \cite |
| E13 | 3 數字 | Major | Abstract A「diet-related chronic diseases … account for 74% of global deaths」 | 數字張冠李戴：74%／75% 是 WHO 對**所有非傳染病（NCD）**的統計，不是「飲食相關慢性病」。 | WHO NCD fact sheet（頁面日期 2025-09-25）：NCD 在 2021 年造成至少 4,300 萬人死亡，相當於全球非疫情相關死亡的 75%；不健康飲食只是列出的幾個行為風險因子之一，頁面沒有把這個比例歸給飲食。74% 是 WHO 較早版本對 NCD 整體的數字（本次未取得舊版頁面，未能逐字核對）。 | 改寫為「NCD 占全球非疫情死亡約 75%，不健康飲食是主要可改變的風險因子之一」並引用 WHO；或直接刪除，改用 [R14][R21] 的肥胖數字。 | 已移除：不再使用 74% 的說法 |
| E14 | 3 數字 | Major | I-A「A 2025 study in The Lancet reported that 43% of adults worldwide are overweight or obese」 | 數字本身有來源，但出處錯了：43% 是 WHO／NCD-RisC 的 2022 年數據，不是 2025 年 Lancet 的研究。 | WHO 2024-03-01 新聞稿〈One in eight people are now living with obesity〉與舊版 WHO fact sheet：2022 年 18 歲以上成人 43% 過重（25 億人），資料來自 2024 年 3 月發表於 Lancet 的 NCD-RisC 研究。2025 年 Lancet 的 GBD 2021 Adult BMI 研究只報告人數（2021 年約 21.1 億成人過重或肥胖）。另外，目前的 WHO fact sheet（頁面日期 2026-10-07）已更新為 2024 年 45%（26 億人）。docs/03 也列為「找不到可查證的原始來源」。 | 改成「WHO：2022 年全球 43% 成人過重」並引用 WHO fact sheet [R14]，或採用最新版的 2024 年 45%，同時註明資料年份；「diet is the main modifiable risk factor」需要另外引用，否則刪除。 | 已修正：改用 WHO fact sheet（2026-10-07 版）的 2024 年資料：26 億成人過重（45%）、9.4 億肥胖（I 節第 1 段） |
| E15 | 3 數字 | Major | Abstract A「Taiwan's 2025 National Health Survey shows 47.9% … NT$50 billion」 | 47.9% 與新台幣 500 億都找不到原始來源；調查名稱與年份也和 bib（2024 report）、引言（2024 HPA data）不一致。 | docs/03 引用修正表：「台灣過重率 47.9%」「醫療支出 500 億」找不到可查證的原始來源。已查證的官方數字是 [R15]：2017–2020 年國民營養調查，成人男性過重 30.31%、肥胖 28.12%，女性過重 22.98%、肥胖 19.57%。 | 改用 [R15] 的四個數字並註明調查年份與 BMI 定義；刪除新台幣 500 億，除非能找到國健署原始文件。 | 已修正：改用 2017–2020 國民營養調查，男 58.4%、女 42.6%；刪除新台幣 500 億 |
| E16 | 3 數字 | Major | I-A「more than one in four adults has metabolic syndrome … NT$300 billion」 | 「四分之一」大致正確，但年份與年齡範圍標錯；「新台幣 3,000 億」**未能查證**。整句都沒有引用。 | 經搜尋找到的衛福部新聞稿：依 2017–2020 年國民營養健康調查，**20–64 歲**代謝症候群盛行率 24.8%，約每 4 人有 1 人；另一份新聞稿說 20 歲以上「每 10 人有近 3 人」。這兩者都不是「2024 年資料」。以「代謝症候群 醫療支出 生產力損失 3000億」搜尋，沒有找到這個數字。 | 寫成「20–64 歲成人約 24.8%（2017–2020 NAHSIT）」並引用衛福部新聞稿；新台幣 3,000 億在找到原始出處前刪除。 | 已移除：代謝症候群與新台幣 3,000 億不再使用 |
| E17 | 3 數字 | Major | I-A「US$6.8 billion in 2025, growing 17.4% per year」 | 市場規模與年成長率沒有來源，**未能查證**。 | docs/03 引用修正表：「App 市場 68 億美元」找不到可查證來源，已決定刪除。這類數字通常來自付費市場報告，不同機構的數字差距很大。 | 刪除；若要說明市場需求，改用 N3（MyFitnessPal 收購 Cal AI，並註明數字由收購方提供）。 | 已移除：市場規模不再使用 |
| E18 | 3 數字 | Major | Abstract A「only 15% of people keep tracking for more than 30 days」 | 沒有引用，**未能查證**；它和 I-C 的「85% 在 30 天內放棄」互為補數，而後者的引用不支持這個數字（E04）。 | 摘要中沒有 `\cite`；repo 中已查證的持續度數據只有 [R11] 的 5.4 → 1.4 天／週。 | 刪除；改用 [R11] 的持續度數據。 | 已移除：改用 Dugas 2026 的持續度數據 |
| E19 | 3 數字 | Major | I-D「MyFitnessPal has a high database error rate (about 30%)」 | 沒有引用，**未能查證**，而且和已查證的研究方向相反。 | 網路搜尋找不到報告 MyFitnessPal 資料庫錯誤率約 30% 的同儕審查研究（相關數字多來自競品部落格）。已查證的 [R12] Evenepoel 2020（*JMIR*）以比利時 Nubel 資料庫比對，能量相關係數 r = 0.96；[R13] Chen 2019 的問題是使用者漏記 18% 的品項，不是資料庫錯誤率。 | 改為「使用者自建資料品質不一，且使用者平均漏記約 18% 的品項 [R13]」，並註明 [R12] 能量相關性良好。 | 已修正：改寫為 MyFitnessPal 能量相關性 r = 0.96 [evenepoel2020]，但使用者漏記約 18% [chen2019]（II-B） |
| E20 | 3 數字 | Major | Abstract E、IV-A(4)、V「USDA FoodData Central (900,000+ items)」 | 數字和 USDA 官方 API 不符。 | 2026-11-25 呼叫 FDC 公開 API `/foods/search?query=*`：totalHits = 447,851（Branded 434,090、SR Legacy 7,793、FNDDS 5,428、Foundation 424、Experimental 116）。900,000+ 的來源不明（可能把品牌食品的歷史版本也算進去）。docs/03 也列為未查證。 | 不寫固定筆數，改成描述涵蓋的資料類型；實際筆數在 W1 匯入時記錄並註明查詢日期。 | 已修正：不寫固定筆數，只描述涵蓋範圍（II-B、III-A ④） |
| E21 | 3 數字 | Major | IV-A(4)「Taiwan food composition database (6,000+ Taiwanese foods)」 | 筆數**未能查證**；而且把資料庫描述成「台灣料理」也不對，它主要收錄原料與初級加工食品。 | data.gov.tw 資料集 8543 頁面沒有列出總筆數（搜尋結果）。design.md ④ 與 [R22]：食藥署資料庫「以原料與初級加工食品為主」，熟食料理很少，因此才需要自建台式料理庫。docs/03 修正表：「台灣資料庫 6,000+ 品項」未查證。 | 改成「食藥署食品營養成分資料庫（原料與初級加工食品）＋自建台式料理庫」，筆數在匯入時記錄。 | 已修正：描述為原料與初級加工食品，熟食由自建台式料理庫補足（II-B、III-A ④） |
| E22 | 3 數字 | Major | III「Self-reported intake is underestimated by 18–54% on average [4]」 | 引用的來源存在，但數字和原文不符。 | PubMed 19594967 摘要（Poslusna et al., *Br J Nutr* 101 Suppl 2, S73–S85, 2009）：回顧 37 篇研究，「低報者約占 30%，能量攝取約低估 15%」。摘要中沒有 18–54%。docs/06 修正表結論相同。 | 改為「約 30% 的受試者低報，能量平均約低估 15% [R19]」。 | 已修正：約 30% 低報者、能量約低估 15%（II-B、Table I） |
| E23 | 3 數字 | Major | III「Glycemic responses … differ up to tenfold [5]」；Debate 3「Personalised advice outperforms general advice [5]」 | 「十倍」**未能查證**；Debate 3 也把 Zeevi 的發現過度推廣。 | PubMed 26590418 摘要（Zeevi et al., *Cell* 163(5) 1079–1094, 2015）：800 人、46,898 餐，發現同一餐點引起的反應「差異很大」（high variability），摘要中沒有「十倍」或其他倍數；網路搜尋也沒有找到原文的倍數說法（本次沒有讀全文）。這篇的介入結果只限於**餐後血糖反應**，不是「個人化建議全面優於一般建議」。PubMed 也列出 *Eur J Clin Nutr* 2016 的評論，質疑大部分變異來自個人內部。 | 改成「同一餐點的餐後血糖反應在個體間差異很大 [R16]」；Debate 3 限定在餐後血糖，並補上 Bilen 2026 [N5] 作為個人化風險的證據。 | 已修正：改為「個體間餐後血糖反應差異很大」，並說明這類個人化不在範圍內（II-B） |
| E24 | 3 數字 | Major | III「35% of eating behaviour is related to emotion or environmental stress (Koenders & van Strien, 2011)」 | 原文沒有 35% 這個數字。 | docs/06 修正表：Koenders 原文沒有 35%。原文（*JOEM* 53(11), 2011）的結論是：在 1,562 位員工中，情緒性進食（而不是生活型態行為）是體重增加的預測因子。 | 改寫為原文的結論 [R27]，不要寫百分比。 | 已移除：不再引用 35% |
| E25 | 4 演算法 | Critical | Fig. 1 第 30–31、40–43 行；IV-A(6)；IV-B | 安全檢查用「當日累計 < 1,200 kcal」判斷，只吃了早餐就會觸發 DANGER；當天第一則訊息時日誌還是空的（累計 0），連「查詢營養」也會被當成危險。觸發後只回傳警示，使用者也看不到剛記錄的熱量。 | 手動追蹤：第 30 行對每種意圖都呼叫 `safety_check(D, P)`；第 41 行 `daily_total = sum(e.kcal_point for e in D.entries)`；早餐 350 kcal → 350 < 1200 → 第 43 行回傳 `"DANGER"` → 第 32 行只回傳警示。這違反 `specs/dietary-safety-guard`「早餐後不誤判」與「只以完整日或 7 日平均判斷」，design.md Context 第 1 點也記錄了這個問題。 | 改成以完整日（使用者確認，或隔日 04:00 結算）或近 7 日平均判斷；尚未結算的當日不判斷攝取過低。對應 design.md Algorithm 1 第 16–18 行的 `compute_daily_state` 與 `safety_check(D, H, P, S, request)`。 | 已修正：只在當日結算（使用者確認或隔日 04:00）或 7 日平均判斷（III-D；Algorithm 1 第 17 行） |
| E26 | 4 演算法 | Critical | Fig. 1 第 31、44–45 行 | 偵測到暴食-節食模式時回傳 `"WARNING"`，但呼叫端只檢查 `"DANGER"`，所以 WARNING 會被直接忽略，這條安全規則永遠不會出現在回應中。此外，同一個 `D` 一邊被當成「當日日誌」來加總（第 41 行），一邊又被拿去分析 7 日模式（第 44 行），兩種用法互相矛盾。 | 第 31 行 `if flag == "DANGER":`，沒有處理 WARNING 的分支，WARNING 會直接走到第 33 行的一般回應，甚至可能附上減量建議。`specs/dietary-safety-guard` 要求偵測到交替模式時「提供溫和提示與支援資源，不給額外的減量建議」；design.md 的 `safety_check` 另外傳入 7 日歷史 `H`。 | 改成 `if risk != OK` 統一處理所有風險等級；把當日日誌 `D` 和 7 日歷史 `H` 分開傳入。 | 已修正：第 18 行改為 r ≠ OK 統一處理所有風險；7 日歷史 H 與當日日誌 D 分開傳入 |
| E27 | 4 演算法 | Critical | Fig. 1 第 29、33 行 | 有些分支會用到未定義的變數：(a) `rec` 只在 `recommend` 分支賦值，`log_food`、`analyze` 走到第 33 行 `format_response(intent, D, rec)` 時一定出錯；(b) `recommend` 分支第 29 行用到 `tdee`、`macro_ratio`，但它們只在 `analyze` 分支（第 24、26 行）計算。 | 手動追蹤：intent = `log_food` → 第 4–21 行 → 第 30 行 → 若沒有 DANGER → 第 33 行讀取 `rec`，Python 會丟出 `UnboundLocalError`。intent = `recommend` → 第 29 行讀取 `tdee` → 同樣出錯。換句話說，只要不觸發 DANGER，**每一種意圖都會出錯**。design.md Context 第 2 點記錄了這個問題，並改用共用的 `compute_daily_state()`。 | 在分支之前先呼叫 `S = compute_daily_state(D, P)`；`rec` 預設為空值，只有 `analyze`／`recommend` 才產生（design.md 第 16、19 行）。 | 已修正：第 16 行先計算 DailyState；第 19 行 rec 只在 analyze／recommend 產生，其餘為空值 |
| E28 | 4 演算法 | Major | Fig. 1 第 11–16 行；IV-B | 追問一次後，若信心仍低於 0.80，程式沒有任何處理：沒有標示低信心、沒有 τ_low = 0.50 的降級（食材拆解、標示「近似估算」），也沒有 `asked` 旗標；使用者回答「不知道」，或重新查詢的結果是空的時，`best` 可能是 None，第 18 行 `best.kcal_per_100g` 就會出錯。 | 第 15–16 行重新排序後直接進入第 17 行，沒有再檢查 `conf`。`specs/conversational-food-logging`「使用者略過追問 → 仍記錄並標示低信心、加寬區間」；`specs/nutrient-retrieval`「追問後信心仍 < 0.50 → 食材拆解，標示近似估算」；design.md 第 9–11 行。 | 依 design.md：`if c < τ and not e.asked` 才追問；追問後 `c < τ_low` 就用食材拆解並設 `e.approx`；候選清單為空時走降級路徑。 | 已修正：第 9–11 行 asked 旗標限制只追問一次，追問後 c < τ_low = 0.50 改用食材拆解並標示近似（III-B） |
| E29 | 4 演算法 | Major | Fig. 1 第 1、13 行 | 在一般的 `def` 中使用 `await`，Python 會直接判定語法錯誤（`'await' outside async function`）；而且在函式中等待使用者回答，和聊天介面「一次一則訊息」的運作方式不符。 | 第 1 行是 `def diet_agent(...)`，不是 `async def`；第 13 行是 `ans = await ask_user(q)`。design.md ③ 改成由 Planner 保存對話狀態（每項食物的 `asked` 旗標、尚未回答的澄清問題），下一則訊息再繼續處理。 | 改用與語言無關的偽代碼符號（例如 `ask(...)`），或改成「回傳澄清問題、把狀態存進對話記憶」的寫法。 | 已修正：改用 algorithmic 偽代碼，以 Ask(...) 表示回問，不使用 await |
| E30 | 4 演算法 | Major | Fig. 1 第 35–38 行 | 註解 `# 0.0 ~ 0.2` 和實際可能的值不符；區間公式少了份量模糊度與上限；參數 `portion` 傳進來卻沒有使用。 | `uncertainty_ratio = 1 - conf`；`conf` 是 [0, 1] 的配對信心，而且 E28 顯示追問後仍可能 < 0.80，所以值域是 0.0–1.0，不是 0.0–0.2。design.md 的公式是 `w = min(w_max, w0 + α(1−c) + β·vagueness)`，其中 w0 = 0.10、α = 0.50、β = 0.15、w_max = 0.60；本稿只有 w0、α 兩項。`specs/energy-analytics`「沒有份量描述的那一筆區間較寬」在本稿的公式下無法成立。 | 改用 design.md 的完整公式並列出參數表；刪除錯誤註解，改成「c ∈ [0, 1]」。 | 已修正：式 (2) 含 β·v 與上限 w_max，並說明 v 的取值（III-C） |
| E31 | 4 演算法 | Major | Fig. 1 第 17–18 行；Abstract B | 熱量用單一密度計算（`g * best.kcal_per_100g / 100`），完全沒有使用修飾詞，所以摘要自己舉的例子「湯喝一半」在演算法中沒辦法算出來。 | 第 18 行沒有用到 `food.modifiers`；design.md 第 13 行是逐成分加總：`k = Σ_j g·share_j·kcal_j/100·adj_j(e.modifiers)`，Worked Example 中「湯 250 × 0.5」說明了為什麼需要這樣算。 | 改成逐成分加總，並加入修飾詞的調整倍率。 | 已修正：式 (1) 逐成分加總並乘上修飾詞倍率 a_j（III-C；第 13 行） |
| E32 | 4 演算法 | Major | IV-A(2)；Fig. 1 第 3–4、22、28 行 | 意圖名稱前後不一致：IV-A 寫 `get_analysis`／`get_recommendation`，程式碼和 spec 則是 `analyze`／`recommend`；分類器若輸出 `get_analysis`，就不會符合任何分支。程式碼也沒有處理 `query_nutrition` 與意圖不明的情況。 | `specs/conversational-food-logging`：四種意圖是 `log_food`、`query_nutrition`、`analyze`、`recommend`，無法判斷時 MUST 回問。程式碼中沒有 `query_nutrition` 分支，這類訊息會直接進入 safety_check，再因 E27 出錯。 | 全文統一使用 spec 的四個名稱；加上 `query_nutrition`（只查詢、不寫入日誌）與 UNKNOWN（回問使用者）兩個分支。 | 已修正：全文統一為 log_food、query_nutrition、analyze、recommend；第 3–4 行加入 UNKNOWN 與查詢分支 |
| E33 | 4 演算法 | Major | Fig. 1 第 22–27、33 行 | `analyze` 分支算出的 `total`、`macro_ratio`、`gap` 都沒有傳給 `format_response`，所以分析結果不會出現在回應中；每日總量只有點估計，沒有區間；缺少體重等個人資料時也沒有先詢問。 | 第 33 行 `format_response(intent, D, rec)` 沒有傳入 `gap`、`tdee`。`specs/energy-analytics`：每日總量 MUST 以區間呈現（半寬用平方和開根號合併）；缺少必要資料時 MUST 詢問，不得用預設值。 | 改用 `S = compute_daily_state(D, P)` 回傳總量區間、巨量營養素比例、BMR、TDEE 與缺口，並傳給輸出；個人資料不完整時先回問。 | 已修正：DailyState 回傳總量區間、巨量營養素、BMR、TDEE 並傳給輸出；缺少個人資料時先詢問（III-A ⑤） |
| E34 | 4 演算法 | Major | IV-A(6)「<1200 kcal warning」；Fig. 1 第 42 行 | 安全下限沒有依性別區分；`safety_check` 傳入了 `P`，卻沒有使用。 | `specs/dietary-safety-guard`：女性 1,200 kcal、男性 1,500 kcal；性別未提供時先詢問，回答前暫用 1,200。design.md Decision 5 與 [R29] Harvard Health。照本稿的寫法，男性長期吃 1,200–1,500 kcal 也不會被提示。 | 下限改成 `floor(P.sex)`，並寫入規則表；正文同步修改。 | 已修正：女 1,200、男 1,500 kcal，未提供性別先詢問（III-D） |
| E35 | 4 演算法 | Major | Fig. 1 第 7–10、21 行 | 檢索順序是 USDA 優先，和 spec 的「台灣資料優先」相反；寫入日誌時沒有保存資料來源 ID 與信心，因此違反「數值可追溯」；外部 API 逾時也沒有處理。 | `specs/nutrient-retrieval`：依序查詢食藥署資料庫 → 自建台式料理庫 → USDA；每筆數值 MUST 附上來源與品項 ID；任一來源逾時就略過並在回應中註明。本稿第 21 行 `D.add_entry(best, g, (lo, kcal, hi), food.meal_type)` 沒有 `source`、`conf` 欄位。 | 依 design.md 第 7、15 行修改：`retrieve(e.name, [TW_FCD, TW_DISH, USDA_FDC])`，寫入時附上 `source=m.id, conf=c, approx`。 | 已修正：第 7 行台灣資料優先；第 15 行寫入 source 與 c；來源逾時略過並註明（III-A ④） |
| E36 | 4 演算法 | Major | IV-B Flowchart 與 Fig. 1 | 流程圖和偽代碼互相矛盾：(a) 流程圖每次記錄後都會「和 TDEE 比較」，程式碼只在 `analyze` 才計算 TDEE；(b) 流程圖寫「信心 > 80%」，程式碼是 `conf < 0.80`，剛好等於 0.80 時兩邊的判斷相反；(c) 流程圖沒有意圖分支、追問後仍低信心的處理、逐項迴圈與例外處理。 | IV-B 原文與 Fig. 1 第 11、22–27 行。design.md Flowchart 使用「信心 ≥ 0.80」，並包含 Decision、Loop、Exception、Human Interaction 四種元素。 | 以 design.md 的流程圖為準重畫（建議做成正式的 Figure），門檻統一寫成 c ≥ τ = 0.80。 | 已修正：流程統一以 Algorithm 1 呈現，門檻一致為 c < τ 時追問 |
| E37 | 4 演算法 | Minor | Fig. 1 行號 | 行號 26 出現兩次：第一欄最後一行（`P.age, P.gender)`）和第二欄第一行（`tdee = …`）都是 26，之後的行號全部偏移一號，審查和口試時容易對錯行。 | main.tex 第一個 Verbatim 共 26 行，第二個卻設定 `firstnumber=26`；PDF 第 3 頁可以看到兩個 26。 | 改成 `firstnumber=27`，或改用 `algorithmic` 環境讓行號自動連續。 | 已修正：algorithmic 自動編號 1–20，正文引用的行號一致 |
| E38 | 5 宣稱 | Critical | Abstract F | 把尚未執行的目標值寫成研究發現：「±20% 命中率 > 85%、記錄時間減少 60%、SUS > 70、台式食物涵蓋率顯著優於西方資料庫」。全文沒有任何實驗結果、統計檢定或資料。 | V Evaluation 只描述「將會」怎麼評估；design.md Context：「Proposal 階段，還沒有程式碼」。「significantly better」也沒有任何檢定。 | F 改寫成預期貢獻與評估指標（例如「我們將在 500 筆台式料理描述上回報 MAE、±20% 命中率與區間 coverage」），或等實驗完成後再放實際數字。 | 已修正：成果改寫為預期目標，獨立成 IV-D 並明確標示不是結果 |
| E39 | 5 宣稱 | Major | I-B「technically feasible for the first time」；I-E「The first conversational Domain AI Agent…」；II 末段「no system integrates…」 | 「第一個」與「沒有系統做到」的宣稱沒有證據，而且已有相近的研究。 | docs/03：Chen et al. 2025 [R4] 是在台灣以本地食物知識客製化的 Diabot-GPT-4o；ChatDiet [R7] 是 LLM + orchestrator 的營養聊天機器人；Open-KNEAD [R6] 把餐點錨定到 USDA 代碼；[R10] 是國家食品成分資料庫 + RAG。 | 改成有範圍限定的說法，例如「據我們所知，針對繁體中文、台灣外食情境、並附區間與來源的對話式記錄」，並在 Related Work 和 R4、R6、R7、R10 逐一比較。 | 已移除：不再宣稱「第一個」；以 Related Work 逐一比較相近研究 |
| E40 | 5 宣稱 | Major | I-F Contributions (1)(2)(4) | 把尚未完成的東西寫成貢獻：「a deployable … agent」、「an annotated dataset of 500+ Taiwanese dish descriptions」。 | design.md：還沒有程式碼；台式料理庫在 W2 建置、評估集在 W6 建置，而且有「進度落後時縮為 300 筆」的備案。 | 改用預定式的說法（will / is designed to），或在投稿前完成並附上資料集說明。 | 已修正：貢獻改為系統設計、不確定性模型、安全規則與評估流程，不宣稱已完成的資料集 |
| E41 | 5 宣稱 | Major | Abstract D；IV-A(1)(2)(3) | 把不在範圍內的功能寫成系統的一部分：「text or voice」、「Whisper speech-to-text」；Planner 也固定寫成「GPT-4o / Gemini 1.5 Pro」。 | design.md 限制與 Decision 6：只支援文字，語音是 W8 延伸目標，不列入 Proposal 與評估集；Technical Feasibility：預設用小型模型，並以 adapter 抽換供應商，評估時固定並記錄模型版本。 | 刪除語音，或移到 Future Work；模型改寫為「透過 adapter 介面使用的商用 LLM（評估時記錄版本）」。 | 已修正：語音只在 V 節列為延伸目標；不指定特定 LLM |
| E42 | 5 宣稱 | Major | I-E (4)「a safety mechanism that detects disordered eating patterns」 | 「偵測飲食失調」接近臨床診斷的說法，超出系統的設計與證據。 | `specs/dietary-safety-guard`：系統只偵測「高攝取日與極低攝取日交替」這類規則模式，以非評判的語氣提示並轉介，而且 MUST 聲明不提供醫療診斷。本稿 Fig. 1 的實作也只有單一門檻（且有 E25、E26 的問題）。 | 改成「a rule-based safety guard that flags very-low-intake and binge–restrict patterns and refers users to professional resources (non-diagnostic)」。 | 已修正：改寫為規則式安全守門與非評判的提示，不宣稱偵測飲食失調（III-D） |
| E43 | 5 宣稱 | Major | V Evaluation；Abstract E；I-F (3) | 評估設計和 spec 不一致：基準只有 MyFitnessPal；沒有 MAE、MAPE、區間 coverage 與寬度、安全攔截率與誤報率；把 USDA 資料庫當成「評估資料集」。Contributions 宣稱評估框架涵蓋 safety，但評估章節完全沒有安全指標。 | `specs/agent-evaluation`：基準必須包括純 LLM（Base 與 CoT 兩種提示）與資料庫手動查詢；要回報 MAE、MAPE、±10%／±20%、coverage 與平均寬度、高誤差類別分項結果、≥ 30 筆安全測試的攔截率與誤報率；統計用 McNemar 與成對 bootstrap 95% CI。design.md Evaluation Protocol：20 人 × 7 天、受試者內交叉設計、使用順序平衡，並排除未成年人、孕婦與有飲食失調病史者。 | 以 design.md 的 Evaluation Protocol 重寫第 V 節；評估資料集只寫 500 筆標註集（含類別分布與三層參考值驗證）。 | 已修正：IV 節依 design.md 重寫（兩種基準、MAE／MAPE／命中率、coverage 與寬度、成對統計、安全測試） |
| E44 | 5 宣稱 | Minor | I-B「Calorie tracking is a scientifically validated weight-management method」；II「LLM + RAG … reduces hallucination」 | 沒有引用的概括說法，而且比現有證據更強。 | [R24] Burke 2011：自我記錄與減重一致相關，但「證據等級偏弱」；[R1] NutriBench：RAG 不一定提升準確率。 | 加上引用並把語氣調弱，例如「self-monitoring is consistently associated with weight loss, although evidence quality is limited [R24]」。 | 已修正：改為「系統性回顧發現自我記錄與減重一致相關」並引用 [burke2011] |
| E45 | 6 格式 | Minor | 全文章節結構 | 章節標題沿用課堂範本（「Attention Getter」「Deep Research」等）；沒有 Results、Discussion、Limitations；Conclusion 只有一句口號。 | PDF 第 1–2 頁的章節為 I. Introduction（A–F 子節）、II. Related Work、III. Deep Research、IV. Proposed Scheme、V. Evaluation、VI. Conclusion。 | 改用 IEEE 常見的結構：Introduction → Related Work → System Design → Evaluation Plan → Limitations → Conclusion；把 Deep Research 的內容併入 Background 或 Related Work。 | 已修正：章節改為 Introduction → Related Work → Proposed System → Evaluation Plan → Feasibility and Limitations → Conclusion |
| E46 | 6 格式 | Minor | Table I | 表格太擠：審查時的本機編譯有 4 個 Overfull hbox；PDF 上「Findings」和「Limit.」兩個欄名擠在一起（「FindingsLimit.」），內文字也被斷成很多行。 | 審查時的 main.log 有 4 個 Overfull \hbox（2.8–10.0 pt）；加入字型設定後本機與 Overleaf 各剩 1 個（Table I），「FindingsLimit.」仍擠在一起；PDF 第 2 頁。 | 改成跨欄的 `table*`，或刪減欄位、使用縮寫並加上表註。 | 已修正：Table I 改為跨欄 table*，欄位靠左對齊，編譯無 Overfull |
| E47 | 6 格式 | Minor | Fig. 1 | 偽代碼用 `figure*` + Verbatim 呈現，標題卻寫「Algorithm 1」，混用了 Figure 與 Algorithm 兩種編號；這個 float 被排到參考文獻之後（第 3 頁），在正文中只被提到一次。 | PDF 第 3 頁只有 Fig. 1，參考文獻在第 2 頁就結束了。 | 改用 `algorithm` + `algorithmic` 環境（標題寫 Algorithm 1），放在 System Design 小節附近；標題用一句話說明重點。 | 已修正：改用 algorithm 環境，標題為 Algorithm 1，放在 III-E |
| E48 | 6 格式 | Minor | 作者區塊 | 作者區塊只有校名與城市，沒有系所與 email。頁數為 3 頁，沒有超過 6 頁上限；IEEEtran conference class 使用正確。 | main.tex 第 31–33 行。IEEE 會議範本的作者區塊通常包含系所、學校、城市、國家與 email。 | 補上系所與 email。 | 已修正：作者區塊加上 Department of Electrical Engineering；email 依作者意願不列 |

---

## 三、草稿做得好的地方（修訂時保留）

1. **使用正確的模板**：`\documentclass[conference]{IEEEtran}` 與 `IEEEtran.bst`，BibTeX 編譯沒有錯誤；3 頁，遠低於 6 頁上限，有空間補上 Limitations 與評估設計。
2. **問題設定具體**：用「一碗加蛋的台式牛肉麵，湯喝一半」說明現有 App 的不足，和 spec 的「複合描述」Scenario 及 design.md 的 Worked Example 完全對應，建議保留為貫穿全文的例子。
3. **架構分成 ①–⑧ 八個模組**，和 design.md 的模組編號一致，修訂時可以直接對照。
4. **偽代碼的骨架方向正確**：多來源檢索 → 排序與信心 → 低信心追問 → 份量換算 → 熱量區間 → 寫入日誌 → 安全檢查。追問門檻 0.80，以及區間公式中的 w0 = 0.10、α = 0.50，都和 design.md 相符。
5. **領域知識的數字正確**：碳水 4、蛋白質 4、脂肪 9、酒精 7 kcal/g；AMDR 碳水 45–65%、蛋白質 10–35%、脂肪 20–35%；選用 Mifflin–St Jeor 和 design.md 一致（建議補引 [R17]，並加上國健署每日飲食指南 [R28]）。
6. **「全球肥胖人口超過 10 億」正確**：和 WHO 2025 年 12 月 GLP-1 指引 [R21] 一致，只需要補上引用。
7. **部分書目資料正確**：Zeevi 2015、Poslusna 2009、Helander 2014、Ludwig 2018（Science）的作者、卷期與頁碼都和 Crossref／PubMed 相符；Hall 只有年份錯誤。問題主要在「引用的內容」和「數字」，不在書目本身。
8. **一開始就把安全守門列為核心元件**，方向正確；修正 E25、E26、E34 後，可以成為本文和其他熱量 App 最明顯的差異。

---

## 附錄：本次查證紀錄

| 查證項目 | 來源與方法 | 結果 |
|---------|-----------|------|
| Teixeira 2025 e13450 | Crossref `works/10.1111/obr.13450`；Crossref 以 Obesity Reviews 2025 搜尋 | e13450 是 2022 年的腎絲球病變論文；找不到 Teixeira 2025 |
| Hall | Crossref 書目搜尋 | Lancet 378:826–837，2011 年 8 月；另有 AJCN 2012 95(4):989–994 的回顧文章 |
| Ludwig | PubMed 30442800；Crossref | Science 2018 是回顧文章；JAMA IM 2018 178(8):1098 是 CIM 觀點文章 |
| Subar | Crossref | J Am Diet Assoc 2006;106(10):1556–1563 |
| Helander | PubMed 25397613 | 主題是自我量體重，沒有 85% 或 30 天 |
| Poslusna | PubMed 19594967 | 約 30% 低報者、能量約低估 15% |
| Zeevi | PubMed 26590418；網路搜尋 | 摘要只說 high variability，沒有「十倍」（本次沒有讀全文） |
| Koenders | Crossref | 書目存在；35% 依 docs/06 判定原文沒有 |
| Van Horn 2024 | PubMed esearch（0 筆）；網路搜尋 | 未能查證 |
| Cheng 2024 | 網路搜尋；Crossref；PubMed（0 筆） | 未能查證，應視為不存在 |
| WHO NCD 74% | WHO NCD fact sheet（2025-09-25 版） | NCD 整體占非疫情死亡 75%，不是飲食相關疾病 |
| 43% 過重 | WHO 2024-03-01 新聞稿、WHO fact sheet（2026-10-07 版）、Lancet 2025 GBD 研究（搜尋結果） | 43% 是 WHO／NCD-RisC 的 2022 年數據；最新版為 2024 年 45% |
| 台灣代謝症候群 | 衛福部新聞稿（搜尋結果） | 20–64 歲 24.8%（2017–2020 NAHSIT） |
| 新台幣 3,000 億 | 網路搜尋 | 未能查證 |
| MyFitnessPal 30% | 網路搜尋；[R12][R13] | 找不到同儕審查來源 |
| USDA 900,000+ | FDC API `/foods/search?query=*`（2026-11-25） | totalHits 447,851 |
| 台灣資料庫 6,000+ | data.gov.tw 8543（搜尋結果） | 未列出總筆數，未能查證 |

---

## 四、v2 修正結果（作者填寫，2026-11-25）

- Critical 5 件、Major 33 件：全部已修正或已移除，位置寫在上表的「v2 處理」欄。
- Minor 10 件：全部已修正（E48 加上系所；email 依作者意願不列）。
- 修正稿：`paper/v2-revised/`；PDF：`paper/pdf/DietSense_IEEE_v2_revised.pdf`（5 頁，編譯沒有錯誤或未定義的引用）。
- 審查期間另外發現：WHO 肥胖 fact sheet 於 2026-10-07 更新為 2024 年資料（26 億成人過重、9.4 億肥胖），v2 與 repo 的 docs 已全部改用新數字。

## 五、作者第二次自查（2026-11-25）

審稿 agent 只審 v1。v2 完成後，作者再逐句核對 v2 與原始來源，另外修正了下列問題（這些不在上面 48 項之內）：

| # | 位置 | 問題 | 修正 |
|---|------|------|------|
| S1 | Abstract、I 節、Table I | 「5.4 → 1.4 天／週」寫成所有熱量 App 的數據 | PubMed 原文（PMID 41329042）是 MyFitnessPal 的數據，改為 MyFitnessPal |
| S2 | I 節、參考文獻 [10] | N2 的 BibTeX 標題是自己擬的，不是原始標題 | 改引可查證的 ScienceDaily 新聞稿（American Society for Nutrition, 2026-07-26），註明研究者 A. Hengist、O. Charles 與初步結果；正文改寫為原文的「約 250–345 kcal、脂肪約 30 g」 |
| S3 | I 節 | Bilen 2026 寫成「青少年研究」 | 原文是 4 位虛構個案、5 個 AI 聊天機器人，改寫為 case study |
| S4 | II-A | DiningBench 寫成「在 2,086 道中式料理上 MAPE 24.45%」 | 24.45% 是整個 3,021 道菜 benchmark 的結果，改寫 |
| S5 | III-C、Algorithm 1 | 符號衝突：H 同時是每日半寬、身高、7 日歷史；e 同時是食物項目與熱量密度 | 每日半寬改為 Δ，熱量密度改為 ρ，BMR 改用 weight、height、age |
| S6 | 全文 | TFDA、USDA、BMR、TDEE、MAE、ICC、RAG、MLLM 沒有定義 | 第一次出現時寫出全名 |
| S7 | III-E | 會議論文正文出現 “midterm design” | 改為說明演算法本身的安全設計 |
| S8 | III-F | 範例的 340、160、250 沒有標明成分 | 標明麵、牛肉、半碗湯，並說明每日區間含早餐 |
| S9 | 全文 | 英式與美式拼字混用 | 統一為美式（IEEE 規定） |
| S10 | 參考文獻 | `chen2025` 作者欄的 `others` 放在中間；DOI 沒有印出；網站缺少存取日期；國健署成果報告的出版年沒有註明依據 | 修正作者欄；15 筆期刊文獻印出 DOI；網站加上 [Online]、存取日期；成果報告註明「封面無出版日期，檔案日期 2022 年 5 月」 |
| S11 | 引用核對 | 國健署成果報告的 68.0% 外食比例 | 重讀原始 PDF 表 3.9.1（n = 9,954）：34.8 + 27.2 + 6.0 = 68.0%，相符 |

v2 修正後重新編譯：5 頁，30 筆文獻全部被引用，沒有錯誤或未定義的引用。

