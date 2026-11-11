# -*- coding: utf-8 -*-
"""從 OpenSpec 變更與 docs/ 產生兩份衍生文件。

    python scripts/build_docs.py

產生：
  DESIGN.md                              依規範順序排列的系統設計文件
  docs/proposal/DietSense_Proposal.md    單一份 Proposal 文件（Abstract → References）
  docs/proposal/DietSense_Proposal.html  同上，供瀏覽器列印成 PDF（含 Mermaid 圖）

來源檔案才是唯一的事實來源；不要直接編輯上面三個檔案。
"""
import io
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHANGE = ROOT / "openspec" / "changes" / "add-dietsense-agent"
REPO_URL = "https://github.com/A0966411725-png/dietsense-proposal"


def read(path):
    return io.open(path, encoding="utf-8").read().replace("\r\n", "\n")


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    io.open(path, "w", encoding="utf-8", newline="\n").write(text.rstrip("\n") + "\n")
    print("wrote", path.relative_to(ROOT))


def cut(md, start, end=None):
    """回傳從 start 標題（含）到 end 標題（不含）之間的文字；兩者都是行首的完整字串。"""
    i = md.index("\n" + start) + 1 if not md.startswith(start) else 0
    j = md.index("\n" + end, i) + 1 if end else len(md)
    return md[i:j].strip("\n")


def body(md, heading, end=None):
    """同 cut，但去掉第一行的標題。"""
    return cut(md, heading, end).split("\n", 1)[1].strip("\n")


def shift(md, n):
    """把程式碼區塊以外的標題往下降 n 層。"""
    out, fenced = [], False
    for line in md.split("\n"):
        if line.startswith("```"):
            fenced = not fenced
        if not fenced and re.match(r"#{1,5} ", line):
            line = "#" * n + line
        out.append(line)
    return "\n".join(out)


def unlink(md):
    """單一文件裡沒有其他 .md 可以連，所以把相對連結換成純文字；保留 http 連結。"""
    return re.sub(r"\[([^\]]+)\]\((?!https?://)[^)]*\)", r"\1", md)


# ---------------------------------------------------------------- sources
proposal = read(CHANGE / "proposal.md")
design = read(CHANGE / "design.md")
tasks = read(CHANGE / "tasks.md")
d01 = read(ROOT / "docs" / "01-abstract-A-F.md")
d02 = read(ROOT / "docs" / "02-introduction.md")
d03 = read(ROOT / "docs" / "03-related-work.md")
d04 = read(ROOT / "docs" / "04-perplexity-research.md")
d06 = read(ROOT / "docs" / "06-deep-research.md")

arch_all = body(design, "## System Architecture（①–⑧）", "## Flowchart")
arch, components = arch_all.split("\n### 模組逐一說明\n")
flowchart = body(design, "## Flowchart", "## Pseudocode")
pseudo_all = body(design, "## Pseudocode", "## Worked Example（端到端範例）")
pseudocode, symbols = pseudo_all.split("\n### 符號與參數\n")
example = body(design, "## Worked Example（端到端範例）", "## Technical Feasibility")
feasibility = body(design, "## Technical Feasibility", "## Evaluation Protocol")
evaluation = body(design, "## Evaluation Protocol", "## Decisions")
decisions = body(design, "## Decisions", "## Risks / Trade-offs")
risks = body(design, "## Risks / Trade-offs", "## Open Questions")
goals = body(design, "## Goals / Non-Goals", "## System Architecture（①–⑧）")


def requirements_table(link_prefix):
    rows = ["| Capability | Requirement | Scenario 數 |", "|-----------|-------------|-----------|"]
    total_req = total_sc = 0
    for spec in sorted((CHANGE / "specs").glob("*/spec.md")):
        text = read(spec)
        name = spec.parent.name
        label = "[`%s`](%sspecs/%s/spec.md)" % (name, link_prefix, name) if link_prefix else "`%s`" % name
        for block in re.split(r"\n### Requirement: ", text)[1:]:
            title = block.split("\n", 1)[0].strip()
            n = len(re.findall(r"\n#### Scenario: ", block))
            rows.append("| %s | %s | %d |" % (label, title, n))
            total_req += 1
            total_sc += n
    rows.append("| **合計** | **%d 個 Requirement** | **%d** |" % (total_req, total_sc))
    return "\n".join(rows), total_req, total_sc


def schedule_table():
    rows = ["| 週 | 工作 | 任務數 |", "|----|------|-------|"]
    total = 0
    for block in re.split(r"\n(?=## \d+\. )", "\n" + tasks):
        m = re.match(r"## \d+\. (W\d) (.+)", block.strip())
        if not m:
            continue
        n = len(re.findall(r"^- \[[ x]\] ", block, flags=re.M))
        total += n
        rows.append("| %s | %s | %d |" % (m.group(1), m.group(2), n))
    rows.append("| | **合計** | **%d** |" % total)
    return "\n".join(rows), total


