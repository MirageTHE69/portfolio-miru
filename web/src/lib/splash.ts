/**
 * The splash screen plays once per browser session. A tiny inline script in
 * the document head sets <html data-splash="play|seen"> before first paint,
 * and the splash sets it to "done" when it finishes.
 *
 * Add ?splash to any URL to replay it.
 */
export const SPLASH_DONE_EVENT = "splash:done";

export function splashPending() {
  return typeof document !== "undefined" && document.documentElement.dataset.splash === "play";
}

/** Runs `cb` once the splash has finished (immediately if it is not playing). */
export function onSplashDone(cb: () => void) {
  if (!splashPending()) {
    cb();
    return () => {};
  }
  window.addEventListener(SPLASH_DONE_EVENT, cb, { once: true });
  return () => window.removeEventListener(SPLASH_DONE_EVENT, cb);
}

/**
 * Inline script: decides before first paint whether the splash should play,
 * and adds the "fx" class that lets CSS hide text waiting for its reveal.
 */
export const splashBootScript = [
  "(function(){var d=document.documentElement;try{",
  "var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;",
  "var force=/[?&]splash(=|&|$)/.test(location.search);",
  "if(!rm)d.classList.add('fx');",
  "d.dataset.splash=(!rm&&(force||!sessionStorage.getItem('md-splash')))?'play':'seen';",
  "}catch(e){d.dataset.splash='seen';}})();",
].join("");
