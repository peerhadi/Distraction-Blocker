/****************************
 * 1. FULL KEYWORD DATABASE
 ****************************/

const KEYWORDS = [
  // ===== SPORTS GENERAL =====
  "football",
  "soccer",
  "cricket",
  "live cricket",
  "cricket live",
  "ipl",
  "odi",
  "t20",
  "test match",
  "world cup",
  "fifa world cup",
  "champions league",
  "uefa champions league",
  "premier league",
  "la liga",
  "serie a",
  "bundesliga",
  "ligue 1",
  "europa league",

  // ===== CLUBS =====
  "real madrid",
  "barcelona",
  "atletico madrid",
  "sevilla",
  "valencia",
  "manchester united",
  "manchester city",
  "liverpool",
  "chelsea",
  "arsenal",
  "tottenham",
  "bayern munich",
  "borussia dortmund",
  "psg",
  "paris saint germain",
  "juventus",
  "ac milan",
  "inter milan",
  "roma",
  "napoli",
  "ajax",
  "benfica",
  "porto",
  "sporting cp",
  "al nassr",
  "al hilal",
  "al ittihad",
  "al ahli",

  // ===== IPL TEAMS =====
  "chennai super kings",
  "mumbai indians",
  "kolkata knight riders",
  "delhi capitals",
  "punjab kings",
  "rajasthan royals",
  "gujarat titans",
  "lucknow super giants",

  // ===== NATIONAL TEAMS =====
  "india cricket",
  "australia cricket",
  "england cricket",
  "pakistan cricket",
  "south africa cricket",
  "new zealand cricket",
  "west indies cricket",
  "sri lanka cricket",

  // ===== PLAYERS (FOOTBALL) =====
  "messi",
  "lionel messi",
  "cristiano ronaldo",
  "ronaldo",
  "neymar",
  "mbappe",
  "kylian mbappe",
  "haaland",
  "erling haaland",
  "benzema",
  "karim benzema",
  "modric",
  "luka modric",
  "salah",
  "mo salah",
  "bellingham",
  "jude bellingham",
  "rashford",
  "saka",

  // ===== PLAYERS (CRICKET) =====
  "virat kohli",
  "rohit sharma",
  "ms dhoni",
  "jasprit bumrah",
  "hardik pandya",
  "sachin tendulkar",
  "steve smith",
  "ben stokes",
  "babar azam",
  "pat cummins",

  // ===== MEDIA =====
  "highlights",
  "match highlights",
  "football highlights",
  "cricket highlights",
  "goals",
  "best goals",
  "skills",
  "edit",
  "fan edit",
  "shorts",
  "reels",
  "tiktok",
  "viral video",
  "trending",
  "youtube video",

  // ===== MUSIC =====
  "music",
  "song",
  "lyrics",
  "album",
  "nirvana",
  "led zeppelin",
  "metallica",
  "eminem",

  // ===== TECH =====
  "github",
  "repository",
  "react",
  "node js",
  "javascript",
  "typescript",
  "frontend",
  "backend",
  "api",
  "deployment",
  "vercel",
  "netlify",
  "error",
  "debug",
  "stack overflow",
  "npm",

  // ===== SOCIAL =====
  "instagram",
  "facebook",
  "twitter",
  "x com",
  "youtube",
  "discord",
  "reddit",
  "post",
  "story",
  "reel",
  "followers",
  "verified",

  // ===== LIVE / TRENDING =====
  "live",
  "live match",
  "live score",
  "breaking",
  "today match",
  "current score",
  "popular",
];

/****************************
 * 2. TEAM ALIASES
 ****************************/

const TEAM_ALIASES = {
  csk: "chennai super kings",
  mi: "mumbai indians",
  rcb: "royal challengers bangalore",
  kkr: "kolkata knight riders",
  dc: "delhi capitals",
  gt: "gujarat titans",
  srh: "sunrisers hyderabad",

  psg: "paris saint germain",
  barca: "barcelona",

  "man utd": "manchester united",
  "man united": "manchester united",
  "man city": "manchester city",

  india: "india cricket",
  australia: "australia cricket",
  england: "england cricket",
  pakistan: "pakistan cricket",
};

/****************************
 * 3. NORMALIZATION
 ****************************/

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/****************************
 * 4. VS DETECTOR
 ****************************/

function extractVs(input) {
  const text = normalize(input);

  const cleaned = text
    .replace(/\s*vs\.?\s*/g, " vs ")
    .replace(/\s*v\s*/g, " vs ")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const match = cleaned.match(/(.+?)\s+vs\s+(.+)/);

  if (!match) return null;

  return {
    left: match[1].trim(),
    right: match[2].trim(),
  };
}

/****************************
 * 5. RESOLVE ALIASES
 ****************************/

function resolve(name) {
  const n = name.trim();

  return TEAM_ALIASES[n] || n;
}

/****************************
 * 6. LEVENSHTEIN DISTANCE
 ****************************/

function levenshtein(a, b) {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/****************************
 * 7. SIMILARITY
 ****************************/

function similarity(a, b) {
  const distance = levenshtein(a, b);

  const maxLen = Math.max(a.length, b.length);

  if (maxLen === 0) return 1;

  return 1 - distance / maxLen;
}

/****************************
 * 8. NORMALIZED KEYWORDS
 ****************************/

const NORMALIZED_KEYWORDS = KEYWORDS.map(normalize);

/****************************
 * 9. FUZZY CONTAINS
 ****************************/

function fuzzyContains(text, keyword, threshold = 0.72) {
  // exact match
  if (text.includes(keyword)) {
    return true;
  }

  const textWords = text.split(" ");
  const keywordWords = keyword.split(" ");

  /****************************
   * SINGLE WORD KEYWORD
   ****************************/

  if (keywordWords.length === 1) {
    for (const word of textWords) {
      const score = similarity(word, keyword);

      if (score >= threshold) {
        return true;
      }
    }
  } else {

  /****************************
   * MULTI WORD KEYWORD
   ****************************/
    const size = keywordWords.length;

    for (let i = 0; i <= textWords.length - size; i++) {
      const chunk = textWords.slice(i, i + size).join(" ");

      const score = similarity(chunk, keyword);

      if (score >= threshold) {
        return true;
      }
    }
  }

  return false;
}

/****************************
 * 10. MAIN DETECTION
 ****************************/

function isDistraction(input) {
  const raw = normalize(input);

  /****************************
   * CASE 1: VS MATCH
   ****************************/

  const vs = extractVs(input);

  if (vs) {
    return true;
  }

  /****************************
   * CASE 2: RESOLVE ALIASES
   ****************************/

  const resolved = resolve(raw);

  /****************************
   * CASE 3: FUZZY KEYWORD MATCH
   ****************************/

  for (const keyword of NORMALIZED_KEYWORDS) {
    if (fuzzyContains(raw, keyword)) {
      return true;
    }

    if (fuzzyContains(resolved, keyword)) {
      return true;
    }
  }

  return false;
}

/****************************
 * 11. TESTS
 ****************************/

const tests = [
  "live cricket",
  "live crjicket",
  "real madrid",
  "real mdrid",
  "barca highlights",
  "man utd vs liverpool",
  "uefa chapions league",
  "messi edit",
  "socer live stream",
  "virat kohli reels",

  "javascript promises",
  "react deployment error",
  "debug node js api",
  "critical thinking",
];

for (const t of tests) {
  console.log(t, "=>", isDistraction(t));
}
