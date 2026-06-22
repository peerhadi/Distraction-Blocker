function getQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("q") || "";
}

function showBlocked() {
  document.documentElement.innerHTML = "";

  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:#0f0f0f;
      color:white;
      font-family:Arial;
      text-align:center;
    ">
      <h1 style="font-size:60px;">🚫 Distraction Blocked</h1>
      <p style="opacity:0.7;font-size:18px;">
        This search matches blocked categories (sports / media / trending / etc.)
      </p>
    </div>
  `;
}

(function run() {
  const query = getQuery();

  if (query && isDistraction(query)) {
    showBlocked();
  }
})();
