// DietSense Proposal deck (refactored) — pptxgenjs structured deck
const pptxgen = require("pptxgenjs");
const path = require("path");
const SKILL = process.argv[2];
const OUT = process.argv[3];
const { applyTheme } = require(path.join(SKILL, "scripts", "apply_theme.js"));

const THEME = {
  name: "DietSense",
  headFontFace: "Microsoft JhengHei",
  bodyFontFace: "Microsoft JhengHei",
  colors: {
    dk1: "1B2420", lt1: "FFFFFF", dk2: "1F4D3A", lt2: "EEF4F0",
    accent1: "1F4D3A", accent2: "E07A1F", accent3: "4E8F6E", accent4: "C0392B",
    accent5: "7A8C83", accent6: "F2C14E", hlink: "1F6FB2", folHlink: "6B4C9A",
  },
};
const HEX = { green: "1F4D3A", orange: "E07A1F", mid: "4E8F6E", red: "C0392B", grey: "7A8C83", soft: "EEF4F0", ink: "1B2420", white: "FFFFFF", line: "CFDCD4" };

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "DietSense 期末專題提案（OpenSpec 重構版）";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const W = 13.333, H = 7.5, MX = 0.6;

// ---------- layouts ----------
pres.defineSlideMaster({
  title: "TITLE_DARK",
  background: { color: C.text2 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 2.2, w: W - 2 * MX, h: 1.4, fontSize: 44, bold: true, color: C.background1, valign: "bottom", align: "left" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: MX, y: 3.75, w: W - 2 * MX, h: 1.6, fontSize: 18, color: C.background2, valign: "top", align: "left" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  margin: [0.5, 0.6, 0.6, 0.6],
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.35, w: W - 2 * MX, h: 0.85, fontSize: 32, bold: true, color: C.text2, valign: "middle" }, text: "" } },
    { text: { text: "DietSense｜期末專題提案・OpenSpec 重構版", options: { x: MX, y: H - 0.42, w: 8, h: 0.3, fontSize: 10, color: C.accent5 } } },
  ],
  slideNumber: { x: W - 1.1, y: H - 0.42, w: 0.5, h: 0.3, fontSize: 10, color: C.accent5, align: "right" },
});

let n = 0;
const ON = () => `obj${++n}`;
function content(section, title) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title" });
  return s;
}
function txt(s, text, o) { s.addText(text, Object.assign({ isTextBox: true, objectName: ON(), fontSize: 14, color: C.text1, valign: "top", margin: 0.05 }, o)); }
function card(s, x, y, w, h, fill) { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || C.background2 }, line: { color: fill || C.background2 }, objectName: ON() }); }
function badge(s, x, y, label, fill, d) {
  d = d || 0.48;
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill || C.accent2 }, line: { color: fill || C.accent2 }, objectName: ON() });
  s.addText(label, { x, y, w: d, h: d, isTextBox: true, objectName: ON(), align: "center", valign: "middle", fontSize: d > 0.45 ? 16 : 12, bold: true, color: C.background1, margin: 0 });
}
function table(s, rows, o) {
  const hdr = rows[0].map((t) => ({ text: t, options: { bold: true, color: C.background1, fill: { color: C.text2 } } }));
  const body = rows.slice(1).map((r, i) => r.map((t) => ({ text: t, options: { fill: { color: i % 2 ? C.background1 : C.background2 } } })));
  s.addTable([hdr, ...body], Object.assign({ x: MX, y: 1.4, w: W - 2 * MX, fontSize: 12, color: C.text1, border: { type: "solid", pt: 0.75, color: HEX.line }, valign: "middle", margin: 0.06, objectName: ON() }, o));
}
const note = (s, t) => s.addNotes(t);

// ================= 1. 開場 =================
pres.addSection({ title: "開場" });
let s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "開場" });
s.addText("DietSense", { placeholder: "title" });
s.addText([
  { text: "對話式每日熱量攝取 Domain AI Agent", options: { fontSize: 24, bold: true, breakLine: true } },
  { text: "期末專題提案（OpenSpec 重構版）｜依《期末專題提案作業規範》與 A2Z outline", options: { fontSize: 16 } },
], { placeholder: "body" });
txt(s, "用一句中文記錄一餐：每個熱量數字都有來源、有區間、有安全守門", { x: MX, y: 6.2, w: 11, h: 0.5, fontSize: 16, italic: true, color: C.accent6 });
note(s, "開場：DietSense 是一個對話式的熱量攝取 Agent。這份是用 OpenSpec 重構後的提案。");

// ================= 2. 動機 =================
pres.addSection({ title: "動機與問題" });
s = content("動機與問題", "動機：問題很大，而且人們做不到持續記錄");
const stats = [
  ["8.9 億", "全球成人肥胖人數（2022）", "WHO 2025 [R14]"],
  ["68%", "台灣成人每週外食 7 次以上", "國健署 106–109 年調查 [N4]"],
  ["5.4→1.4", "熱量 App 記錄天數／週（第 4→12 週）", "Dugas 2026 [R11]"],
];
stats.forEach(([v, l, src], i) => {
  const x = MX + i * 4.1;
  card(s, x, 1.5, 3.8, 3.1);
  txt(s, v, { x: x + 0.25, y: 1.75, w: 3.3, h: 1.2, fontSize: 54, bold: true, color: i === 2 ? C.accent2 : C.text2 });
  txt(s, l, { x: x + 0.25, y: 3.0, w: 3.3, h: 0.9, fontSize: 16, bold: true });
  txt(s, src, { x: x + 0.25, y: 3.95, w: 3.3, h: 0.4, fontSize: 11, color: C.accent5 });
});
txt(s, [
  { text: "台灣：", options: { bold: true, color: C.text2 } },
  { text: "成人男性過重＋肥胖 58.4%、女性 42.6%（2017–2020 國民營養調查 [R15]）。", options: { breakLine: true } },
  { text: "記錄有效：", options: { bold: true, color: C.text2 } },
  { text: "持續自我記錄與減重成效一致相關 [R24]；問題在於記錄負擔太高，使用者很快放棄。" },
], { x: MX, y: 4.95, w: W - 2 * MX, h: 1.4, fontSize: 16, paraSpaceAfter: 6 });
note(s, "三個數字：問題規模、台灣外食情境、持續度崩落。");

