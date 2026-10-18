/* =========================================================
   PROJECT BAHANDI - Heritage Puzzle Builder
   Site: Molo Public Market (Molo District, Iloilo City)
   ========================================================= */

/* ---------- 1. CONFIG: edit these ---------- */

// To use REAL photos, put the image files in an "images" folder and
// replace the null values below, e.g.  modern: "images/molo-market-modern.jpg"
// Use square (1:1) photos for best results.
const PHOTOS = {
  modern: "assets/market-modern.jpe",
  historical: "assets/market-historical.jpe"
};

const FACTS = {
  main:
    "Molo Public Market is one of the oldest public markets in Iloilo City and a " +
    "recognized cultural and culinary landmark. It has been an important trading " +
    "center for generations and is closely associated with the origin of Pancit Molo.",
  list: [
    "It is the birthplace of the famous Pancit Molo.",
    "It is home to many traditional Ilonggo delicacies.",
    "The market supports local farmers and vendors.",
    "Open daily, 5:00 AM - 8:00 PM."
  ]
};

const LEVELS = {
  3: { label: "Easy", mult: 1 },
  4: { label: "Medium", mult: 1.5 },
  5: { label: "Hard", mult: 2 }
};

/* ---------- 2. Built-in illustration of the market ---------- */

function marketSVG() {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7ec8f0"/><stop offset="1" stop-color="#e8f6ff"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#sky)"/>
  <circle cx="520" cy="60" r="34" fill="#ffd54a"/>
  <ellipse cx="120" cy="70" rx="55" ry="18" fill="#fff" opacity=".9"/>
  <ellipse cx="160" cy="60" rx="40" ry="16" fill="#fff" opacity=".9"/>

  <!-- palms -->
  <rect x="30" y="170" width="10" height="180" fill="#7a4a1d"/>
  <path d="M35 170 q-50 -20 -70 20 M35 170 q50 -30 80 10 M35 170 q-10 -50 30 -60 M35 170 q-40 -45 -10 -70" stroke="#2e7d4f" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="560" y="190" width="10" height="160" fill="#7a4a1d"/>
  <path d="M565 190 q-55 -25 -75 15 M565 190 q50 -30 80 8 M565 190 q-10 -45 25 -55" stroke="#2e7d4f" stroke-width="10" fill="none" stroke-linecap="round"/>

  <!-- market building -->
  <rect x="50" y="170" width="500" height="260" fill="#f4e2bd"/>
  <polygon points="25,170 575,170 540,95 60,95" fill="#a8372c"/>
  <polygon points="25,170 575,170 570,182 30,182" fill="#7e241c"/>
  <rect x="150" y="108" width="300" height="48" rx="6" fill="#fff8e6" stroke="#7a4a1d" stroke-width="4"/>
  <text x="300" y="141" font-family="Georgia, serif" font-size="27" font-weight="bold" text-anchor="middle" fill="#a8372c">MOLO PUBLIC MARKET</text>

  <!-- bunting -->
  <path d="M60 195 Q300 250 540 195" stroke="#444" stroke-width="2" fill="none"/>`;

  const flagColors = ["#e0a526", "#2e7d4f", "#b3342b", "#2a6fb5"];
  for (let i = 0; i < 14; i++) {
    const t = (i + 0.5) / 14;
    const x = 60 + t * 480;
    const y = 195 + 4 * 28 * t * (1 - t) * 1.6;
    s += `<polygon points="${x - 11},${y} ${x + 11},${y} ${x},${y + 22}" fill="${flagColors[i % 4]}"/>`;
  }

  // pillars
  [90, 250, 350, 510].forEach(x => {
    s += `<rect x="${x - 7}" y="182" width="14" height="248" fill="#c99f64"/>`;
  });

  // stalls with striped awnings
  const stalls = [
    { x: 70, w: 160, c1: "#b3342b", c2: "#fff", goods: ["#f2b705", "#e53935", "#7cb342"] },
    { x: 370, w: 160, c1: "#2e7d4f", c2: "#fff", goods: ["#fb8c00", "#8e24aa", "#e53935"] }
  ];
  stalls.forEach(st => {
    for (let i = 0; i < 8; i++) {
      s += `<rect x="${st.x + i * st.w / 8}" y="250" width="${st.w / 8}" height="34" fill="${i % 2 ? st.c2 : st.c1}"/>`;
    }
    s += `<path d="M${st.x} 284 h${st.w} l-6 12 h-${st.w - 12} z" fill="#00000022"/>`;
    s += `<rect x="${st.x + 6}" y="360" width="${st.w - 12}" height="70" fill="#8a5a2b"/>`;
    s += `<rect x="${st.x}" y="350" width="${st.w}" height="14" fill="#a8743a"/>`;
    for (let i = 0; i < 9; i++) {
      const cx = st.x + 20 + (i % 5) * 28;
      const cy = 340 - Math.floor(i / 5) * 18;
      s += `<circle cx="${cx}" cy="${cy}" r="11" fill="${st.goods[i % 3]}"/>`;
    }
    // vendor
    const vx = st.x + st.w / 2;
    s += `<rect x="${vx - 14}" y="300" width="28" height="42" rx="10" fill="${st.c1}" opacity=".85"/>`;
    s += `<circle cx="${vx}" cy="292" r="12" fill="#e0ac7a"/>`;
  });

  // centre: pancit molo stall with chalkboard
  s += `<rect x="250" y="260" width="100" height="62" rx="6" fill="#2b3a2e" stroke="#c99f64" stroke-width="4"/>
  <text x="300" y="286" font-family="Georgia, serif" font-size="16" text-anchor="middle" fill="#fff">Pancit</text>
  <text x="300" y="308" font-family="Georgia, serif" font-size="16" text-anchor="middle" fill="#ffd54a">MOLO</text>
  <rect x="245" y="365" width="110" height="65" fill="#a8743a"/>
  <path d="M258 372 h84 a42 34 0 0 1 -84 0 z" fill="#f7f1e3" stroke="#b3342b" stroke-width="3"/>
  <path d="M265 372 q10 -14 20 0 t20 0 t20 0 t20 0" stroke="#e8c36a" stroke-width="5" fill="none"/>
  <circle cx="285" cy="368" r="7" fill="#e8d3a8"/><circle cx="305" cy="366" r="7" fill="#e8d3a8"/>
  <circle cx="325" cy="368" r="7" fill="#e8d3a8"/>
  <circle cx="295" cy="372" r="4" fill="#7cb342"/><circle cx="318" cy="373" r="4" fill="#7cb342"/>`;

  // hanging lanterns
  [120, 300, 480].forEach(x => {
    s += `<line x1="${x}" y1="182" x2="${x}" y2="215" stroke="#444"/><ellipse cx="${x}" cy="228" rx="10" ry="14" fill="#e53935"/>`;
  });

  // floor
  s += `<rect x="0" y="430" width="600" height="170" fill="#b9a98c"/>`;
  for (let i = 0; i < 8; i++) s += `<line x1="0" y1="${440 + i * 22}" x2="600" y2="${440 + i * 22}" stroke="#a09070"/>`;
  for (let i = 0; i < 13; i++) s += `<line x1="${i * 50}" y1="430" x2="${i * 50 - 40 + (i - 6) * 20}" y2="600" stroke="#a09070"/>`;

  // shoppers
  const people = [
    { x: 130, c: "#2a6fb5" }, { x: 235, c: "#8e24aa" }, { x: 330, c: "#e0a526" },
    { x: 440, c: "#b3342b" }, { x: 520, c: "#2e7d4f" }
  ];
  people.forEach((p, i) => {
    const y = 480 + (i % 2) * 40;
    s += `<ellipse cx="${p.x}" cy="${y + 78}" rx="26" ry="7" fill="#0003"/>
    <rect x="${p.x - 17}" y="${y + 8}" width="34" height="62" rx="14" fill="${p.c}"/>
    <circle cx="${p.x}" cy="${y}" r="15" fill="#e0ac7a"/>
    <path d="M${p.x - 15} ${y - 3} q15 -20 30 0" fill="#3b2a1a"/>`;
    if (i % 2 === 0) s += `<rect x="${p.x + 14}" y="${y + 36}" width="22" height="20" rx="3" fill="#c99f64"/>`;
  });

  // fruit crates in front
  [[40, 560, "#fb8c00"], [90, 565, "#7cb342"], [510, 560, "#e53935"], [555, 566, "#f2b705"]].forEach(([x, y, c]) => {
    s += `<rect x="${x - 22}" y="${y}" width="44" height="30" fill="#8a5a2b"/>`;
    for (let i = 0; i < 4; i++) s += `<circle cx="${x - 15 + i * 10}" cy="${y}" r="8" fill="${c}"/>`;
  });

  s += `</svg>`;
  return s;
}

function svgToURL(svg) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- 3. Helpers ---------- */

const $ = id => document.getElementById(id);
const fmtTime = sec => String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0");

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // make sure it's not already in solved order
  if (a.length > 1 && a.every((v, i) => v === i)) return shuffle(arr);
  return a;
}

function loadBest() {
  try { return JSON.parse(localStorage.getItem("bahandi_best_market") || "{}"); }
  catch (e) { return {}; }
}
function saveBest(obj) {
  try { localStorage.setItem("bahandi_best_market", JSON.stringify(obj)); } catch (e) { /* ignore */ }
}

/* ---------- 4. State ---------- */

let sel = { mode: "modern", n: 3 };
let G = null;   // current game

/* ---------- 5. Menu ---------- */

function setupMenu() {
  $("photoChoices").addEventListener("click", e => {
    const b = e.target.closest(".choice"); if (!b) return;
    sel.mode = b.dataset.mode;
    [...$("photoChoices").children].forEach(c => c.classList.toggle("active", c === b));
  });
  $("levelChoices").addEventListener("click", e => {
    const b = e.target.closest(".choice"); if (!b) return;
    sel.n = Number(b.dataset.n);
    [...$("levelChoices").children].forEach(c => c.classList.toggle("active", c === b));
  });
  $("startBtn").onclick = () => startGame(sel.n, sel.mode);
  $("restartBtn").onclick = () => startGame(G.n, G.mode);
  $("againBtn").onclick = () => { $("modal").classList.add("hidden"); startGame(G.n, G.mode); };
  $("menuBtn").onclick = showMenu;
  $("modalMenuBtn").onclick = showMenu;

  const peekOn = () => $("peek").classList.remove("hidden");
  const peekOff = () => $("peek").classList.add("hidden");
  const pb = $("peekBtn");
  pb.addEventListener("pointerdown", peekOn);
  pb.addEventListener("pointerup", peekOff);
  pb.addEventListener("pointerleave", peekOff);
  pb.addEventListener("pointercancel", peekOff);

  renderBest();
}

function renderBest() {
  const best = loadBest();
  const rows = [];
  Object.keys(best).sort().forEach(k => {
    const [mode, n] = k.split("-");
    rows.push(`${mode === "historical" ? "Historical" : "Modern"} · ${LEVELS[n].label}: ${best[k].score} pts (${fmtTime(best[k].time)})`);
  });
  $("bestList").innerHTML = rows.length ? "<strong>Best scores</strong><br>" + rows.join("<br>") : "";
}

function showMenu() {
  stopTimer();
  $("modal").classList.add("hidden");
  $("game").classList.add("hidden");
  $("menu").classList.remove("hidden");
  renderBest();
}

/* ---------- 6. Game ---------- */

function getImageURL(mode) {
  if (PHOTOS[mode]) return PHOTOS[mode];
  return svgToURL(marketSVG());
}

function startGame(n, mode) {
  stopTimer();
  const url = getImageURL(mode);
  const filter = (mode === "historical" && !PHOTOS.historical) ? "sepia(.85) contrast(1.05) brightness(.95)" : "none";

  G = {
    n, mode, url, filter,
    total: n * n,
    placed: 0,
    mistakes: 0,
    score: 0,
    seconds: 0,
    timer: null,
    selected: null,
    done: false
  };

  $("menu").classList.add("hidden");
  $("game").classList.remove("hidden");
  $("modal").classList.add("hidden");

  buildBoard();
  buildTray();

  const peek = $("peek");
  peek.style.backgroundImage = `url("${url}")`;
  peek.style.filter = filter;
  peek.classList.add("hidden");

  updateStats();
  G.timer = setInterval(() => {
    G.seconds++;
    $("time").textContent = fmtTime(G.seconds);
  }, 1000);
}

function stopTimer() {
  if (G && G.timer) { clearInterval(G.timer); G.timer = null; }
}

function pieceStyle(el, idx) {
  const { n, url, filter } = G;
  const col = idx % n, row = Math.floor(idx / n);
  el.style.backgroundImage = `url("${url}")`;
  el.style.backgroundSize = `${n * 100}% ${n * 100}%`;
  el.style.backgroundPosition = `${(col / (n - 1)) * 100}% ${(row / (n - 1)) * 100}%`;
  el.style.filter = filter;
}

function buildBoard() {
  const board = $("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${G.n}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${G.n}, 1fr)`;
  for (let i = 0; i < G.total; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = i;
    slot.addEventListener("click", () => onSlotClick(slot));
    board.appendChild(slot);
  }
}