DATA = """| 資料來源 | 內容 | 取得方式 | 授權 | 在系統中的用途 |
|---------|------|---------|------|---------------|
| 食藥署「食品營養成分資料集」 | 原料與初級加工食品，每 100 g 的營養成分、俗名、每單位重 | 政府資料開放平臺資料集 8543（CSV、JSON、XML），離線匯入 SQLite | 政府資料開放授權條款第 1 版 | 第一優先的錨定來源；料理庫每種成分的數值來源 |
| 自建台式料理庫 | ≥ 150 道台式料理的成分組成、克數、別名 | 依食材拆解自行建立，三層驗證（design Decision 7） | 專題自有 | 小吃、便當、手搖飲等複合料理 |
| USDA FoodData Central | 西式與包裝食品 | 公開 API（`/foods/search`）+ 本機快取 | CC0 公有領域 | 台灣資料庫查不到時的補充來源 |
| 個人日誌 | 個人資料、每筆記錄、近 7 日歷史 | 本機 SQLite | 使用者自有，不上傳 | 每日狀態、7 日安全規則 |
| 評估集 | 500 筆台式料理描述與參考熱量；30+ 筆安全測試 | W6 建立 | 專題自有 | 離線評估與參數校準 |"""

AI_ANALYTICS = """| 工作 | 由誰做 | 說明 |
|------|-------|------|
| 意圖分類、食物與份量抽取 | LLM（結構化輸出） | 一次呼叫輸出固定 JSON schema；格式錯誤重試一次 |
| 決定下一步（呼叫工具、追問、輸出） | LLM Planner + 對話狀態 | 每項食物最多追問一次 |
| 未知食物的食材與比例 | LLM 提議，資料庫給數值 | 一定標示「近似估算」（design Decision 9） |
| 檢索與排序、配對信心 `c` | 確定性程式 + 向量相似度 | 台灣資料優先 |
| 份量換算、熱量、區間、三大營養素、BMR、TDEE | 確定性程式 | 可用單元測試驗證 |
| 安全檢查 | 確定性規則 | 完整日或 7 日平均；依性別的下限 |

LLM 不產生任何每 100 g 的營養數值。"""

DOMAIN = """| 領域知識 | 內容 | 來源 |
|---------|------|------|
| 份量對照表 | 碗、份、個、杯、片 → 克數，依食物類別區分 | 食藥署資料集的「每單位重」+ 自行量測 |
| 三大營養素範圍 | 醣類 50–60%、蛋白質 10–20%、脂質 20–30%；AMDR 為較寬的參考範圍 | 國健署每日飲食指南手冊 [R28] |
| 基礎代謝與 TDEE | Mifflin-St Jeor 公式 × 活動係數 1.2–1.9 | Mifflin et al. (1990) [R17] |
| 能量平衡 | 體重變化是動態的，不做線性減重預測 | Hall et al. (2011) [R18] |
| 安全下限 | 女性 1,200、男性 1,500 kcal | Harvard Health Publishing (2024) [R29] |
| 自報誤差 | 約 30% 的人低報，能量約低估 15% → 以區間呈現 | Poslusna et al. (2009) [R19] |

引用編號見 docs/03-related-work.md 的 References。"""

EXPECTED = """Proposal 階段沒有實驗結果。以下是**預期目標**，W6–W7 完成後以實際結果取代：

- ±20% 命中率優於純 LLM 基準（Base 與 CoT）。
- 區間 coverage ≥ 80%，同時回報平均半寬。
- 每餐記錄時間短於手動查詢；SUS > 70。
- 安全測試集攔截率 100%，並回報誤報率。"""

# ---------------------------------------------------------------- DESIGN.md
req_table, n_req, n_sc = requirements_table("openspec/changes/add-dietsense-agent/")
sched, n_tasks = schedule_table()