// ================= 3. 使用情境 =================
s = content("動機與問題", "使用情境：一句話完成記錄");
card(s, MX, 1.45, 5.6, 1.1, "FFF1E3");
txt(s, "使用者", { x: MX + 0.2, y: 1.52, w: 2, h: 0.35, fontSize: 12, bold: true, color: C.accent2 });
txt(s, "「午餐吃了一碗加蛋的台式牛肉麵，湯喝一半」", { x: MX + 0.2, y: 1.85, w: 5.3, h: 0.6, fontSize: 17, bold: true });
card(s, 6.7, 2.75, 6.0, 3.3);
txt(s, "DietSense", { x: 6.9, y: 2.85, w: 3, h: 0.35, fontSize: 12, bold: true, color: C.text2 });
txt(s, [
  { text: "台式牛肉麵（一碗）＋滷蛋（一顆），湯攝取 50%", options: { bold: true, breakLine: true } },
  { text: "熱量：546–854 kcal（點估計 700）", options: { fontSize: 20, bold: true, color: C.accent2, breakLine: true } },
  { text: "蛋白質 19%・碳水 52%・脂肪 29%", options: { breakLine: true } },
  { text: "今日累計 913–1,247 kcal／TDEE 2,046", options: { breakLine: true } },
  { text: "來源：自建台式料理庫 #TW-0412、食藥署資料庫", options: { fontSize: 12, color: C.accent5 } },
], { x: 6.9, y: 3.25, w: 5.6, h: 3.2, fontSize: 15, paraSpaceAfter: 6 });
txt(s, [
  { text: "畫面上的數字為示意，不是實驗結果", options: { italic: true, color: C.accent5, breakLine: true } },
  { text: "", options: { breakLine: true } },
  { text: "① 理解口語份量：「一碗」、「湯喝一半」", options: { breakLine: true } },
  { text: "② 數字錨定資料庫，附來源", options: { breakLine: true } },
  { text: "③ 以區間呈現不確定性", options: { breakLine: true } },
  { text: "④ 信心不足時只追問一次" },
], { x: MX, y: 2.85, w: 5.6, h: 3.6, fontSize: 16, paraSpaceAfter: 8 });
note(s, "端到端範例（A2Z 的 PJ）。強調數字是示意。");

// ================= 4. Problem =================
s = content("動機與問題", "問題：四個障礙讓人放棄記錄");
[["1", "查詢負擔", "在上萬筆品項中找正確名稱"], ["2", "份量模糊", "外食不會秤重，只有「一碗」、「一份」"], ["3", "複合料理", "牛肉麵＝麵＋湯＋肉＋蛋，需要拆解"], ["4", "在地資料不足", "珍奶、滷肉飯、夜市小吃在常用資料庫中覆蓋不足"]].forEach(([k, t, d], i) => {
  const x = MX + (i % 2) * 6.15, y = 1.5 + Math.floor(i / 2) * 1.75;
  card(s, x, y, 5.9, 1.5);
  badge(s, x + 0.25, y + 0.5, k);
  txt(s, t, { x: x + 0.95, y: y + 0.2, w: 4.8, h: 0.5, fontSize: 20, bold: true, color: C.text2 });
  txt(s, d, { x: x + 0.95, y: y + 0.7, w: 4.8, h: 0.7, fontSize: 15 });
});
txt(s, [
  { text: "後果：", options: { bold: true, color: C.accent4 } },
  { text: "使用者平均漏記 18% 的品項，能量明顯低估 [R13]；記錄頻率 12 週內崩落 [R11]。" },
], { x: MX, y: 5.2, w: W - 2 * MX, h: 0.6, fontSize: 16 });
note(s, "Problem 段落：四個障礙與後果。");

// ================= 5. Existing limitations =================
s = content("動機與問題", "現有方法的限制：好用的不準，準的不好用");
table(s, [
  ["方法", "優點", "限制（證據）"],
  ["手動資料庫 App（MyFitnessPal）", "能量與巨量營養素相對效度可接受 [R12]", "負擔高、持續度崩落 [R11]；台灣小吃少"],
  ["影像 MLLM 直接估算", "拍照即可", "GPT-4o 熱量 MAPE 35.8% [R3]；與營養師 ICC 0.31–0.67 [R2]"],
  ["商業拍照 App（Cal AI 等）", "安裝逾 1,500 萬次 [N3]", "每餐少算 250–345 kcal（初步）[N2]；珍奶低估達 76% [N1]"],
  ["文字 LLM 直接估算", "輸入最自然", "最佳模型碳水準確率約 67% [R1]；數字沒有來源"],
  ["資料錨定 Agent", "數字可追溯", "以美國或歐洲資料庫為主 [R6][R10]；缺台灣熟食"],
], { fontSize: 16, rowH: 0.78, colW: [3.4, 3.7, 5.03] });
note(s, "對應 Introduction D 與 A2Z 的 J（Judgement）。");

// ================= 6. Evidence chart =================
s = content("動機與問題", "證據：最新模型在中式料理上仍有明顯誤差");
s.addChart(pres.charts.BAR, [{ name: "熱量估算 MAPE（%）", labels: ["Gemini 1.5 Pro", "GPT-4o", "Claude 3.5 Sonnet", "DiningBench 最佳模型"], values: [64.2, 35.8, 35.8, 24.45] }], {
  x: MX, y: 1.4, w: 7.4, h: 5.2, barDir: "bar", chartColors: [HEX.green], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "0.0", dataLabelFontSize: 13, dataLabelColor: HEX.ink, dataLabelFontFace: "+mn-lt",
  catAxisLabelFontSize: 13, catAxisLabelColor: HEX.ink, catAxisLabelFontFace: "+mn-lt", valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false,
  showTitle: true, title: "照片估熱量 MAPE（%），越低越好", titleFontSize: 14, titleColor: HEX.ink, titleFontFace: "+mn-lt", objectName: ON(),
});
card(s, 8.3, 1.5, 4.4, 5.0);
txt(s, [
  { text: "讀圖重點", options: { bold: true, fontSize: 18, color: C.text2, breakLine: true } },
  { text: "Fridolfsson 2025：52 張標準化照片 [R3]", options: { breakLine: true } },
  { text: "DiningBench 2026：2,086 道中式料理 [R5]", options: { breakLine: true } },
  { text: "最好的模型仍有約四分之一的誤差", options: { bold: true, color: C.accent2, breakLine: true } },
  { text: "誤差集中在份量、看不見的油脂與混合料理 → DietSense 讓使用者用語言補充" },
], { x: 8.55, y: 1.75, w: 3.95, h: 4.6, fontSize: 15, paraSpaceAfter: 10 });
note(s, "不同研究的 MAPE 只作量級參考，資料集不同不能直接比較。");