function buildTray() {
  const tray = $("tray");
  tray.innerHTML = "";
  const boardPx = $("board").clientWidth || 440;
  const size = Math.min(Math.floor(boardPx / G.n), G.n === 3 ? 110 : 84);

  shuffle([...Array(G.total).keys()]).forEach(idx => {
    const p = document.createElement("div");
    p.className = "piece";
    p.dataset.index = idx;
    p.style.width = p.style.height = size + "px";
    pieceStyle(p, idx);
    p.addEventListener("pointerdown", onPieceDown);
    tray.appendChild(p);
  });
}

/* ----- selection (tap) ----- */
function selectPiece(p) {
  if (G.selected) G.selected.classList.remove("selected");
  G.selected = p;
  if (p) p.classList.add("selected");
  document.querySelectorAll(".slot").forEach(s => s.classList.toggle("ready", !!p && !s.firstChild));
}

function onSlotClick(slot) {
  if (!G || G.done || !G.selected || slot.firstChild) return;
  tryPlace(G.selected, slot);
}

/* ----- dragging ----- */
let drag = null;

function onPieceDown(e) {
  if (G.done || e.button > 0) return;
  const piece = e.currentTarget;
  drag = {
    piece,
    startX: e.clientX, startY: e.clientY,
    moved: false, ghost: null,
    id: e.pointerId
  };
  piece.setPointerCapture(e.pointerId);
  piece.addEventListener("pointermove", onPieceMove);
  piece.addEventListener("pointerup", onPieceUp);
  piece.addEventListener("pointercancel", onPieceUp);
}