DESIGN = """# DESIGN.md — DietSense

> 對話式每日熱量攝取 Domain AI Agent 的系統設計文件。
> 狀態：**Proposal 階段**（尚無程式碼、尚無實驗結果）。
> 本文件由 `scripts/build_docs.py` 從 OpenSpec 變更 `openspec/changes/add-dietsense-agent/` 產生。要修改設計，請先改 `specs/` 或 `design.md`，再重新執行腳本，不要直接編輯本檔。

章節順序依《期末專題提案作業規範》：
Problem → Requirements → Architecture → Components → Data → AI/Analytics → Domain Knowledge → Algorithm → Implementation → How to Run → Results

## 1. Problem

{why}

## 2. Requirements

行為需求寫成 OpenSpec 規格：{n_req} 個 Requirement、{n_sc} 個可測試的 Scenario（WHEN / THEN）。

{req_table}

範圍：

{goals}

## 3. Architecture

{arch}

## 4. Components

{components}

## 5. Data

{data}

## 6. AI / Analytics

{ai}

### 符號與參數

{symbols}

## 7. Domain Knowledge

{domain}

## 8. Algorithm

### Flowchart

{flowchart}

### Pseudocode

{pseudocode}

### Worked Example

{example}

## 9. Implementation

目前是 Proposal 階段，實作依 [tasks.md](openspec/changes/add-dietsense-agent/tasks.md) 的 {n_tasks} 項任務進行。期末會在這裡補上 Implementation Mapping（模組 → 原始碼位置）。

{sched}

### Technical Feasibility

{feasibility}

### Evaluation Protocol

{evaluation}

### Design Decisions

{decisions}

## 10. How to Run

程式碼在 W1–W5 實作，執行方式於 W8 補上。Proposal 階段可以執行的有：

```bash
openspec validate add-dietsense-agent --strict
```

```bash
python scripts/build_docs.py
```

## 11. Results / Limitations

{expected}

### 已知風險與限制

{risks}

## 維護規則

1. 行為改變時先改 `specs/`，再改 `design.md`，然後執行 `python scripts/build_docs.py` 重新產生本檔。
2. 每次修改後執行 `openspec validate add-dietsense-agent --strict`。
3. 實作完成後用 `/opsx:archive` 把 delta specs 合併到 `openspec/specs/`。
""".format(why=body(proposal, "## Why", "## What Changes"), n_req=n_req, n_sc=n_sc, req_table=req_table,
           goals=goals, arch=arch, components=components, data=DATA, ai=AI_ANALYTICS, symbols=symbols,
           domain=DOMAIN, flowchart=flowchart, pseudocode=pseudocode, example=example, n_tasks=n_tasks,
           sched=sched, feasibility=shift(feasibility, 1), evaluation=evaluation, decisions=decisions,
           expected=EXPECTED, risks=risks)

write(ROOT / "DESIGN.md", DESIGN)

# ---------------------------------------------------------------- Proposal document
req_plain, _, _ = requirements_table("")
intro = cut(d02, "## A. Attention Getter（A2Z：G. General）")
related = cut(d03, "## M. Methods：AI Technology（約 1/2）", "## References（已查證）").rstrip("-\n ")
refs_r = body(d03, "## References（已查證）", "## 引用修正表（期中稿 → 重構後）")
refs_r = "\n".join(l for l in refs_r.split("\n") if not l.startswith("> ")).strip("\n")
refs_n = body(d04, "## 新增來源（N1–N6）")
deep = cut(d06, "## Q1. 五個核心思維")
abstract = body(d01, "## 五、專業摘要（約 500 字）")
af_table = body(d01, "## 四、A–F 對照（精簡版）", "## 五、專業摘要（約 500 字）")
af_table = "\n".join(l for l in af_table.split("\n") if not l.startswith("> ")).rstrip("-\n ")
cores = body(d01, "## 一、5 個核心（Cores）：整個專題只要記住這五件事", "## 二、3 個取捨（Trade-offs）")
tradeoffs = body(d01, "## 二、3 個取捨（Trade-offs）", "## 三、10 個細節（Details）：口試時能具體回答的設計點")
details = body(d01, "## 三、10 個細節（Details）：口試時能具體回答的設計點", "## 四、A–F 對照（精簡版）")

PROPOSAL = """# DietSense：對話式每日熱量攝取 Domain AI Agent

**期末專題提案（Final Project Proposal）**

> 本文件依《期末專題提案作業規範》的順序撰寫：Abstract、Introduction、Related Work、Deep Research、Proposed Scheme、References。
> 內容由 GitHub repository 的 `docs/` 與 `openspec/` 自動合成（`scripts/build_docs.py`）。Repository：{repo}
> 目前是 Proposal 階段：沒有程式碼，也沒有實驗結果；所有成效都是預期目標。

## 1. Abstract

{abstract}

### 摘要的 A–F 結構

{af}

## 2. Introduction

{intro}

## 3. Related Work

{related}

## 4. Deep Research

{deep}

## 5. Proposed Scheme

### 5.1 設計核心：5 個核心、3 個取捨、10 個細節

{cores}

{tradeoffs}

{details}

### 5.2 Agent 的行為需求

行為需求寫成 OpenSpec 規格，每個 Requirement 都有可測試的 Scenario（WHEN / THEN）。

{req}

### 5.3 System Architecture（①–⑧）

{arch}

#### 模組逐一說明

{components}

### 5.4 Flowchart

{flowchart}

### 5.5 Pseudocode

{pseudocode}

#### 符號與參數

{symbols}

### 5.6 端到端範例

{example}

### 5.7 Technical Feasibility

{feasibility}

### 5.8 Evaluation Protocol 與 Expected Outcomes

{evaluation}

{expected}

### 5.9 設計決定與被放棄的替代方案

{decisions}

### 5.10 風險與對策

{risks}

### 5.11 時程（W1–W8，共 {n_tasks} 項任務）

{sched}

## 6. References

### 文獻 R1–R29

{refs_r}

### 新增來源 N1–N6

{refs_n}
""".format(repo=REPO_URL, abstract=abstract, af=af_table, intro=shift(intro, 1), related=shift(related, 1),
           deep=shift(deep, 1), cores=cores, tradeoffs=tradeoffs, details=details, req=req_plain,
           arch=arch, components=components, flowchart=flowchart, pseudocode=pseudocode, symbols=symbols,
           example=example, feasibility=shift(feasibility, 1), evaluation=evaluation,
           expected=EXPECTED,
           decisions=decisions, risks=risks, n_tasks=n_tasks, sched=sched, refs_r=refs_r, refs_n=refs_n)