// ================= 7. Related work AI =================
pres.addSection({ title: "文獻與缺口" });
s = content("文獻與缺口", "Related Work（一）：AI 技術");
[["M1", "文字估營養", "NutriBench（ICLR 2025）：11,857 筆餐點描述，GPT-4o＋CoT 準確率 66.8% [R1]"], ["M2", "照片估營養", "ChatGPT 辨識精確 93%，營養估算與營養師一致性中等 [R2]；台灣客製化 GPT-4o 辨識 74% vs. 59% [R4]"], ["M3", "資料錨定 Agent", "Open-KNEAD 錨定 FNDDS 代碼 [R6]；斯洛維尼亞國家資料庫 RAG [R10]；ChatDiet 個人化推薦 [R7]"]].forEach(([k, t, d], i) => {
  const y = 1.5 + i * 1.6;
  card(s, MX, y, W - 2 * MX, 1.4);
  badge(s, MX + 0.25, y + 0.4, k, C.accent1, 0.6);
  txt(s, t, { x: MX + 1.1, y: y + 0.15, w: 3, h: 0.5, fontSize: 19, bold: true, color: C.text2 });
  txt(s, d, { x: MX + 1.1, y: y + 0.65, w: 10.8, h: 0.7, fontSize: 15 });
});
txt(s, "反證也要看：Open-KNEAD 發現新一代 MLLM 直接估算已追上檢索管線 → 把「純 LLM」列為必測基準", { x: MX, y: 6.35, w: W - 2 * MX, h: 0.4, fontSize: 14, bold: true, color: C.accent2 });
note(s, "AI 半邊：文字、影像、錨定三條路線。");

// ================= 8. Domain =================
s = content("文獻與缺口", "Related Work（二）：營養領域知識");
[["D1", "能量平衡是動態的", "代謝會適應，不能線性推算 [R18][R26]"], ["D2", "自我記錄的效果與誤差", "與減重顯著相關 [R24]，但約 30% 低報、能量低估約 15% [R19]"], ["D3", "台灣食物成分資料", "食藥署資料庫以原料為主，熟食料理少 [R22]"], ["D4", "品質 vs. 數量", "DIETFITS：低脂與低碳 12 個月無顯著差異 [R20]"], ["D5", "巨量營養素基準", "國健署：醣 50–60%、蛋白 10–20%、脂 20–30% [R28]"], ["D6", "TDEE 估算", "Mifflin-St Jeor 公式，以健康成人建立 [R17]"]].forEach(([k, t, d], i) => {
  const x = MX + (i % 3) * 4.1, y = 1.5 + Math.floor(i / 3) * 2.45;
  card(s, x, y, 3.85, 2.2);
  badge(s, x + 0.2, y + 0.2, k, C.accent3, 0.6);
  txt(s, t, { x: x + 0.95, y: y + 0.25, w: 2.8, h: 0.6, fontSize: 16, bold: true, color: C.text2 });
  txt(s, d, { x: x + 0.2, y: y + 0.95, w: 3.5, h: 1.1, fontSize: 16 });
});
note(s, "Domain 半邊：規範要求約 1/2 AI＋1/2 Domain。");

// ================= 9. Article summary =================
s = content("文獻與缺口", "Article Summary Table（節錄 9 篇，完整 14 篇見 docs/03）");
table(s, [
  ["Ref", "年", "AI 方法", "資料", "發現", "限制"],
  ["Hua [R1]", "2025", "12 個 LLM＋CoT", "11,857 筆描述", "GPT-4o 準確率 66.8%", "以碳水為主"],
  ["O'Hara [R2]", "2025", "ChatGPT-4", "114 張照片", "辨識 93%；ICC 0.31–0.67", "樣本小"],
  ["Fridolfsson [R3]", "2025", "3 個 MLLM", "52 張照片", "熱量 MAPE 35.8–64.2%", "無資料錨定"],
  ["Chen YJ [R4]", "2025", "客製化 GPT-4o", "57 人 714 張", "辨識 74% vs. 59%", "需拍照"],
  ["Jin [R5]", "2026", "多個 MLLM", "3,021 道菜", "最佳 MAPE 24.45%", "只有影像"],
  ["Coburn [R6]", "2026", "Agent＋FNDDS 錨定", "影像 benchmark", "直估已追上管線", "美國代碼；預印本"],
  ["Yang [R7]", "2024", "LLM＋orchestrator", "1 人 3 年", "推薦有效率 92%", "n = 1"],
  ["Dugas [R11]", "2026", "（範疇回顧）", "2013–2024 研究", "5.4→1.4 天／週", "無合併效果量"],
  ["Chen J [R13]", "2019", "（記錄 App）", "4 天記錄 vs. 回憶", "漏記 18%", "非台灣族群"],
], { fontSize: 15, rowH: 0.5, colW: [1.9, 0.75, 2.3, 2.15, 2.85, 2.18] });
note(s, "完整版含 Problem、Domain Knowledge 欄位，見 docs/03-related-work.md。");

// ================= 10. Research gap =================
s = content("文獻與缺口", "Research Gap：四個缺口，一個對應設計");
[["G1", "好用又可追溯的估算", "LLM 不產生數值，全部附來源"], ["G2", "台灣在地錨定資料", "食藥署資料庫優先＋自建台式料理庫"], ["G3", "不確定性的呈現與校準", "熱量區間＋coverage／寬度雙指標"], ["G4", "低負擔又安全的流程", "單次追問＋7 日安全守門"]].forEach(([k, g, d], i) => {
  const y = 1.5 + i * 1.22;
  badge(s, MX, y + 0.2, k, C.accent4, 0.62);
  card(s, MX + 0.85, y, 4.9, 1.0);
  txt(s, g, { x: MX + 1.05, y: y + 0.25, w: 4.6, h: 0.5, fontSize: 17, bold: true, color: C.text2 });
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 6.55, y: y + 0.3, w: 0.7, h: 0.4, fill: { color: C.accent2 }, line: { color: C.accent2 }, objectName: ON() });
  card(s, 7.45, y, 5.28, 1.0, "FFF1E3");
  txt(s, d, { x: 7.65, y: y + 0.25, w: 5.0, h: 0.5, fontSize: 17, bold: true });
});
note(s, "Existing Research → Limitations → Research Gap → Our Project。");

// ================= 11. Cores & trade-offs =================
pres.addSection({ title: "系統設計" });
s = content("系統設計", "5 個核心與 3 個取捨");
[["C1", "問題", "記錄太累 → 沒人持續記錄"], ["C2", "缺口", "好用的不準，準的不好用"], ["C3", "解法", "LLM 只理解語言，數字交給資料庫與公式"], ["C4", "誠實", "區間 low／point／high＋來源"], ["C5", "安全", "不助長過度節食"]].forEach(([k, t, d], i) => {
  const y = 1.45 + i * 0.98;
  badge(s, MX, y + 0.1, k, C.accent1, 0.58);
  txt(s, [{ text: t + "　", options: { bold: true, color: C.text2 } }, { text: d }], { x: MX + 0.75, y: y + 0.12, w: 5.2, h: 0.6, fontSize: 16 });
});
[["T1", "準確 vs. 負擔", "信心 < 0.80 才追問，每項最多一次，其餘加寬區間"], ["T2", "資料錨定 vs. LLM 直估", "以錨定為主，但把純 LLM 列為必測基準"], ["T3", "個人化 vs. 安全可解釋", "Mifflin-St Jeor＋依性別的安全下限，不做醫療個人化"]].forEach(([k, t, d], i) => {
  const y = 1.45 + i * 1.65;
  card(s, 6.6, y, 6.13, 1.45, "FFF1E3");
  badge(s, 6.8, y + 0.42, k);
  txt(s, t, { x: 7.5, y: y + 0.15, w: 5.1, h: 0.5, fontSize: 17, bold: true, color: C.accent2 });
  txt(s, d, { x: 7.5, y: y + 0.65, w: 5.1, h: 0.7, fontSize: 15 });
});
note(s, "對應作業項目 2：5 cores、3 trade-offs。10 個細節見 docs/01。");