function onPieceMove(e) {
  if (!drag) return;
  const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
  if (!drag.moved && Math.hypot(dx, dy) > 6) {
    drag.moved = true;
    const rect = drag.piece.getBoundingClientRect();
    const g = drag.piece.cloneNode();
    g.classList.add("ghost");
    g.classList.remove("selected");
    g.style.width = rect.width + "px";
    g.style.height = rect.height + "px";
    document.body.appendChild(g);
    drag.ghost = g;
    drag.piece.style.opacity = ".35";
  }
  if (drag.moved) {
    const w = drag.ghost.offsetWidth, h = drag.ghost.offsetHeight;
    drag.ghost.style.left = e.clientX - w / 2 + "px";
    drag.ghost.style.top = e.clientY - h / 2 + "px";
    highlightSlot(e.clientX, e.clientY);
  }
}

function slotAt(x, y) {
  if (drag && drag.ghost) drag.ghost.style.display = "none";
  const el = document.elementFromPoint(x, y);
  if (drag && drag.ghost) drag.ghost.style.display = "";
  return el ? el.closest(".slot") : null;
}

function highlightSlot(x, y) {
  document.querySelectorAll(".slot.over").forEach(s => s.classList.remove("over"));
  const s = slotAt(x, y);
  if (s && !s.firstChild) s.classList.add("over");
}

