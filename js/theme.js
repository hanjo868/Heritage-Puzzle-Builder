/**
 * Persistent light/dark theme for Project Bahandi static pages and Digital Map.
 * Storage key is shared so the map and archive pages stay in sync.
 */
(function initBahandiTheme(global) {
  const KEY = "bahandi-theme";
  const ICON_MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8 A9 9 0 1 1 11.2 3 A7 7 0 0 0 21 12.8 Z"/></svg>';
  const ICON_SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>';

  function current() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_err) {
      /* private mode */
    }
    return "dark";
  }

  function apply(theme) {
    const next = theme === "light" ? "light" : "dark";
    const light = next === "light";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.classList.toggle("theme-light", light);
    if (document.body) document.body.classList.toggle("theme-light", light);
    try {
      localStorage.setItem(KEY, next);
    } catch (_err) {
      /* ignore quota / private mode */
    }
    document.querySelectorAll("#theme-toggle, [data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(light));
      btn.setAttribute("title", light ? "Switch to dark theme" : "Switch to light theme");
      btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      btn.innerHTML = light ? ICON_SUN : ICON_MOON;
    });
    global.dispatchEvent(new CustomEvent("bahandi-theme-change", { detail: { theme: next } }));
  }

  function toggle() {
    apply(current() === "light" ? "dark" : "light");
  }

  function bind() {
    apply(current());
    document.querySelectorAll("#theme-toggle, [data-theme-toggle]").forEach((btn) => {
      if (btn.dataset.themeBound === "1") return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", toggle);
    });

    const navToggle = document.getElementById("nav-menu-toggle");
    const nav = document.querySelector(".nav-links");
    const mapPage = Boolean(document.getElementById("map"));
    if (!mapPage && navToggle && nav && navToggle.dataset.navBound !== "1") {
      navToggle.dataset.navBound = "1";
      navToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        document.body.classList.toggle("nav-open", open);
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  apply(current());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  global.bahandiTheme = { apply, current, toggle };
})(window);