// ================= 12. Agent design (capabilities) =================
s = content("系統設計", "Agent Design：五個 OpenSpec capability");
table(s, [
  ["Capability", "負責的行為", "模組", "代表性測試情境"],
  ["conversational-food-logging", "意圖分類、食物抽取、單次追問、修改記錄", "①②③", "「湯喝一半」被抽成修飾詞"],
  ["nutrient-retrieval", "多來源錨定、來源追溯、營養查詢、降級處理", "④", "查無此物 → 依食材拆解，標示近似"],
  ["energy-analytics", "熱量區間、巨量營養素、TDEE、替換建議", "⑤⑥⑦", "缺體重時先詢問，不用預設值"],
  ["dietary-safety-guard", "7 日規則、拒絕極低熱量、暴食-節食提示", "⑥⑦", "早餐後不誤報攝取過低"],
  ["agent-evaluation", "500 筆標註集、基準比較、校準、安全測試", "評估", "分類別回報誤差最高的三類"],
], { fontSize: 15, rowH: 0.62, colW: [3.3, 4.1, 1.0, 3.73] });
txt(s, "共 24 個 Requirement（SHALL／MUST）、37 個可測試的 Scenario；openspec validate --strict 通過", { x: MX, y: 5.5, w: W - 2 * MX, h: 0.5, fontSize: 14, italic: true, color: C.accent5 });
note(s, "規格位置：openspec/changes/add-dietsense-agent/specs/。");

// ================= 13. Architecture =================
s = content("系統設計", "System Architecture：①–⑧ 模組");
const mods = [["①", "使用情境", "文字描述飲食（語音為延伸）"], ["②", "輸入處理", "正規化・意圖・NER"], ["③", "Planner", "LLM function calling・對話記憶"], ["④", "資料檢索", "食藥署 DB・台式料理庫・USDA"], ["⑧", "輸出互動", "Markdown・區間圖・來源"], ["⑦", "決策建議", "缺口分析・替換・安全守門"], ["⑥", "領域知識", "份量表・飲食指南・安全規則"], ["⑤", "分析引擎", "克數・kcal 區間・TDEE"]];
mods.forEach(([k, t, d], i) => {
  const col = i % 4, row = Math.floor(i / 4);
  const x = MX + col * 3.1, y = 1.6 + row * 2.55;
  card(s, x, y, 2.75, 1.9, row ? "FFF1E3" : C.background2);
  badge(s, x + 0.15, y + 0.15, k, row ? C.accent2 : C.accent1, 0.5);
  txt(s, t, { x: x + 0.75, y: y + 0.17, w: 1.9, h: 0.45, fontSize: 17, bold: true, color: C.text2 });
  txt(s, d, { x: x + 0.15, y: y + 0.8, w: 2.5, h: 1.0, fontSize: 14 });
  if (col < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.78, y: y + 0.8, w: 0.3, h: 0.3, fill: { color: C.accent5 }, line: { color: C.accent5 }, objectName: ON(), flipH: row === 1 });
});
s.addShape(pres.shapes.DOWN_ARROW, { x: MX + 3 * 3.1 + 1.2, y: 3.55, w: 0.35, h: 0.55, fill: { color: C.accent5 }, line: { color: C.accent5 }, objectName: ON() });
txt(s, "上排：理解與取得資料（LLM＋檢索）　下排：確定性計算與決策（不經 LLM 產生數值）", { x: MX, y: 6.3, w: W - 2 * MX, h: 0.4, fontSize: 14, color: C.accent5 });
note(s, "依規範 ①–⑧ 編號，下排由右往左流到輸出。");

// ================= 13b. Worked example =================
s = content("系統設計", "端到端範例：一句話經過 ①–⑧");
card(s, MX, 1.35, W - 2 * MX, 0.6, "FFF1E3");
txt(s, "「午餐吃了一碗加蛋的台式牛肉麵，湯喝一半」　（30 歲女性、165 cm、60 kg；早餐已記錄 380 kcal）", { x: MX + 0.2, y: 1.43, w: W - 2 * MX - 0.4, h: 0.45, fontSize: 15, bold: true });
table(s, [
  ["模組", "發生什麼事"],
  ["②", "意圖 = log_food；抽出「台式牛肉麵（一碗，湯 50%）」與「蛋（一顆）」，餐別 = 午餐"],
  ["③④", "牛肉麵信心 0.86，不追問；蛋信心 0.72 → 追問一次「滷蛋還是荷包蛋？」→ 回答後信心 0.93"],
  ["⑤⑥", "逐成分加總：麵 340 + 牛肉 160 + 湯 250 × 0.5 = 625 kcal；滷蛋 75 kcal"],
  ["⑤", "半寬比例 0.245 與 0.21 → 這一餐 700 kcal，區間 546–854 kcal"],
  ["⑤", "今日累計 1,080 kcal（913–1,247）；BMR 1,320、TDEE 約 2,046 kcal"],
  ["⑦", "當日尚未結算，不判斷攝取過低；近 7 日平均高於下限 → 正常"],
  ["⑧", "輸出兩項的區間、與 TDEE 的差距、資料來源，並註明滷蛋是依回答記錄"],
], { y: 2.15, fontSize: 15, rowH: 0.52, colW: [1.1, 11.03] });
txt(s, "熱量與信心都是示意數值，用來說明流程與公式；實作後以資料庫的實際數值為準", { x: MX, y: 6.45, w: W - 2 * MX, h: 0.35, fontSize: 12, italic: true, color: C.accent5 });
note(s, "A2Z 的 PJ（Jump to an example）。三個重點：修飾詞只調整湯、每項只追問一次、合併後的區間比直接相加窄。");