function onPieceUp(e) {
  if (!drag) return;
  const { piece, moved, ghost } = drag;
  piece.removeEventListener("pointermove", onPieceMove);
  piece.removeEventListener("pointerup", onPieceUp);
  piece.removeEventListener("pointercancel", onPieceUp);
  document.querySelectorAll(".slot.over").forEach(s => s.classList.remove("over"));

  if (moved) {
    const slot = slotAt(e.clientX, e.clientY);
    if (ghost) ghost.remove();
    piece.style.opacity = "";
    if (slot && !slot.firstChild) tryPlace(piece, slot);
  } else {
    // simple tap: toggle selection
    selectPiece(G.selected === piece ? null : piece);
  }
  drag = null;
}

/* ----- placement logic ----- */
function tryPlace(piece, slot) {
  const correct = piece.dataset.index === slot.dataset.index;

  if (correct) {
    // lock it into the board
    const idx = Number(piece.dataset.index);
    piece.remove();
    const locked = document.createElement("div");
    locked.className = "piece locked";
    pieceStyle(locked, idx);
    slot.appendChild(locked);
    slot.style.border = "0";

    G.placed++;
    G.score += Math.round(100 * LEVELS[G.n].mult);
    selectPiece(null);
    updateStats();
    if (G.placed === G.total) finish();
  } else {
    // wrong: piece stays in tray, penalty applied
    G.mistakes++;
    G.score = Math.max(0, G.score - 25);
    piece.classList.remove("shake");
    void piece.offsetWidth;
    piece.classList.add("shake");
    selectPiece(null);
    updateStats();
  }
}

function updateStats() {
  $("time").textContent = fmtTime(G.seconds);
  $("score").textContent = G.score;
  $("placed").textContent = `${G.placed}/${G.total}`;
  $("mistakes").textContent = G.mistakes;
}

/* ----- finish ----- */
function finish() {
  G.done = true;
  stopTimer();

  // time bonus: faster than "par" time earns extra points
  const par = G.total * 12;
  const bonus = Math.max(0, par - G.seconds) * 5;
  G.score += bonus;
  updateStats();

  const key = `${G.mode}-${G.n}`;
  const best = loadBest();
  const isBest = !best[key] || G.score > best[key].score;
  if (isBest) { best[key] = { score: G.score, time: G.seconds }; saveBest(best); }

  $("rTime").textContent = fmtTime(G.seconds);
  $("rScore").textContent = G.score;
  $("rMistakes").textContent = G.mistakes;
  $("newBest").classList.toggle("hidden", !isBest);
  $("factMain").textContent = FACTS.main;
  $("factList").innerHTML = FACTS.list.map(f => `<li>${f}</li>`).join("");

  // let the last piece animation play, then show results
  setTimeout(() => $("modal").classList.remove("hidden"), 600);
}

/* ---------- 7. Init ---------- */
setupMenu();