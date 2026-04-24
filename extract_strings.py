import re
from pathlib import Path
p = Path(r"C:\Users\ahmed\PyCharmMiscProject\chunk_modal.js")
text = p.read_text(encoding="utf-8", errors="ignore")
patterns = [
    r'"([^"\\]*(?:\\.[^"\\]*)*)"',
    r"'([^'\\]*(?:\\.[^'\\]*)*)'",
]
vals = []
for pat in patterns:
    vals.extend(m.group(1) for m in re.finditer(pat, text))
seen = set()
for s in vals:
    ss = s.encode('utf-8').decode('unicode_escape') if '\\' in s else s
    key = ss.strip()
    if not key or key in seen:
        continue
    low = key.lower()
    if any(k in low for k in ["tarife", "offer", "payload", "tenant", "environment", "rest_url", "/page", "/section", "api", "router", "query", "v1/"]):
        seen.add(key)
        print(key)
