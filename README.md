# 🦊 Distraction Detector Firefox Extension

A lightweight Firefox extension that detects whether text/content is related to sports, live matches, trending media, or tech topics using keyword + fuzzy matching.

---

## ⚡ What it does

This extension analyzes text and returns:

- `true` → distraction content (sports, matches, trends, tech, etc.)
- `false` → normal content

### Examples detected:
- man utd vs liverpool
- live cricket score
- real mdrid highlights
- react deployment error

Even supports typos:
- socer live
- uefa chapions league

---

## 🧠 Features

- Large keyword database (sports, clubs, players, tech, media)
- Team alias resolution (mi → mumbai indians)
- VS match detection (A vs B)
- Fuzzy matching for spelling mistakes
- Normalized text processing
- Fully offline (no API calls)

---

## 📦 Core Function

```js
function isDistraction(input)