// ================= 14. Analytics =================
s = content("系統設計", "Analytics：四個公式");
[["熱量點估計", "kcal = 克數 × kcal_per_100g ÷ 100", "克數來自份量對照表（依食物類別換算「一碗」、「一份」）"], ["區間半寬比例", "w = 0.10 + 0.50 ×（1 − 信心）+ 0.15 × 份量模糊度", "輸出 (k(1−w), k, k(1+w))；w 上限 0.60；每日總量以平方和開根號合併"], ["基礎代謝 BMR", "男 10W + 6.25H − 5A + 5｜女 10W + 6.25H − 5A − 161", "Mifflin-St Jeor [R17]；TDEE = BMR × 活動係數 1.2–1.9"], ["巨量營養素比例", "蛋白質、碳水 4 kcal/g；脂肪 9 kcal/g", "與國健署每日飲食指南比較 [R28]，AMDR 為參考"]].forEach(([t, f, d], i) => {
  const x = MX + (i % 2) * 6.15, y = 1.45 + Math.floor(i / 2) * 2.55;
  card(s, x, y, 5.95, 2.3);
  txt(s, t, { x: x + 0.25, y: y + 0.15, w: 5.5, h: 0.45, fontSize: 17, bold: true, color: C.text2 });
  txt(s, f, { x: x + 0.25, y: y + 0.65, w: 5.5, h: 0.7, fontSize: 16, bold: true, color: C.accent2, fontFace: "Consolas" });
  txt(s, d, { x: x + 0.25, y: y + 1.4, w: 5.5, h: 0.8, fontSize: 14 });
});
note(s, "A2Z 的 PF（Formulation）。");

// ================= 15. Flowchart =================
s = content("系統設計", "Flowchart：判斷、迴圈、例外與追問");
const F = (x, y, w, h, t, kind) => {
  const shp = kind === "d" ? pres.shapes.DIAMOND : pres.shapes.ROUNDED_RECTANGLE;
  const fill = kind === "d" ? "FFF1E3" : kind === "r" ? "FBE3E0" : kind === "h" ? "E3EEF9" : HEX.soft;
  const line = kind === "d" ? HEX.orange : kind === "r" ? HEX.red : HEX.line;
  s.addShape(shp, Object.assign(kind === "d" ? {} : { rectRadius: 0.08 }, { x, y, w, h, fill: { color: fill }, line: { color: line, width: 1 }, objectName: ON() }));
  s.addText(t, { x, y, w, h, isTextBox: true, objectName: ON(), align: "center", valign: "middle", fontSize: 12, bold: kind === "d", color: C.text1, margin: 0.03 });
};
const L = (x1, y1, x2, y2, plain) => s.addShape(pres.shapes.LINE, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001, line: Object.assign({ color: HEX.grey, width: 1.25 }, plain ? {} : { endArrowType: "triangle" }), flipH: x2 < x1, flipV: y2 < y1, objectName: ON() });
// 上方通道：追問迴圈、查詢分支、來源逾時
F(2.25, 1.3, 1.8, 0.45, "查詢：只檢索 → 輸出");
F(4.2, 1.3, 1.95, 0.45, "來源逾時：略過並註明", "r");
F(8.35, 1.3, 1.9, 0.45, "追問 1 次・使用者回答", "h");
// 第一排
F(0.6, 2.0, 1.55, 0.7, "接收輸入\n正規化");
F(2.45, 1.85, 1.5, 1.0, "意圖?", "d");
F(4.25, 2.0, 1.75, 0.7, "抽取 食物\n份量・修飾詞");
F(6.3, 2.0, 1.75, 0.7, "多來源檢索\n＋排序");
F(8.35, 1.85, 1.9, 1.0, "信心 ≥ 0.80?", "d");
F(10.75, 1.85, 1.9, 1.0, "已追問過?", "d");
// 第二排
F(0.6, 3.55, 1.45, 0.75, "缺口分析\n替換建議");
F(2.3, 3.42, 1.7, 1.0, "安全檢查", "d");
F(4.25, 3.55, 1.75, 0.75, "每日狀態\n總量・TDEE");
F(6.2, 3.42, 1.9, 1.0, "還有下一項?", "d");
F(8.35, 3.55, 1.9, 0.75, "逐成分 kcal・區間\n寫入日誌");
F(10.75, 3.42, 1.9, 1.0, "信心 ≥ 0.50?", "d");
// 第三排
F(0.6, 4.95, 1.45, 0.7, "輸出\n文字・圖・來源");
F(2.3, 4.95, 1.7, 0.7, "安全提示＋轉介\n不給限制建議", "r");
F(10.75, 4.95, 1.9, 0.7, "食材拆解\n標示近似估算", "r");
// 第一排連線
L(2.15, 2.35, 2.45, 2.35); L(3.95, 2.35, 4.25, 2.35); L(6.0, 2.35, 6.3, 2.35); L(8.05, 2.35, 8.35, 2.35); L(10.25, 2.35, 10.75, 2.35);
L(3.2, 1.85, 3.2, 1.75);                                  // 意圖 → 查詢
L(6.65, 2.0, 6.15, 1.6);                                    // 檢索 → 來源逾時
L(11.7, 1.85, 11.7, 1.52, true); L(11.7, 1.52, 10.25, 1.52);   // 未追問 → 追問
L(8.35, 1.52, 7.5, 1.52, true); L(7.5, 1.52, 7.5, 2.0);        // 追問 → 重新檢索
// 往第二排
L(9.3, 2.85, 9.3, 3.55);                                  // 信心足夠 → 計算
L(11.7, 2.85, 11.7, 3.42);                                // 已追問 → 信心 0.50?
L(10.75, 3.92, 10.25, 3.92);                              // 是 → 加寬區間後計算
L(11.7, 4.42, 11.7, 4.95);                                // 否 → 食材拆解
L(10.75, 5.3, 9.3, 5.3, true); L(9.3, 5.3, 9.3, 4.3);     // 食材拆解 → 計算
L(8.35, 3.92, 8.1, 3.92);                                 // 計算 → 下一項?
L(6.9, 3.5, 6.9, 2.7);                                    // 是 → 回到檢索
L(6.2, 3.92, 6.0, 3.92); L(4.25, 3.92, 4.0, 3.92); L(2.3, 3.92, 2.05, 3.92);
L(3.2, 2.85, 4.75, 3.55);                                 // 分析／建議 → 每日狀態
L(3.15, 4.42, 3.15, 4.95); L(1.32, 4.3, 1.32, 4.95); L(2.3, 5.3, 2.05, 5.3);
[["記錄", 3.78, 2.02, 0.7], ["否", 10.32, 2.02, 0.4], ["是", 9.35, 2.95, 0.4], ["否", 11.75, 1.55, 0.4], ["是", 11.75, 2.98, 0.4],
 ["是：加寬區間", 9.75, 3.28, 1.3], ["否", 11.75, 4.52, 0.4], ["是", 6.95, 2.95, 0.4], ["否", 5.9, 3.3, 0.4], ["正常", 1.9, 3.3, 0.6],
 ["風險", 3.2, 4.52, 0.6], ["分析／建議", 3.95, 2.88, 1.1], ["重新檢索", 7.55, 1.6, 0.9]].forEach(([t, x, y, w]) => txt(s, t, { x, y, w, h: 0.3, fontSize: 10.5, bold: true, color: C.accent2 }));
