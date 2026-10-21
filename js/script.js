/* =========================================================
   PROJECT BAHANDI - Heritage Puzzle Builder
   Site: Molo, Iloilo City
   ========================================================= */

/* ---------- 1. CONFIG: edit these ---------- */

// The new images are mapped here. Make sure the file names match exactly!
const PHOTOS = {
  modern: "assets/market-modern.jpe",
  historical: "assets/market-historical.jpe",
  church: "assets/molo-church.jpe",       // New
  mansion: "assets/heritage-house.jpe"    // New
};

// These are the clean names that will show up in the UI
const MODE_NAMES = {
  modern: "Modern Market",
  historical: "Historical Market",
  church: "Molo Church",
  mansion: "Heritage House"
};

const FACTS = {
  main:
    "Molo is a historic district in Iloilo City known for its rich cultural heritage. " +
    "It is often called the 'Athens of the Philippines' because of its many prominent scholars " +
    "and historical figures, and it is the birthplace of the famous Pancit Molo.",
  list: [
    "Molo Church (St. Anne's) is famous for its all-female saints.",
    "The Molo Plaza and its heritage houses date back to the Spanish colonial era.",
    "The district has produced many notable Filipino statesmen and scholars.",
    "Molo Public Market remains a bustling center for local delicacies."
  ]
};

const LEVELS = {
  3: { label: "Easy", mult: 1, limit: 300 },
  4: { label: "Medium", mult: 1.5, limit: 420 },
  5: { label: "Hard", mult: 2, limit: 600 }
};

const WARN_SECONDS = 30;

// -------- MUSIC SETTINGS --------
const MUSIC_FILE = null;                 
const MUSIC_FILE_VOLUME = 0.35;          
const MUSIC_VOLUME = 0.32;               

