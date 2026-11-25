# -*- coding: utf-8 -*-
"""編譯 IEEE 論文的 v1（初稿）與 v2（修正稿），並打包 Overleaf 上傳用的 zip。

    TECTONIC=path/to/tectonic.exe python scripts/build_paper.py

產生：
  paper/pdf/DietSense_IEEE_v1_draft.pdf      壞：期中稿原樣排版
  paper/pdf/DietSense_IEEE_v2_revised.pdf    好：審稿後的修正稿
  paper/overleaf/DietSense_IEEE_v1_draft.zip
  paper/overleaf/DietSense_IEEE_v2_revised.zip

本機用 Tectonic（XeTeX）編譯；Overleaf 用 pdfLaTeX，兩者都使用 IEEEtran 與 BibTeX。
"""
import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAPER = ROOT / "paper"
VERSIONS = {
    "v1-draft": "DietSense_IEEE_v1_draft",
    "v2-revised": "DietSense_IEEE_v2_revised",
}


def build(folder, name, tectonic):
    src = PAPER / folder
    out = PAPER / "pdf" / ("build-" + folder.split("-")[0])
    out.mkdir(parents=True, exist_ok=True)
    cmd = [tectonic, "-X", "compile", "main.tex", "--outdir", str(out), "--keep-logs"]
    result = subprocess.run(cmd, cwd=src, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if result.returncode != 0:
        print(result.stdout[-3000:], result.stderr[-3000:])
        sys.exit("compile failed: " + folder)
    log = (out / "main.log").read_text(encoding="utf-8", errors="replace")
    problems = [l for l in log.splitlines() if ("undefined" in l and "Font shape" not in l) or l.startswith("!")]
    shutil.copy(out / "main.pdf", PAPER / "pdf" / (name + ".pdf"))
    print("built", name + ".pdf", "| warnings:", len(problems))
    for line in problems[:10]:
        print("   ", line)

    zpath = PAPER / "overleaf" / (name + ".zip")
    zpath.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for f in ("main.tex", "references.bib"):
            z.write(src / f, f)
    print("packed", zpath.relative_to(ROOT))


if __name__ == "__main__":
    tectonic = os.environ.get("TECTONIC") or shutil.which("tectonic")
    if not tectonic:
        sys.exit("Tectonic not found: set TECTONIC=path/to/tectonic.exe")
    for folder, name in VERSIONS.items():
        build(folder, name, tectonic)