txt(s, [
  { text: "Decision（菱形）", options: { bold: true, color: C.accent2 } }, { text: "：意圖、信心 0.80、已追問、信心 0.50、下一項、安全檢查　　" },
  { text: "Loop", options: { bold: true, color: C.accent2 } }, { text: "：逐項食物；追問後重新檢索（每項最多一次）", options: { breakLine: true } },
  { text: "Exception（紅）", options: { bold: true, color: C.accent4 } }, { text: "：來源逾時、查無此物改食材拆解、安全風險　　" },
  { text: "Human Interaction（藍）", options: { bold: true, color: C.hyperlink || C.accent1 } }, { text: "：澄清問題" },
], { x: MX, y: 5.95, w: W - 2 * MX, h: 0.75, fontSize: 12 });
note(s, "規範提到的四種元素都有：Decision、Loop、Exception、Human Interaction。完整的 Mermaid 版本在 DESIGN.md。");

// ================= 16. Pseudocode =================
s = content("系統設計", "Pseudocode：Algorithm 1（20 行）");
const code = [
  "Algorithm 1: DietSense — Conversational Calorie Intake Agent",
  "Input : message Q, profile P, daily log D, 7-day history H",
  "Output: response R, updated log D",
  "01: q ← normalize(Q)",
  "02: (intent, ents) ← classify_and_extract(q)",
  "03: if intent = UNKNOWN then return ask(\"要記錄這餐，還是查詢營養？\"), D",
  "04: if intent = query_nutrition then return render(lookup(ents), sources), D",
  "05: if intent = log_food then",
  "06:   for each e in ents do",
  "07:     C ← retrieve(e.name, [TW_FCD, TW_DISH, USDA_FDC])",
  "08:     (m, c) ← rank(C, e.context)",
  "09:     if c < τ and not e.asked then",
  "10:       e ← update(e, ask(clarify(e, C))); e.asked ← true; goto 07",
  "11:     if c < τ_low then m ← decompose_by_ingredients(e); e.approx ← true",
  "12:     g ← portion_to_grams(e.portion, m, PORTION_TABLE)",
  "13:     k ← Σ_j g · share_j(m) · kcal_j / 100 · adj_j(e.modifiers)",
  "14:     w ← min(w_max, w0 + α(1 − c) + β · vagueness(e.portion))",
  "15:     D.add(m, g, (k(1−w), k, k(1+w)), source = m.id, conf = c)",
  "16: S ← compute_daily_state(D, P)",
  "17: risk ← safety_check(D, H, P, S, q)",
  "18: if risk ≠ OK then return render(alert(risk), sources), D",
  "19: if intent ∈ {analyze, recommend} then rec ← recommend(S, P, KB)",
  "20: return render(S, rec, sources, intervals(D)), D",
].join("\n");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: 1.35, w: 8.4, h: 5.55, rectRadius: 0.06, fill: { color: C.text2 }, line: { color: C.text2 }, objectName: ON() });
txt(s, code, { x: MX + 0.2, y: 1.45, w: 8.1, h: 5.4, fontSize: 11, fontFace: "Consolas", color: C.background1 });
card(s, 9.3, 1.35, 3.43, 5.55, "FFF1E3");
txt(s, [
  { text: "重點", options: { bold: true, fontSize: 17, color: C.accent2, breakLine: true } },
  { text: "04：查詢只回覆，不寫入日誌", options: { bullet: true, breakLine: true } },
  { text: "09–10：每項食物最多追問一次", options: { bullet: true, breakLine: true } },
  { text: "11：查無此物改用食材拆解，標示近似", options: { bullet: true, breakLine: true } },
  { text: "13：逐成分加總，「湯喝一半」只調整湯", options: { bullet: true, breakLine: true } },
  { text: "16–17：共用每日狀態；安全檢查用完整日或 7 日平均（修正原稿的誤報與未定義變數）", options: { bullet: true, breakLine: true } },
  { text: "參數：τ = 0.80、τ_low = 0.50、w0 = 0.10、α = 0.50、β = 0.15、w_max = 0.60", options: { bullet: true } },
], { x: 9.5, y: 1.55, w: 3.1, h: 5.2, fontSize: 13, paraSpaceAfter: 7 });
note(s, "有行號的 Pseudocode，符合規範第四節。");

// ================= 16b. Technical feasibility =================
s = content("系統設計", "Technical Feasibility：資料、工具與工作量");
table(s, [
  ["項目", "可行性依據（2026-11-11 查證）", "限制與對策"],
  ["食藥署食品營養成分資料集", "政府資料開放平臺資料集 8543；CSV／JSON／XML；開放授權；每 3 個月更新", "熟食少 → 自建台式料理庫"],
  ["USDA FoodData Central", "公開 API；CC0 公有領域；每個 IP 每小時 1,000 次", "本機快取；評估時分批查詢"],
  ["LLM（意圖、抽取、規劃）", "結構化輸出與 function calling 是標準功能；用小型模型即可", "固定版本；格式錯誤重試一次"],
  ["向量檢索與後端", "料理庫只有數百筆，本機索引即可；Python、FastAPI、SQLite，不需 GPU", "料理庫每筆記錄別名"],
], { y: 1.4, fontSize: 14, rowH: 0.6, colW: [3.2, 5.9, 3.03] });
card(s, MX, 4.6, 5.9, 2.15);
txt(s, [
  { text: "工作量估計（規劃值，不是量測結果）", options: { bold: true, color: C.text2, breakLine: true } },
  { text: "台式料理庫 150 道 ≈ 50 小時（W2）", options: { bullet: true, breakLine: true } },
  { text: "評估集 500 筆 ≈ 50 小時（W6）", options: { bullet: true, breakLine: true } },
  { text: "雙人標註與標示比對 ≈ 10 小時；LLM 評估呼叫約 2,000–2,500 次", options: { bullet: true } },
], { x: MX + 0.2, y: 4.7, w: 5.5, h: 1.95, fontSize: 14, paraSpaceAfter: 4 });
card(s, 6.83, 4.6, 5.9, 2.15, "FFF1E3");
txt(s, [
  { text: "進度落後時依序縮減", options: { bold: true, color: C.accent2, breakLine: true } },
  { text: "① 語音輸入　② 使用者研究 20 → 10 人", options: { breakLine: true } },
  { text: "③ 手動基準只做 100 筆抽樣　④ 評估集 500 → 300（先改 spec）", options: { breakLine: true } },
  { text: "安全守門與來源追溯不縮減", options: { bold: true } },
], { x: 7.03, y: 4.7, w: 5.5, h: 1.95, fontSize: 14, paraSpaceAfter: 4 });
note(s, "評分表第五項的 Technical Feasibility。資料建置約 110 小時是最大的時程風險。");

