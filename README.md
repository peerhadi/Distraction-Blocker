# 🦊 Distraction Detector Firefox Extension

A lightweight Firefox extension that detects whether text/content is related to sports, live matches, trending media, or tech topics using keyword + fuzzy matching.

---

## ⚡ What it does

This extension analyzes text and returns:

- true → distraction content (sports, matches, trends, tech, etc.)
- false → normal content

### Examples detected:
- man utd vs liverpool
- live cricket score
- real mdrid highlights
- react deployment error
- virat kohli reels

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

Function name:
isDistraction(input)

### Example usage:

isDistraction("man utd vs liverpool"); // true  
isDistraction("javascript promises");   // true  
isDistraction("how to cook rice");      // false  

---

## 🦊 Firefox Setup

### 1. Load extension

1. Open Firefox
2. Go to:
about:debugging#/runtime/this-firefox
3. Click "Load Temporary Add-on"
4. Select your manifest.json

---

## 🧪 Example usage in extension

In content.js:

if (isDistraction(document.body.innerText)) {
  console.log("⚠️ Distraction content detected");
}

---

## 🔧 How it works

1. Normalizes text (lowercase, cleaned)
2. Detects "vs" patterns
3. Resolves aliases (mi → mumbai indians)
4. Matches keyword database
5. Uses fuzzy matching for typos
6. Returns true/false

---

## 🧠 Summary

A simple offline detection engine to identify sports, tech, and trending content inside webpages and help build focus-based Firefox tools.