/* ---------- 2. Built-in illustration of the market (Fallback) ---------- */

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
  <rect x="30" y="170" width="10" height="180" fill="#7a4a1d"/>
  <path d="M35 170 q-50 -20 -70 20 M35 170 q50 -30 80 10 M35 170 q-10 -50 30 -60 M35 170 q-40 -45 -10 -70" stroke="#2e7d4f" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="560" y="190" width="10" height="160" fill="#7a4a1d"/>
  <path d="M565 190 q-55 -25 -75 15 M565 190 q50 -30 80 8 M565 190 q-10 -45 25 -55" stroke="#2e7d4f" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="50" y="170" width="500" height="260" fill="#f4e2bd"/>
  <polygon points="25,170 575,170 540,95 60,95" fill="#a8372c"/>
  <polygon points="25,170 575,170 570,182 30,182" fill="#7e241c"/>
  <rect x="150" y="108" width="300" height="48" rx="6" fill="#fff8e6" stroke="#7a4a1d" stroke-width="4"/>
  <text x="300" y="141" font-family="Georgia, serif" font-size="27" font-weight="bold" text-anchor="middle" fill="#a8372c">MOLO PUBLIC MARKET</text>
  <path d="M60 195 Q300 250 540 195" stroke="#444" stroke-width="2" fill="none"/>`;

  const flagColors = ["#e0a526", "#2e7d4f", "#b3342b", "#2a6fb5"];
  for (let i = 0; i < 14; i++) {
    const t = (i + 0.5) / 14;
    const x = 60 + t * 480;
    const y = 195 + 4 * 28 * t * (1 - t) * 1.6;
    s += `<polygon points="${x - 11},${y} ${x + 11},${y} ${x},${y + 22}" fill="${flagColors[i % 4]}"/>`;
  }

  [90, 250, 350, 510].forEach(x => {
    s += `<rect x="${x - 7}" y="182" width="14" height="248" fill="#c99f64"/>`;
  });

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
    const vx = st.x + st.w / 2;
    s += `<rect x="${vx - 14}" y="300" width="28" height="42" rx="10" fill="${st.c1}" opacity=".85"/>`;
    s += `<circle cx="${vx}" cy="292" r="12" fill="#e0ac7a"/>`;
  });

  s += `<rect x="250" y="260" width="100" height="62" rx="6" fill="#2b3a2e" stroke="#c99f64" stroke-width="4"/>
  <text x="300" y="286" font-family="Georgia, serif" font-size="16" text-anchor="middle" fill="#fff">Pancit</text>
  <text x="300" y="308" font-family="Georgia, serif" font-size="16" text-anchor="middle" fill="#ffd54a">MOLO</text>
  <rect x="245" y="365" width="110" height="65" fill="#a8743a"/>
  <path d="M258 372 h84 a42 34 0 0 1 -84 0 z" fill="#f7f1e3" stroke="#b3342b" stroke-width="3"/>
  <path d="M265 372 q10 -14 20 0 t20 0 t20 0 t20 0" stroke="#e8c36a" stroke-width="5" fill="none"/>
  <circle cx="285" cy="368" r="7" fill="#e8d3a8"/><circle cx="305" cy="366" r="7" fill="#e8d3a8"/>
  <circle cx="325" cy="368" r="7" fill="#e8d3a8"/>
  <circle cx="295" cy="372" r="4" fill="#7cb342"/><circle cx="318" cy="373" r="4" fill="#7cb342"/>`;

  [120, 300, 480].forEach(x => {
    s += `<line x1="${x}" y1="182" x2="${x}" y2="215" stroke="#444"/><ellipse cx="${x}" cy="228" rx="10" ry="14" fill="#e53935"/>`;
  });

  s += `<rect x="0" y="430" width="600" height="170" fill="#b9a98c"/>`;
  for (let i = 0; i < 8; i++) s += `<line x1="0" y1="${440 + i * 22}" x2="600" y2="${440 + i * 22}" stroke="#a09070"/>`;
  for (let i = 0; i < 13; i++) s += `<line x1="${i * 50}" y1="430" x2="${i * 50 - 40 + (i - 6) * 20}" y2="600" stroke="#a09070"/>`;

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
  if (a.length > 1 && a.every((v, i) => v === i)) return shuffle(arr);
  return a;
}

function loadBest() {
  try { return JSON.parse(localStorage.getItem("bahandi_best_market") || "{}"); }
  catch (e) { return {}; }
}
function saveBest(obj) {
  try { localStorage.setItem("bahandi_best_market", JSON.stringify(obj)); } catch (e) { }
}

/* ---------- 3b. Sound effects (synthesized) ---------- */

let audioCtx = null;
let muted = false;
try { muted = localStorage.getItem("bahandi_muted") === "1"; } catch (e) { }

function getAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function tone(freq, start, dur, type, vol, slideTo) {
  const ctx = getAudio();
  if (!ctx) return;
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function playSound(kind) {
  if (muted) return;
  try {
    duckMusic();
    if (kind === "correct") {
      tone(988, 0, 0.18, "sine", 0.25);
      tone(1319, 0.09, 0.32, "sine", 0.25);
    } else if (kind === "warning") {
      tone(740, 0, 0.12, "square", 0.1);
      tone(740, 0.2, 0.12, "square", 0.1);
      tone(740, 0.4, 0.12, "square", 0.1);
    } else if (kind === "wrong") {
      tone(180, 0, 0.28, "sawtooth", 0.16, 90);
      tone(170, 0, 0.28, "square", 0.07, 85);
    }
  } catch (e) { }
}

function updateSoundBtn() {
  $("soundBtn").textContent = muted ? "Sound: Off" : "Sound: On";
}

function toggleSound() {
  muted = !muted;
  try { localStorage.setItem("bahandi_muted", muted ? "1" : "0"); } catch (e) { }
  updateSoundBtn();
  if (!muted) playSound("correct");
}

/* ---------- 3c. BACKGROUND MUSIC (Karplus-Strong) ---------- */

let musicOn = true;
try { musicOn = localStorage.getItem("bahandi_music_off") !== "1"; } catch (e) { }

const MUSIC_BPM = 72;
const BEAT = 60 / MUSIC_BPM;
const midiToHz = m => 440 * Math.pow(2, (m - 69) / 12);

const KS_ROLES = {
  bass:   { brightness: 0.35, decay: 0.9950, bufDur: 2.5 },
  arp:    { brightness: 0.55, decay: 0.9960, bufDur: 1.5 },
  melody: { brightness: 0.68, decay: 0.9970, bufDur: 2.5 }
};

const ksCache = new Map();

function karplusStrongBuffer(ctx, freq, brightness, decay, dur) {
  const key = `${freq.toFixed(2)}|${brightness}|${decay}|${dur}`;
  if (ksCache.has(key)) return ksCache.get(key);

  const sr = ctx.sampleRate;
  const n = Math.floor(dur * sr);
  const buf = ctx.createBuffer(1, n, sr);
  const data = buf.getChannelData(0);
  const N = Math.max(2, Math.round(sr / freq));

  const excitation = new Float32Array(N);
  for (let i = 0; i < N; i++) excitation[i] = Math.random() * 2 - 1;
  let prev = 0;
  for (let i = 0; i < N; i++) {
    prev = prev * brightness + excitation[i] * (1 - brightness);
    excitation[i] = prev;
  }

  for (let i = 0; i < n; i++) {
    if (i < N) {
      data[i] = excitation[i];
    } else {
      const a = data[i - N];
      const b = i - N - 1 >= 0 ? data[i - N - 1] : 0;
      data[i] = decay * 0.5 * (a + b);
    }
  }

  ksCache.set(key, buf);
  return buf;
}

const PIECE = [
  { bass: 45, chord: [57, 60, 64], melody: [[0, 64, 1, 0.95], [1, 64, 1, 0.82], [2, 62, 1, 0.82]] },
  { bass: 45, chord: [57, 60, 64], melody: [[0, 60, 3, 0.92]] },
  { bass: 50, chord: [62, 65, 69], melody: [[0, 57, 1, 0.82], [1, 62, 1, 0.88], [2, 65, 1, 0.92]] },
  { bass: 50, chord: [62, 65, 69], melody: [[0, 64, 2, 0.92], [2, 62, 1, 0.82]] },
  { bass: 52, chord: [56, 59, 62], melody: [[0, 59, 1, 0.82], [1, 60, 1, 0.82], [2, 62, 1, 0.82]] },
  { bass: 52, chord: [56, 59, 62], melody: [[0, 64, 3, 0.92]] },
  { bass: 45, chord: [57, 60, 64], melody: [[0, 60, 1, 0.82], [1, 59, 1, 0.82], [2, 57, 1, 0.82]] },
  { bass: 45, chord: [57, 60, 64], melody: [] },
  { bass: 41, chord: [57, 60, 65], melody: [[0, 65, 1, 0.92], [1, 64, 1, 0.82], [2, 60, 1, 0.82]] },
  { bass: 41, chord: [57, 60, 65], melody: [[0, 62, 2, 0.92], [2, 60, 1, 0.82]] },
  { bass: 50, chord: [62, 65, 69], melody: [[0, 62, 1, 0.82], [1, 65, 1, 0.88], [2, 69, 1, 0.95]] },
  { bass: 50, chord: [62, 65, 69], melody: [[0, 67, 2, 0.92], [2, 65, 1, 0.82]] },
  { bass: 52, chord: [56, 59, 62], melody: [[0, 64, 1, 0.82], [1, 62, 1, 0.82], [2, 59, 1, 0.82]] },
  { bass: 52, chord: [56, 59, 62], melody: [[0, 60, 1, 0.82], [1, 59, 2, 0.88]] },
  { bass: 45, chord: [57, 60, 64], melody: [[0, 57, 3, 0.92]] },
  { bass: 45, chord: [57, 60, 64], melody: [] }
];

let musicMaster = null, musicDuck = null, musicTimer = null;
let musicNextBar = 0, musicBarIndex = 0;
let musicEl = null, musicFade = null;

function playPluck(ctx, dest, midi, when, holdSec, gain, role) {
  const rp = KS_ROLES[role] || KS_ROLES.arp;
  const freq = midiToHz(midi);
  const buf = karplusStrongBuffer(ctx, freq, rp.brightness, rp.decay, rp.bufDur);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(gain, when + 0.006);
  const fadeStart = when + holdSec * 0.85;
  const fadeEnd = when + holdSec + 0.15;
  env.gain.setValueAtTime(gain, fadeStart);
  env.gain.linearRampToValueAtTime(0.0001, fadeEnd);
  src.connect(env); env.connect(dest);
  src.start(when); src.stop(fadeEnd + 0.05);
  const cleanupMs = Math.max(100, (fadeEnd + 0.1 - ctx.currentTime) * 1000);
  setTimeout(() => { try { src.disconnect(); env.disconnect(); } catch (e) { } }, cleanupMs);
}

function scheduleBar(ctx, dest, barIndex, barStart) {
  const bar = PIECE[barIndex % PIECE.length];
  playPluck(ctx, dest, bar.bass, barStart, BEAT * 2.7, 0.30, "bass");
  playPluck(ctx, dest, bar.chord[1], barStart + BEAT * 1.0, BEAT * 0.85, 0.14, "arp");
  playPluck(ctx, dest, bar.chord[2], barStart + BEAT * 2.0, BEAT * 0.85, 0.15, "arp");
  playPluck(ctx, dest, bar.chord[0], barStart + BEAT * 2.5, BEAT * 0.55, 0.10, "arp");
  bar.melody.forEach(([b, midi, durBeats, amp]) => {
    const hold = BEAT * durBeats * 0.95 + 0.3;
    playPluck(ctx, dest, midi, barStart + b * BEAT, hold, 0.28 * amp, "melody");
  });
}

function prewarmMusic(ctx) {
  if (ksCache.size > 0) return;
  const byRole = { bass: new Set(), arp: new Set(), melody: new Set() };
  PIECE.forEach(bar => {
    byRole.bass.add(bar.bass);
    bar.chord.forEach(m => byRole.arp.add(m));
    bar.melody.forEach(m => byRole.melody.add(m[1]));
  });
  ["bass", "arp", "melody"].forEach(role => {
    const rp = KS_ROLES[role];
    byRole[role].forEach(midi => {
      karplusStrongBuffer(ctx, midiToHz(midi), rp.brightness, rp.decay, rp.bufDur);
    });
  });
}

function startMusic() {
  if (!musicOn) return;
  if (musicMaster || (musicEl && !musicEl.paused)) return;
  try {
    if (MUSIC_FILE) {
      if (musicFade) { clearInterval(musicFade); musicFade = null; }
      if (!musicEl) { musicEl = new Audio(MUSIC_FILE); musicEl.loop = true; }
      musicEl.volume = MUSIC_FILE_VOLUME;
      musicEl.play().catch(() => { });
      return;
    }
    const ctx = getAudio();
    if (!ctx) return;
    prewarmMusic(ctx);
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(MUSIC_VOLUME, ctx.currentTime + 2.0);
    master.connect(ctx.destination);
    const duck = ctx.createGain();
    duck.gain.value = 1.0;
    duck.connect(master);
    musicMaster = master; musicDuck = duck;
    musicNextBar = ctx.currentTime + 0.2; musicBarIndex = 0;
    const pump = () => {
      if (!musicMaster) return;
      while (musicNextBar < ctx.currentTime + 1.5) {
        scheduleBar(ctx, musicDuck, musicBarIndex, musicNextBar);
        musicNextBar += BEAT * 3; musicBarIndex++;
      }
    };
    pump(); musicTimer = setInterval(pump, 250);
  } catch (e) { }
}

function stopMusic() {
  try {
    if (musicEl && !musicEl.paused && !musicFade) {
      const el = musicEl; let v = el.volume;
      musicFade = setInterval(() => {
        v -= 0.05;
        if (v <= 0) {
          clearInterval(musicFade); musicFade = null;
          el.pause(); el.currentTime = 0; el.volume = MUSIC_FILE_VOLUME;
        } else el.volume = v;
      }, 60);
    }
    if (!musicMaster) return;
    const m = musicMaster, d = musicDuck;
    musicMaster = null; musicDuck = null;
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    const t = audioCtx.currentTime;
    m.gain.cancelScheduledValues(t);
    m.gain.setValueAtTime(m.gain.value, t);
    m.gain.linearRampToValueAtTime(0.0001, t + 0.7);
    setTimeout(() => { try { m.disconnect(); d.disconnect(); } catch (e) { } }, 1100);
  } catch (e) { }
}

function duckMusic(ms) {
  if (!musicOn || !musicDuck || !audioCtx) return;
  try {
    const t = audioCtx.currentTime, g = musicDuck.gain;
    g.cancelScheduledValues(t);
    g.linearRampToValueAtTime(0.45, t + 0.08);
    g.linearRampToValueAtTime(1.0, t + 0.08 + (ms || 500) / 1000);
  } catch (e) { }
}

function updateMusicBtn() {
  $("musicBtn").textContent = musicOn ? "Music: On" : "Music: Off";
}

function gameRunning() {
  return !!G && !G.done && !$("game").classList.contains("hidden");
}

function toggleMusic() {
  musicOn = !musicOn;
  try { localStorage.setItem("bahandi_music_off", musicOn ? "0" : "1"); } catch (e) { }
  updateMusicBtn();
  if (!musicOn) { stopMusic(); return; }
  if (gameRunning()) startMusic();
}

document.addEventListener("visibilitychange", () => {
  try {
    if (musicEl) {
      if (document.hidden) { if (!musicEl.paused) musicEl.pause(); }
      else if (musicOn && gameRunning()) { musicEl.play().catch(() => {}); }
    } else if (audioCtx) {
      if (document.hidden) audioCtx.suspend();
      else audioCtx.resume();
    }
  } catch (e) { }
});

/* ---------- 4. State ---------- */

let sel = { mode: "modern", n: 3 };
let G = null;             
let pendingGame = null;   

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

  $("startBtn").onclick       = () => showPreview(sel.n, sel.mode);
  $("beginBtn").onclick       = beginFromPreview;
  $("previewBackBtn").onclick = () => { pendingGame = null; $("preview").classList.add("hidden"); };
  $("restartBtn").onclick     = () => startGame(G.n, G.mode);
  $("againBtn").onclick       = () => { $("modal").classList.add("hidden"); startGame(G.n, G.mode); };
  $("menuBtn").onclick        = showMenu;
  $("modalMenuBtn").onclick   = showMenu;
  $("retryBtn").onclick       = () => startGame(G.n, G.mode);
  $("timeupMenuBtn").onclick  = showMenu;
  $("soundBtn").onclick       = toggleSound;
  $("musicBtn").onclick       = toggleMusic;

  updateSoundBtn();
  updateMusicBtn();

  const peekOn  = () => $("peek").classList.remove("hidden");
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
    // Uses MODE_NAMES for clean display
    const modeName = MODE_NAMES[mode] || mode;
    rows.push(`${modeName} · ${LEVELS[n].label}: ${best[k].score} pts (${fmtTime(best[k].time)})`);
  });
  $("bestList").innerHTML = rows.length ? "<strong>Best scores</strong><br>" + rows.join("<br>") : "";
}

function showMenu() {
  stopTimer();
  stopMusic();
  $("modal").classList.add("hidden");
  $("timeup").classList.add("hidden");
  $("game").classList.add("hidden");
  $("menu").classList.remove("hidden");
  renderBest();
}

/* ---------- 6. Game ---------- */

function getImageURL(mode) {
  if (PHOTOS[mode]) return PHOTOS[mode];
  return svgToURL(marketSVG());
}

function getFilter(mode) {
  return (mode === "historical" && !PHOTOS.historical) ? "sepia(.85) contrast(1.05) brightness(.95)" : "none";
}

function showPreview(n, mode) {
  pendingGame = { n, mode };
  const img = $("previewImg");
  img.src = getImageURL(mode);
  img.style.filter = getFilter(mode);
  
  // Uses MODE_NAMES for clean display
  const modeName = MODE_NAMES[mode] || "Photo";
  $("previewInfo").textContent =
    `${modeName} · ${LEVELS[n].label} (${n}×${n}, ${n * n} pieces) · ${LEVELS[n].limit / 60} min time limit`;
    
  $("preview").classList.remove("hidden");
  $("beginBtn").focus();
}

function beginFromPreview() {
  if (!pendingGame) return;
  const { n, mode } = pendingGame;
  pendingGame = null;
  $("preview").classList.add("hidden");
  startGame(n, mode);
}

function startGame(n, mode) {
  stopTimer();
  if (!muted || musicOn) getAudio();
  startMusic();

  const url = getImageURL(mode);
  const filter = getFilter(mode);

  G = {
    n, mode, url, filter,
    total: n * n, placed: 0, mistakes: 0, score: 0,
    seconds: 0, startTime: Date.now(), warned: false,
    timer: null, selected: null, done: false
  };

  $("menu").classList.add("hidden");
  $("game").classList.remove("hidden");
  $("modal").classList.add("hidden");
  $("timeup").classList.add("hidden");

  buildBoard();
  buildTray();

  const peek = $("peek");
  peek.style.backgroundImage = `url("${url}")`;
  peek.style.filter = filter;
  peek.classList.add("hidden");

  updateStats();
  G.timer = setInterval(() => {
    G.seconds = Math.floor((Date.now() - G.startTime) / 1000);
    showTime();
    const left = LEVELS[G.n].limit - G.seconds;
    if (left <= WARN_SECONDS && left > 0 && !G.warned) {
      G.warned = true;
      playSound("warning");
    }
    if (left <= 0) timeUp();
  }, 250);
}

function showTime() {
  const left = Math.max(0, LEVELS[G.n].limit - G.seconds);
  $("time").textContent = fmtTime(left);
  $("timeBox").classList.toggle("low", left <= WARN_SECONDS && !G.done);
}

function timeUp() {
  if (G.done) return;
  G.done = true;
  stopTimer();
  stopMusic();
  G.seconds = LEVELS[G.n].limit;
  showTime();

  document.querySelectorAll(".piece.ghost").forEach(g => g.remove());
  document.querySelectorAll(".slot.over").forEach(s => s.classList.remove("over"));
  document.querySelectorAll(".tray .piece").forEach(p => { p.style.opacity = ""; });
  drag = null;
  selectPiece(null);

  $("timeupInfo").textContent =
    `${LEVELS[G.n].label} · ${LEVELS[G.n].limit / 60} min limit · ${G.placed} of ${G.total} pieces placed`;
  $("tuPlaced").textContent = `${G.placed}/${G.total}`;
  $("tuScore").textContent = G.score;
  $("tuMistakes").textContent = G.mistakes;
  $("timeup").classList.remove("hidden");
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

let drag = null;

function onPieceDown(e) {
  if (G.done || e.button > 0) return;
  const piece = e.currentTarget;
  drag = {
    piece, startX: e.clientX, startY: e.clientY,
    moved: false, ghost: null, id: e.pointerId
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
    selectPiece(G.selected === piece ? null : piece);
  }
  drag = null;
}

function tryPlace(piece, slot) {
  if (G.done) return;
  if (Date.now() - G.startTime >= LEVELS[G.n].limit * 1000) { timeUp(); return; }
  const correct = piece.dataset.index === slot.dataset.index;

  if (correct) {
    const idx = Number(piece.dataset.index);
    piece.remove();
    const locked = document.createElement("div");
    locked.className = "piece locked";
    pieceStyle(locked, idx);
    slot.appendChild(locked);
    slot.style.border = "0";

    playSound("correct");
    G.placed++;
    G.score += Math.round(100 * LEVELS[G.n].mult);
    selectPiece(null);
    updateStats();
    if (G.placed === G.total) finish();
  } else {
    playSound("wrong");
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
  showTime();
  $("score").textContent = G.score;
  $("placed").textContent = `${G.placed}/${G.total}`;
  $("mistakes").textContent = G.mistakes;
}

function finish() {
  G.seconds = Math.floor((Date.now() - G.startTime) / 1000);
  G.done = true;
  stopTimer();
  stopMusic();

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

  setTimeout(() => $("modal").classList.remove("hidden"), 600);
}

/* ---------- 7. Init ---------- */
setupMenu();