// ================= 17–19. Deep Research =================
pres.addSection({ title: "Deep Research" });
s = content("Deep Research", "Deep Research Q1：五個核心思維");
[["能量平衡是動態的", "代謝會適應 [R18][R26]", "缺口以區間＋7 日趨勢呈現"], ["巨量營養素組成", "國健署指南與 AMDR [R28]", "一定附三大營養素比例"], ["份量誤差最大", "約 30% 低報、能量低估約 15% [R19]", "low／point／high 區間"], ["個體差異", "血糖反應因人而異 [R16]", "個人 TDEE，不做醫療個人化"], ["行為情境", "情緒性進食預測體重增加 [R27]", "偵測暴食-節食交替"]].forEach(([t, e, d], i) => {
  const y = 1.4 + i * 1.05;
  badge(s, MX, y + 0.15, String(i + 1), C.accent1, 0.58);
  card(s, MX + 0.8, y, 3.9, 0.9);
  txt(s, t, { x: MX + 1.0, y: y + 0.2, w: 3.6, h: 0.5, fontSize: 17, bold: true, color: C.text2 });
  txt(s, e, { x: 5.55, y: y + 0.22, w: 3.6, h: 0.5, fontSize: 14 });
  card(s, 9.2, y, 3.53, 0.9, "FFF1E3");
  txt(s, d, { x: 9.35, y: y + 0.22, w: 3.3, h: 0.5, fontSize: 14, bold: true });
});

note(s, "每一項都說明意義、證據、如何影響設計。");

s = content("Deep Research", "Deep Research Q2：三個專業爭論");
[["熱量數量 vs. 食物品質", "A：DIETFITS 12 個月無差異 [R20]；等熱量生酮未加快減脂 [R26]", "B：低碳組總能量消耗多約 209 kcal/天 [R25]", "同時顯示熱量與三大營養素，不推銷特定飲食法"], ["AI 估算夠不夠準", "A：客製化 GPT-4o 多在 ±10–20% [R4]；新 MLLM 追上管線 [R6]", "B：MAPE 約 36% [R3]；珍奶低估達 76% [N1]", "區間呈現；純 LLM 必測；高誤差類別分項評估"], ["通用指引 vs. 個人化", "A：AI 菜單平均每天少約 695 kcal [N5]", "B：個人化血糖預測優於通用 [R16]", "通用指引＋安全下限一定生效；明確非醫療聲明"]].forEach(([t, a, b, d], i) => {
  const x = MX + i * 4.1;
  card(s, x, 1.4, 3.85, 5.3);
  txt(s, t, { x: x + 0.2, y: 1.55, w: 3.45, h: 0.6, fontSize: 17, bold: true, color: C.text2 });
  txt(s, a, { x: x + 0.2, y: 2.2, w: 3.45, h: 1.35, fontSize: 15 });
  txt(s, b, { x: x + 0.2, y: 3.6, w: 3.45, h: 1.05, fontSize: 15 });
  card(s, x + 0.15, 4.75, 3.55, 1.8, "FFF1E3");
  txt(s, [{ text: "對 DietSense：", options: { bold: true, color: C.accent2, breakLine: true } }, { text: d }], { x: x + 0.3, y: 4.85, w: 3.3, h: 1.6, fontSize: 15 });
});
note(s, "觀點 A ↔ B → 證據 → 共識 → 未解 → 對系統的影響。完整版見 docs/06。");

s = content("Deep Research", "Deep Research Q3：十個深度理解問題");
table(s, [
  ["#", "類型", "問題", "DietSense 的回答"],
  ["1", "Why", "吃一樣多熱量，為什麼一個瘦一個沒瘦？", "個人 TDEE＋7 日趨勢"],
  ["2", "What-if", "只說「一碗泡麵」，其餘不明？", "只問最影響熱量的一題，其餘反映在區間"],
  ["3", "Trade-off", "問越多越準但越煩？", "最多追問一次；量測追問率與記錄秒數"],
  ["4", "Failure", "資料庫沒有的家常菜？", "食材拆解、標示近似、加寬區間"],
  ["5", "Evidence", "如何用 RCT 驗證？", "隨機分派，主要結果為 12 週持續記錄天數"],
  ["6", "Comparison", "RAG、微調、知識圖譜？", "RAG＋規則表：可更新、可追溯"],
  ["7", "Design", "對話何時比傳統 UI 差？", "重複餐點用一鍵再記（Future Work）"],
  ["8", "Real-world", "夜市食物資料怎麼建？", "食材拆解＋雙人標註＋業者標示比對"],
  ["9", "Why", "BMR 公式何時失準？", "運動員、高齡、孕婦；回應說明為估計值"],
  ["10", "What-if", "建議助長飲食失調怎麼辦？", "下限女 1,200／男 1,500、7 日規則、轉介"],
], { fontSize: 14, rowH: 0.47, colW: [0.5, 1.35, 4.9, 5.38] });
note(s, "每題都附上回答重點與設計位置。");

// ================= 20. Evaluation =================
pres.addSection({ title: "評估與成果" });
s = content("評估與成果", "Evaluation：資料集、基準與指標");
[["500", "台式料理標註筆數"], ["≥ 30", "珍奶／湯麵／燴飯／油炸 各類"], ["30+", "安全測試案例"], ["20 × 7", "使用者研究（人 × 天）"]].forEach(([v, l], i) => {
  const x = MX + i * 3.1;
  card(s, x, 1.45, 2.85, 1.7);
  txt(s, v, { x: x + 0.2, y: 1.55, w: 2.5, h: 0.85, fontSize: 36, bold: true, color: C.text2, align: "center" });
  txt(s, l, { x: x + 0.2, y: 2.45, w: 2.5, h: 0.6, fontSize: 14, align: "center" });
});
table(s, [
  ["面向", "指標", "比較對象"],
  ["準確度", "MAE、MAPE、±10%／±20% 命中率（分類別回報）", "純 LLM（Base、CoT）、手動資料庫查詢"],
  ["不確定性", "區間 coverage＋平均寬度", "避免以過寬區間換取覆蓋率"],
  ["效率與可用性", "每餐記錄秒數、追問率、SUS", "傳統 App（交叉使用）"],
  ["安全", "攔截率、誤報率", "30+ 筆不安全請求與風險模式"],
], { y: 3.45, fontSize: 15, rowH: 0.62, colW: [2.2, 5.6, 4.33] });
note(s, "對應 agent-evaluation spec。");