PROPOSAL = unlink(PROPOSAL)
write(ROOT / "docs" / "proposal" / "DietSense_Proposal.md", PROPOSAL)

HTML = """<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<title>DietSense 期末專題提案</title>
<style>
  @page { size: A4; margin: 16mm 15mm 16mm 15mm; }
  :root { --ink:#1b2420; --green:#1f4d3a; --orange:#b85c0f; --line:#cfdcd4; --soft:#eef4f0; }
  body { font-family: "Microsoft JhengHei", "Noto Sans TC", sans-serif; color: var(--ink); font-size: 10.5pt; line-height: 1.65; max-width: 190mm; margin: 0 auto; }
  h1 { font-size: 22pt; color: var(--green); margin: 0 0 4pt; }
  h2 { font-size: 16pt; color: var(--green); border-bottom: 2px solid var(--green); padding-bottom: 3pt; margin-top: 22pt; break-before: page; }
  h2:first-of-type { break-before: auto; }
  h3 { font-size: 12.5pt; color: var(--green); margin-top: 16pt; break-after: avoid; }
  h4 { font-size: 11pt; color: var(--orange); margin-top: 12pt; break-after: avoid; }
  p, li { orphans: 2; widows: 2; }
  table { border-collapse: collapse; width: 100%; font-size: 8.6pt; line-height: 1.45; margin: 8pt 0 12pt; }
  th { background: var(--green); color: #fff; text-align: left; }
  th, td { border: 0.75pt solid var(--line); padding: 3pt 5pt; vertical-align: top; overflow-wrap: break-word; }
  th { white-space: nowrap; }
  tr { break-inside: avoid; }
  tr:nth-child(even) td { background: var(--soft); }
  blockquote { margin: 8pt 0; padding: 4pt 10pt; border-left: 3pt solid var(--orange); background: #fff6ec; font-size: 9.5pt; }
  blockquote p { margin: 2pt 0; }
  code { font-family: Consolas, "Microsoft JhengHei", monospace; font-size: 0.92em; background: var(--soft); padding: 0 2pt; border-radius: 2pt; }
  pre { background: #14261e; color: #fff; padding: 8pt 10pt; border-radius: 4pt; font-size: 7.4pt; line-height: 1.5; white-space: pre-wrap; break-inside: avoid; }
  pre code { background: none; color: inherit; padding: 0; font-size: inherit; }
  .mermaid { text-align: center; margin: 10pt 0; break-inside: avoid; }
  .mermaid svg { max-width: 100%; height: auto; max-height: 235mm; }
  a { color: #1f6fb2; text-decoration: none; word-break: break-all; }
</style>
</head>
<body>
<main id="out"></main>
<script type="text/plain" id="src">
__MARKDOWN__
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js"></script>
<script>
  const md = document.getElementById("src").textContent;
  document.getElementById("out").innerHTML = marked.parse(md, { gfm: true });
  document.querySelectorAll("code.language-mermaid").forEach((c) => {
    const d = document.createElement("div");
    d.className = "mermaid";
    d.textContent = c.textContent;
    c.parentElement.replaceWith(d);
  });
  mermaid.initialize({ startOnLoad: false, theme: "neutral", flowchart: { htmlLabels: true, useMaxWidth: true }, themeVariables: { fontFamily: "Microsoft JhengHei, sans-serif", fontSize: "13px" } });
  mermaid.run().then(() => { document.body.setAttribute("data-ready", "1"); });
</script>
</body>
</html>
"""
assert "</script" not in PROPOSAL  # script 內容是純文字，不需要跳脫，但不能含結束標籤
html_md = PROPOSAL
write(ROOT / "docs" / "proposal" / "DietSense_Proposal.html", HTML.replace("__MARKDOWN__", html_md))