// ================= 21. Expected outcomes & contributions =================
s = content("評估與成果", "Expected Outcomes 與 Contributions");
card(s, MX, 1.45, 5.9, 4.9);
txt(s, [
  { text: "預期目標", options: { bold: true, fontSize: 20, color: C.text2, breakLine: true } },
  { text: "±20% 命中率優於純 LLM 基準", options: { bullet: true, breakLine: true } },
  { text: "每餐記錄時間短於手動查詢", options: { bullet: true, breakLine: true } },
  { text: "SUS > 70", options: { bullet: true, breakLine: true } },
  { text: "安全攔截率 100%", options: { bullet: true, breakLine: true } },
  { text: "區間 coverage ≥ 80%，並回報平均寬度", options: { bullet: true, breakLine: true } },
  { text: "以上是提案階段的預期目標，不是實驗結果", options: { italic: true, color: C.accent4, fontSize: 14 } },
], { x: MX + 0.3, y: 1.65, w: 5.4, h: 4.5, fontSize: 16, paraSpaceAfter: 8 });
[["系統", "繁中對話式熱量 Agent，數字可追溯"], ["資料", "500 筆台式料理標註集（可作 benchmark）"], ["方法", "LLM 理解＋資料錨定＋確定性計算＋區間校準"], ["評估", "準確、不確定性、負擔、可用性、安全五面向"]].forEach(([t, d], i) => {
  const y = 1.45 + i * 1.25;
  badge(s, 6.85, y + 0.25, String(i + 1));
  card(s, 7.5, y, 5.23, 1.05, "FFF1E3");
  txt(s, [{ text: t + "　", options: { bold: true, color: C.accent2 } }, { text: d }], { x: 7.7, y: y + 0.25, w: 4.9, h: 0.6, fontSize: 15 });
});
note(s, "Findings 嚴守規範：不得虛構實驗結果。");

// ================= 22. OpenSpec workflow & timeline =================
s = content("評估與成果", "OpenSpec Workflow 與 W1–W8 時程");
[["explore", "釐清 5 核心／3 取捨"], ["propose", "proposal・specs・design・tasks（目前）"], ["apply", "依 tasks.md 實作 33 項"], ["archive", "delta specs 合併到主規格"]].forEach(([k, d], i) => {
  const x = MX + i * 3.1;
  card(s, x, 1.45, 2.8, 1.35, i === 1 ? "FFF1E3" : C.background2);
  txt(s, "/opsx:" + k, { x: x + 0.2, y: 1.55, w: 2.5, h: 0.5, fontSize: 17, bold: true, color: i === 1 ? C.accent2 : C.text2, fontFace: "Consolas" });
  txt(s, d, { x: x + 0.2, y: 2.05, w: 2.5, h: 0.7, fontSize: 13 });
  if (i < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.83, y: 1.97, w: 0.25, h: 0.3, fill: { color: C.accent5 }, line: { color: C.accent5 }, objectName: ON() });
});
table(s, [
  ["週", "工作", "週", "工作"],
  ["W1", "Repo、Python 專案、匯入食藥署資料庫、串 USDA", "W5", "安全守門、建議、輸出與 Web Chat"],
  ["W2", "份量對照表、飲食指南規則、台式料理庫 ≥ 150 道", "W6", "500 筆評估集、基準比較、區間校準"],
  ["W3", "正規化、意圖與 NER、Planner、單次追問", "W7", "20 人 × 7 天使用者研究、SUS"],
  ["W4", "多來源檢索、未知食物降級、kcal 區間、TDEE", "W8", "DESIGN.md、README、Final PPT、Demo"],
], { y: 3.2, fontSize: 15, rowH: 0.65, colW: [0.7, 5.37, 0.7, 5.36] });
note(s, "作業項目 3：design.md 轉成 OpenSpec workflow。");

// ================= 23. References =================
pres.addSection({ title: "結尾" });
s = content("結尾", "References（節錄，完整 35 筆見 docs/03 與 docs/04）");
const refs = [
  "[R1] Hua et al. (2025). NutriBench. ICLR 2025.",
  "[R3] Fridolfsson et al. (2025). Curr Dev Nutr, 9(10), 107556.",
  "[R4] Chen, Y. J., et al. (2025). Am J Clin Nutr, 122(6), 1836–1849.",
  "[R5] Jin et al. (2026). DiningBench. ACL 2026.",
  "[R6] Coburn et al. (2026). Open-KNEAD. arXiv:2607.12911.",
  "[R11] Dugas et al. (2026). JMIR mHealth uHealth, 14, e64139.",
  "[R13] Chen, J., et al. (2019). Nutrition, 57, 208–216.",
  "[R14] WHO (2025). Obesity and overweight fact sheet.",
  "[R15] 國健署：2017–2020 國民營養調查新聞稿附件",
  "[R17] Mifflin et al. (1990). Am J Clin Nutr, 51(2), 241–247.",
  "[R19] Poslusna et al. (2009). Br J Nutr, 101(S2), S73–S85.",
  "[R20] Gardner et al. (2018). JAMA, 319(7), 667–679.",
  "[R25] Ebbeling et al. (2018). BMJ, 363, k4583.",
  "[R26] Hall et al. (2016). Am J Clin Nutr, 104(2), 324–333.",
  "[N1] Li et al. (2024). Nutrients, 16(15), 2573.",
  "[N2] Hengist et al. (2026). NUTRITION 2026 摘要（初步）",
  "[N4] 國健署：國民營養調查（106–109 年）成果報告",
  "[N5] Bilen et al. (2026). Front Nutr, 13, 1765598.",
];
txt(s, refs.slice(0, 9).join("\n"), { x: MX, y: 1.4, w: 6.0, h: 5.4, fontSize: 14, paraSpaceAfter: 6 });
txt(s, refs.slice(9).join("\n"), { x: 6.8, y: 1.4, w: 5.93, h: 5.4, fontSize: 14, paraSpaceAfter: 6 });
note(s, "所有引用都經 PubMed、Crossref、arXiv 或官方網站查證。");

// ================= 24. Closing =================
s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "結尾" });
s.addText("讓熱量記錄像聊天一樣簡單", { placeholder: "title" });
s.addText([
  { text: "有來源・有區間・有安全守門", options: { fontSize: 22, bold: true, breakLine: true } },
  { text: "GitHub：dietsense-proposal（OpenSpec 規格、DESIGN.md、docs/）", options: { fontSize: 16 } },
], { placeholder: "body" });
note(s, "結尾與 Q&A。");

(async () => {
  const buf = await pres.write({ outputType: 'nodebuffer', compression: true }); require('fs').writeFileSync(OUT, buf);
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
})();
