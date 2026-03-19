"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/app.ts
  (() => {
    const STORAGE = {
      lang: "sanket-lang",
      theme: "sanket-theme",
      familyTheme: "sathi-family-theme",
      familyThemeMode: "sathi-family-theme-mode",
      reminderTime: "sanket-reminder",
      reminderEnabled: "sanket-reminder-enabled",
      reminderLastShown: "sanket-reminder-last-shown",
      installMarker: "sathi-installed-sanket-sathi",
      history: "sanket-history",
      practiceWins: "sanket-practice-wins",
      cloudSyncedAt: "sanket-cloud-synced-at"
    };
    const FIREBASE_CONFIG = {
      apiKey: "AIzaSyC6Cpg83N8fBuvY7YOSwTWsfM9DUsaVc3E",
      authDomain: "pariksha-sathi.firebaseapp.com",
      projectId: "pariksha-sathi",
      storageBucket: "pariksha-sathi.firebasestorage.app",
      messagingSenderId: "921721697043",
      appId: "1:921721697043:web:dada90a420c40e11ae60e6",
      measurementId: "G-NC7955J7KV"
    };
    const MORSE = {
      a: ".-",
      b: "-...",
      c: "-.-.",
      d: "-..",
      e: ".",
      f: "..-.",
      g: "--.",
      h: "....",
      i: "..",
      j: ".---",
      k: "-.-",
      l: ".-..",
      m: "--",
      n: "-.",
      o: "---",
      p: ".--.",
      q: "--.-",
      r: ".-.",
      s: "...",
      t: "-",
      u: "..-",
      v: "...-",
      w: ".--",
      x: "-..-",
      y: "-.--",
      z: "--..",
      0: "-----",
      1: ".----",
      2: "..---",
      3: "...--",
      4: "....-",
      5: ".....",
      6: "-....",
      7: "--...",
      8: "---..",
      9: "----.",
      ".": ".-.-.-",
      ",": "--..--",
      "?": "..--..",
      "!": "-.-.--",
      "-": "-....-",
      "/": "-..-.",
      "@": ".--.-.",
      " ": "/"
    };
    const DECODE = Object.fromEntries(Object.entries(MORSE).map(([key, value]) => [value, key]));
    const HINDI_MAP = {
      "\u0905": "a",
      "\u0906": "aa",
      "\u0907": "i",
      "\u0908": "ii",
      "\u0909": "u",
      "\u090A": "uu",
      "\u090F": "e",
      "\u0910": "ai",
      "\u0913": "o",
      "\u0914": "au",
      "\u0915": "ka",
      "\u0916": "kha",
      "\u0917": "ga",
      "\u0918": "gha",
      "\u091A": "cha",
      "\u091B": "chha",
      "\u091C": "ja",
      "\u091D": "jha",
      "\u091F": "ta",
      "\u0920": "tha",
      "\u0921": "da",
      "\u0922": "dha",
      "\u0924": "ta",
      "\u0925": "tha",
      "\u0926": "da",
      "\u0927": "dha",
      "\u0928": "na",
      "\u092A": "pa",
      "\u092B": "pha",
      "\u092C": "ba",
      "\u092D": "bha",
      "\u092E": "ma",
      "\u092F": "ya",
      "\u0930": "ra",
      "\u0932": "la",
      "\u0935": "va",
      "\u0936": "sha",
      "\u0937": "sha",
      "\u0938": "sa",
      "\u0939": "ha",
      "\u0902": "n",
      "\u0903": "h",
      "\u093E": "a",
      "\u093F": "i",
      "\u0940": "i",
      "\u0941": "u",
      "\u0942": "u",
      "\u0947": "e",
      "\u0948": "ai",
      "\u094B": "o",
      "\u094C": "au",
      "\u094D": ""
    };
    const PRACTICE_BANK = [
      "sos",
      "help",
      "india",
      "code",
      "signal",
      "night",
      "light",
      "radio",
      "team",
      "sathi",
      "hello",
      "rescue",
      "focus",
      "alert",
      "calm"
    ];
    const UI_COPY = {
      hi: {
        menuLabel: "Quick Controls",
        menuTitle: "Sanket menu",
        languageLabel: "Language",
        languageTitle: "Hindi aur English",
        themeLabel: "Theme",
        themeTitle: "Signal studio mode",
        themeAction: "Theme badlo",
        installLabel: "Install",
        installTitle: "App ko phone par rakho",
        installAction: "Install app",
        authLabel: "Family login",
        authTitle: "Ek login, poori family",
        authLoading: "Login status load ho raha hai...",
        authSignIn: "Login with Google",
        authSignOut: "Logout",
        authSignedAs: "Signed in as",
        authLoggedOut: "Abhi family login active nahi hai.",
        reminderLabel: "Reminder",
        reminderTitle: "Daily practice nudge",
        reminderField: "Preferred reminder time",
        reminderSave: "Reminder save karo",
        pagesLabel: "Pages",
        pagesTitle: "Family links aur info",
        pageAbout: "About",
        pageResources: "Resources",
        pageContact: "Contact",
        pagePrivacy: "Privacy Policy",
        pageTerms: "Terms & Conditions",
        pageFamily: "Aapka-Sathi Family",
        brandTag: "Signal desk",
        familyChip: "Aapka-Sathi family ka hissa",
        heroHeadline: "Text ko Morse me badlo, Morse ko decode karo, aur roz thoda signal practice bhi karo.",
        heroText: "Translator, decoder, quick guide, aur memory-practice flow ek hi app shell me milta hai taaki Sanket Sathi page nahi balki proper signal tool lage.",
        badgeOne: "Text \u2192 Morse",
        badgeTwo: "Morse \u2192 Text",
        badgeThree: "Daily practice",
        metricHistoryLabel: "Recent work",
        metricPracticeLabel: "Practice wins",
        metricSyncLabel: "Family sync",
        historyMetricEmpty: "Abhi koi translation history nahi hai.",
        practiceMetricMeta: "Har sahi answer yahan count hoga.",
        syncReady: "Ready",
        syncMetaIdle: "Login karte hi settings aur history sync ho jayegi."
      },
      en: {
        menuLabel: "Quick Controls",
        menuTitle: "Sanket menu",
        languageLabel: "Language",
        languageTitle: "Hindi and English",
        themeLabel: "Theme",
        themeTitle: "Signal studio mode",
        themeAction: "Change theme",
        installLabel: "Install",
        installTitle: "Keep the app on your phone",
        installAction: "Install app",
        authLabel: "Family login",
        authTitle: "One login, whole family",
        authLoading: "Loading login status...",
        authSignIn: "Login with Google",
        authSignOut: "Logout",
        authSignedAs: "Signed in as",
        authLoggedOut: "No family login is active right now.",
        reminderLabel: "Reminder",
        reminderTitle: "Daily practice nudge",
        reminderField: "Preferred reminder time",
        reminderSave: "Save reminder",
        pagesLabel: "Pages",
        pagesTitle: "Family links and info",
        pageAbout: "About",
        pageResources: "Resources",
        pageContact: "Contact",
        pagePrivacy: "Privacy Policy",
        pageTerms: "Terms & Conditions",
        pageFamily: "Aapka-Sathi Family",
        brandTag: "Signal desk",
        familyChip: "Part of Aapka-Sathi family",
        heroHeadline: "Convert text to Morse, decode Morse back to text, and keep a daily signal practice habit.",
        heroText: "The translator, decoder, quick guide, and memory-practice flow live inside one app shell so Sanket Sathi feels like a real signal tool instead of a single page.",
        badgeOne: "Text to Morse",
        badgeTwo: "Morse to Text",
        badgeThree: "Daily practice",
        metricHistoryLabel: "Recent work",
        metricPracticeLabel: "Practice wins",
        metricSyncLabel: "Family sync",
        historyMetricEmpty: "No translation history yet.",
        practiceMetricMeta: "Every correct answer is counted here.",
        syncReady: "Ready",
        syncMetaIdle: "Sign in to sync settings and history."
      }
    };
    const APP_COPY = {
      hi: {
        tabEncode: "Text \u2192 Morse",
        tabDecode: "Morse \u2192 Text",
        tabPractice: "Practice",
        encodeLabel: "Encoder",
        encodeTitle: "Text ko Morse me badlo",
        decodeLabel: "Decoder",
        decodeTitle: "Morse ko readable text banao",
        practiceLabel: "Practice",
        practiceTitle: "Aaj ka signal challenge",
        plainLabel: "Text",
        morseLabel: "Morse",
        encodeAction: "Translate to Morse",
        decodeAction: "Decode to Text",
        copyMorse: "Copy Morse",
        copyText: "Copy Text",
        practiceAnswerLabel: "Answer",
        practiceCheck: "Check answer",
        practiceNext: "Next challenge",
        practiceIdle: "Roz 2-3 quick drills se Morse memory fast hoti hai.",
        practiceCorrect: "Bilkul sahi. Yeh signal memory strong ho rahi hai.",
        practiceWrong: (answer) => `Thoda aur try karo. Sahi answer: ${answer.toUpperCase()}.`,
        guideLabel: "Guide",
        guideTitle: "Format rules",
        guideLetterGap: "Letter gap",
        guideWordGap: "Word gap",
        guideHindiMode: "Hindi mode",
        signalsLabel: "Quick codes",
        signalsTitle: "Useful signal memory",
        historyLabel: "History",
        historyTitle: "Recent translations",
        historyEmpty: "Abhi tak koi translation save nahi hui.",
        profileLabel: "Profile",
        profileTitle: "App status",
        profileTheme: "Theme",
        profileReminder: "Reminder",
        profileCloud: "Cloud",
        profileWins: "Wins",
        profileHistory: "Saved items",
        footerNote: "Signal practice aur translation ko pocket-friendly rakhne ke liye.",
        reminderSaved: (time) => `Daily practice reminder ${time} par save ho gaya.`,
        reminderBlocked: "Notification permission off hai, isliye sirf local reminder save hua hai.",
        installUnavailable: "Install prompt abhi available nahi hai. Browser menu se install try karo.",
        cloudReady: "Family sync ready",
        cloudUser: "Family account linked",
        cloudSavedAt: (value) => `Last cloud save: ${value}`,
        restoredItem: "History se restore kiya gaya.",
        copied: "Copied",
        pending: "Not set",
        practiceNotificationTitle: "Sanket Sathi",
        practiceNotificationBody: "Aaj ka quick Morse practice challenge ready hai."
      },
      en: {
        tabEncode: "Text to Morse",
        tabDecode: "Morse to Text",
        tabPractice: "Practice",
        encodeLabel: "Encoder",
        encodeTitle: "Convert text into Morse",
        decodeLabel: "Decoder",
        decodeTitle: "Turn Morse into readable text",
        practiceLabel: "Practice",
        practiceTitle: "Today's signal challenge",
        plainLabel: "Text",
        morseLabel: "Morse",
        encodeAction: "Translate to Morse",
        decodeAction: "Decode to Text",
        copyMorse: "Copy Morse",
        copyText: "Copy Text",
        practiceAnswerLabel: "Answer",
        practiceCheck: "Check answer",
        practiceNext: "Next challenge",
        practiceIdle: "A few quick drills each day make Morse recall much faster.",
        practiceCorrect: "Correct. Your signal memory is getting sharper.",
        practiceWrong: (answer) => `Try again. The correct answer is ${answer.toUpperCase()}.`,
        guideLabel: "Guide",
        guideTitle: "Format rules",
        guideLetterGap: "Letter gap",
        guideWordGap: "Word gap",
        guideHindiMode: "Hindi mode",
        signalsLabel: "Quick codes",
        signalsTitle: "Useful signal memory",
        historyLabel: "History",
        historyTitle: "Recent translations",
        historyEmpty: "No translations saved yet.",
        profileLabel: "Profile",
        profileTitle: "App status",
        profileTheme: "Theme",
        profileReminder: "Reminder",
        profileCloud: "Cloud",
        profileWins: "Wins",
        profileHistory: "Saved items",
        footerNote: "Built to keep signal practice and translation pocket friendly.",
        reminderSaved: (time) => `A daily practice reminder was saved for ${time}.`,
        reminderBlocked: "Notification permission is off, so only the local reminder was saved.",
        installUnavailable: "The install prompt is not available yet. Try the browser install option.",
        cloudReady: "Family sync ready",
        cloudUser: "Family account linked",
        cloudSavedAt: (value) => `Last cloud save: ${value}`,
        restoredItem: "Restored from history.",
        copied: "Copied",
        pending: "Not set",
        practiceNotificationTitle: "Sanket Sathi",
        practiceNotificationBody: "Your quick Morse practice challenge is ready."
      }
    };
    const state = {
      lang: localStorage.getItem(STORAGE.lang) || "hi",
      theme: resolveTheme(getThemePreference()),
      mode: "encode",
      reminderTime: localStorage.getItem(STORAGE.reminderTime) || "19:30",
      authUser: null,
      deferredPrompt: null,
      history: loadHistory(),
      practiceWins: Number(localStorage.getItem(STORAGE.practiceWins) || "0"),
      challenge: buildChallenge(),
      lastMessage: ""
    };
    const firebaseContext = { db: null, sdk: null, saveTimer: null };
    function $(id) {
      return document.getElementById(id);
    }
    function inputEl(id) {
      return document.getElementById(id);
    }
    function textEl(id) {
      return document.getElementById(id);
    }
    function t(key) {
      return UI_COPY[state.lang][key];
    }
    function a(key) {
      return APP_COPY[state.lang][key];
    }
    function getThemePreference() {
      return localStorage.getItem(STORAGE.familyThemeMode) || localStorage.getItem(STORAGE.familyTheme) || localStorage.getItem(STORAGE.theme) || "system";
    }
    function resolveTheme(themePreference) {
      if (themePreference === "night" || themePreference === "dawn") return themePreference;
      const base = themePreference === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : themePreference;
      return base === "light" ? "dawn" : "night";
    }
    function setTheme(theme, persist = true) {
      state.theme = theme;
      document.body.dataset.theme = theme;
      if (!persist) return;
      localStorage.setItem(STORAGE.theme, theme);
      localStorage.setItem(STORAGE.familyThemeMode, theme);
      localStorage.setItem(STORAGE.familyTheme, theme === "dawn" ? "light" : "dark");
      renderProfileCard();
      queueCloudSave();
    }
    function toggleTheme() {
      setTheme(state.theme === "night" ? "dawn" : "night");
    }
    function formatDateTime(value) {
      return new Date(value).toLocaleString(state.lang === "hi" ? "hi-IN" : "en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      });
    }
    function normalizeAnswer(value) {
      return transliterateHindi(value.toLowerCase()).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
    }
    function transliterateHindi(input) {
      return input.split("").map((char) => HINDI_MAP[char] ?? char).join("");
    }
    function encodeToMorse(value) {
      return transliterateHindi(value.toLowerCase()).split("").map((char) => MORSE[char] ?? char).join(" ").replace(/\s+/g, " ").trim();
    }
    function decodeMorse(value) {
      return value.trim().split(/\s+/).map((chunk) => chunk === "/" ? " " : DECODE[chunk] ?? "?").join("").replace(/\s+/g, " ").trim();
    }
    function loadHistory() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE.history) || "[]");
      } catch {
        return [];
      }
    }
    function saveHistory(entry) {
      state.history = [entry, ...state.history].slice(0, 10);
      localStorage.setItem(STORAGE.history, JSON.stringify(state.history));
      renderHistory();
      renderMetrics();
      renderProfileCard();
      queueCloudSave();
    }
    function buildChallenge() {
      const answer = PRACTICE_BANK[Math.floor(Math.random() * PRACTICE_BANK.length)];
      return { answer, morse: encodeToMorse(answer) };
    }
    function syncAuthUi() {
      const authStateText = $("authStateText");
      const authBtn = $("authBtn");
      if (state.authUser) {
        authStateText.textContent = `${t("authSignedAs")} ${state.authUser.displayName || state.authUser.email || "User"}`;
        authBtn.textContent = t("authSignOut");
      } else {
        authStateText.textContent = t("authLoggedOut");
        authBtn.textContent = t("authSignIn");
      }
      renderMetrics();
      renderProfileCard();
    }
    function applyCopy() {
      $("menuLabel").textContent = t("menuLabel");
      $("menuTitle").textContent = t("menuTitle");
      $("languageLabel").textContent = t("languageLabel");
      $("languageTitle").textContent = t("languageTitle");
      $("themeLabel").textContent = t("themeLabel");
      $("themeTitle").textContent = t("themeTitle");
      $("themeBtn").textContent = t("themeAction");
      $("installLabel").textContent = t("installLabel");
      $("installTitle").textContent = t("installTitle");
      $("installBtn").textContent = t("installAction");
      $("authLabel").textContent = t("authLabel");
      $("authTitle").textContent = t("authTitle");
      $("reminderLabel").textContent = t("reminderLabel");
      $("reminderTitle").textContent = t("reminderTitle");
      $("reminderField").textContent = t("reminderField");
      $("saveReminderBtn").textContent = t("reminderSave");
      $("pagesLabel").textContent = t("pagesLabel");
      $("pagesTitle").textContent = t("pagesTitle");
      $("pageAbout").textContent = t("pageAbout");
      $("pageResources").textContent = t("pageResources");
      $("pageContact").textContent = t("pageContact");
      $("pagePrivacy").textContent = t("pagePrivacy");
      $("pageTerms").textContent = t("pageTerms");
      $("pageFamily").textContent = t("pageFamily");
      $("brandTag").textContent = t("brandTag");
      $("familyChip").textContent = t("familyChip");
      $("heroHeadline").textContent = t("heroHeadline");
      $("heroText").textContent = t("heroText");
      $("badgeOne").textContent = t("badgeOne");
      $("badgeTwo").textContent = t("badgeTwo");
      $("badgeThree").textContent = t("badgeThree");
      $("metricHistoryLabel").textContent = t("metricHistoryLabel");
      $("metricPracticeLabel").textContent = t("metricPracticeLabel");
      $("metricSyncLabel").textContent = t("metricSyncLabel");
      $("encodeLabel").textContent = a("encodeLabel");
      $("encodeTitle").textContent = a("encodeTitle");
      $("decodeLabel").textContent = a("decodeLabel");
      $("decodeTitle").textContent = a("decodeTitle");
      $("practiceLabel").textContent = a("practiceLabel");
      $("practiceTitle").textContent = a("practiceTitle");
      $("plainLabel").textContent = a("plainLabel");
      $("morseLabel").textContent = a("morseLabel");
      $("encodeBtn").textContent = a("encodeAction");
      $("decodeBtn").textContent = a("decodeAction");
      $("copyMorseBtn").textContent = a("copyMorse");
      $("copyTextBtn").textContent = a("copyText");
      $("practiceAnswerLabel").textContent = a("practiceAnswerLabel");
      $("checkPracticeBtn").textContent = a("practiceCheck");
      $("nextPracticeBtn").textContent = a("practiceNext");
      $("guideLabel").textContent = a("guideLabel");
      $("guideTitle").textContent = a("guideTitle");
      $("guideLetterGap").textContent = a("guideLetterGap");
      $("guideWordGap").textContent = a("guideWordGap");
      $("guideHindiMode").textContent = a("guideHindiMode");
      $("signalsLabel").textContent = a("signalsLabel");
      $("signalsTitle").textContent = a("signalsTitle");
      $("historyLabel").textContent = a("historyLabel");
      $("historyTitle").textContent = a("historyTitle");
      $("profileLabel").textContent = a("profileLabel");
      $("profileTitle").textContent = a("profileTitle");
      $("footerNote").textContent = a("footerNote");
      syncAuthUi();
      renderTabs();
      renderHistory();
      renderProfileCard();
      renderMetrics();
      if (!state.lastMessage) {
        $("practiceFeedback").textContent = a("practiceIdle");
      }
    }
    function setLanguage(lang) {
      state.lang = lang;
      localStorage.setItem(STORAGE.lang, lang);
      $("langHiBtn").classList.toggle("active", lang === "hi");
      $("langEnBtn").classList.toggle("active", lang === "en");
      applyCopy();
      queueCloudSave();
    }
    function renderTabs() {
      $("modeTabs").innerHTML = `
      <button class="tab-btn ${state.mode === "encode" ? "active" : ""}" type="button" data-mode="encode">${a("tabEncode")}</button>
      <button class="tab-btn ${state.mode === "decode" ? "active" : ""}" type="button" data-mode="decode">${a("tabDecode")}</button>
      <button class="tab-btn ${state.mode === "practice" ? "active" : ""}" type="button" data-mode="practice">${a("tabPractice")}</button>
    `;
      document.querySelectorAll(".tool-view").forEach((view) => {
        view.classList.toggle("active", view.id === `view-${state.mode}`);
      });
    }
    function renderHistory() {
      const root = $("historyList");
      if (!state.history.length) {
        root.innerHTML = `<div class="history-empty">${a("historyEmpty")}</div>`;
        return;
      }
      root.innerHTML = state.history.map((entry) => `
      <button class="history-item" type="button" data-history-id="${entry.id}">
        <strong>${entry.mode === "encode" ? a("tabEncode") : a("tabDecode")}</strong>
        <div>${entry.output.slice(0, 72) || "--"}</div>
        <small>${formatDateTime(entry.createdAt)}</small>
      </button>
    `).join("");
    }
    function renderProfileCard() {
      const synced = localStorage.getItem(STORAGE.cloudSyncedAt);
      const theme = state.theme === "night" ? "Night" : "Dawn";
      $("profileCard").innerHTML = `
      <div class="stack-row"><span>${a("profileTheme")}</span><strong>${theme}</strong></div>
      <div class="stack-row"><span>${a("profileReminder")}</span><strong>${localStorage.getItem(STORAGE.reminderEnabled) === "true" ? state.reminderTime : a("pending")}</strong></div>
      <div class="stack-row"><span>${a("profileCloud")}</span><strong>${state.authUser ? a("cloudUser") : a("cloudReady")}</strong></div>
      <div class="stack-row"><span>${a("profileWins")}</span><strong>${state.practiceWins}</strong></div>
      <div class="stack-row"><span>${a("profileHistory")}</span><strong>${state.history.length}</strong></div>
      ${synced ? `<div class="stack-row"><span>Sync</span><strong>${formatDateTime(synced)}</strong></div>` : ""}
    `;
    }
    function renderMetrics() {
      $("historyMetricValue").textContent = String(state.history.length);
      $("historyMetricMeta").textContent = state.history[0] ? formatDateTime(state.history[0].createdAt) : t("historyMetricEmpty");
      $("practiceMetricValue").textContent = String(state.practiceWins);
      $("practiceMetricMeta").textContent = t("practiceMetricMeta");
      $("syncMetricValue").textContent = state.authUser ? "Linked" : t("syncReady");
      const synced = localStorage.getItem(STORAGE.cloudSyncedAt);
      $("syncMetricMeta").textContent = state.authUser && synced ? a("cloudSavedAt")(formatDateTime(synced)) : t("syncMetaIdle");
    }
    function openDrawer() {
      $("drawer").classList.add("open");
      $("drawer").setAttribute("aria-hidden", "false");
    }
    function closeDrawer() {
      $("drawer").classList.remove("open");
      $("drawer").setAttribute("aria-hidden", "true");
    }
    async function copyOutput(id) {
      const text = $(id).textContent || "";
      if (!text || text === "--") return;
      await navigator.clipboard.writeText(text);
      state.lastMessage = a("copied");
    }
    function pushHistory(mode, input, output) {
      if (!input.trim() || !output.trim() || output === "--") return;
      saveHistory({ id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, mode, input, output, createdAt: (/* @__PURE__ */ new Date()).toISOString() });
    }
    function encodeText() {
      const plain = textEl("plainInput").value.trim();
      const output = encodeToMorse(plain);
      $("morseOutput").textContent = output || "--";
      pushHistory("encode", plain, output);
    }
    function decodeText() {
      const raw = textEl("morseInput").value.trim();
      const output = decodeMorse(raw);
      $("textOutput").textContent = output || "--";
      pushHistory("decode", raw, output);
    }
    function renderPractice() {
      $("practicePrompt").textContent = state.challenge.morse;
      if (!state.lastMessage) {
        $("practiceFeedback").textContent = a("practiceIdle");
      }
    }
    function checkPractice() {
      const answer = normalizeAnswer(inputEl("practiceAnswer").value);
      const expected = normalizeAnswer(state.challenge.answer);
      if (!answer) {
        $("practiceFeedback").textContent = a("practiceIdle");
        return;
      }
      if (answer === expected) {
        state.practiceWins += 1;
        localStorage.setItem(STORAGE.practiceWins, String(state.practiceWins));
        state.lastMessage = a("practiceCorrect");
        $("practiceFeedback").textContent = state.lastMessage;
        renderMetrics();
        renderProfileCard();
        queueCloudSave();
        state.challenge = buildChallenge();
        inputEl("practiceAnswer").value = "";
        renderPractice();
        $("practiceFeedback").textContent = state.lastMessage;
        return;
      }
      state.lastMessage = a("practiceWrong")(state.challenge.answer);
      $("practiceFeedback").textContent = state.lastMessage;
    }
    function nextPractice() {
      state.challenge = buildChallenge();
      inputEl("practiceAnswer").value = "";
      state.lastMessage = "";
      renderPractice();
    }
    function restoreFromHistory(id) {
      const item = state.history.find((entry) => entry.id === id);
      if (!item) return;
      state.mode = item.mode === "encode" ? "encode" : "decode";
      renderTabs();
      if (item.mode === "encode") {
        textEl("plainInput").value = item.input;
        $("morseOutput").textContent = item.output;
      } else {
        textEl("morseInput").value = item.input;
        $("textOutput").textContent = item.output;
      }
      state.lastMessage = a("restoredItem");
    }
    function queueCloudSave() {
      if (!state.authUser || !firebaseContext.db || !firebaseContext.sdk) return;
      if (firebaseContext.saveTimer) window.clearTimeout(firebaseContext.saveTimer);
      firebaseContext.saveTimer = window.setTimeout(() => {
        void saveCloudState();
      }, 700);
    }
    async function saveCloudState() {
      if (!state.authUser || !firebaseContext.db || !firebaseContext.sdk) return;
      try {
        const { doc, setDoc } = firebaseContext.sdk;
        const ref = doc(firebaseContext.db, "users", state.authUser.uid, "apps", "sanket-sathi", "state", "default");
        await setDoc(ref, {
          history: state.history,
          lang: state.lang,
          theme: state.theme,
          reminderTime: state.reminderTime,
          practiceWins: state.practiceWins,
          syncedAt: (/* @__PURE__ */ new Date()).toISOString()
        }, { merge: true });
        localStorage.setItem(STORAGE.cloudSyncedAt, (/* @__PURE__ */ new Date()).toISOString());
        renderMetrics();
        renderProfileCard();
      } catch (error) {
        console.error("Cloud save failed", error);
      }
    }
    async function loadCloudState() {
      if (!state.authUser || !firebaseContext.db || !firebaseContext.sdk) return;
      try {
        const { doc, getDoc } = firebaseContext.sdk;
        const ref = doc(firebaseContext.db, "users", state.authUser.uid, "apps", "sanket-sathi", "state", "default");
        const snapshot = await getDoc(ref);
        if (!snapshot.exists()) return;
        const data = snapshot.data();
        if (Array.isArray(data.history)) {
          state.history = data.history;
          localStorage.setItem(STORAGE.history, JSON.stringify(state.history));
        }
        if (typeof data.lang === "string") {
          state.lang = data.lang === "en" ? "en" : "hi";
          localStorage.setItem(STORAGE.lang, state.lang);
        }
        if (typeof data.theme === "string" && (data.theme === "night" || data.theme === "dawn")) {
          setTheme(data.theme, true);
        }
        if (typeof data.reminderTime === "string") {
          state.reminderTime = data.reminderTime;
          localStorage.setItem(STORAGE.reminderTime, state.reminderTime);
        }
        if (typeof data.practiceWins === "number") {
          state.practiceWins = data.practiceWins;
          localStorage.setItem(STORAGE.practiceWins, String(state.practiceWins));
        }
        if (typeof data.syncedAt === "string") {
          localStorage.setItem(STORAGE.cloudSyncedAt, data.syncedAt);
        }
        inputEl("reminderTime").value = state.reminderTime;
        setLanguage(state.lang);
        renderHistory();
        renderMetrics();
        renderProfileCard();
      } catch (error) {
        console.error("Cloud load failed", error);
      }
    }
    async function initFamilyAuth() {
      try {
        const firebaseApp = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js");
        const firebaseAuth = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js");
        const firebaseStore = await import("https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js");
        const app = firebaseApp.initializeApp(FIREBASE_CONFIG, "sanket-sathi-family-app");
        const auth = firebaseAuth.getAuth(app);
        const provider = new firebaseAuth.GoogleAuthProvider();
        const db = firebaseStore.getFirestore(app);
        firebaseContext.db = db;
        firebaseContext.sdk = { ...firebaseAuth, ...firebaseStore };
        inputEl("authBtn").addEventListener("click", async () => {
          if (state.authUser) {
            await firebaseAuth.signOut(auth);
          } else {
            await firebaseAuth.signInWithPopup(auth, provider);
          }
        });
        firebaseAuth.onAuthStateChanged(auth, async (user) => {
          state.authUser = user ? { uid: user.uid, displayName: user.displayName, email: user.email } : null;
          syncAuthUi();
          if (state.authUser) {
            await loadCloudState();
            queueCloudSave();
          }
        });
      } catch (error) {
        console.error("Family auth unavailable", error);
        syncAuthUi();
      }
    }
    async function saveReminder() {
      state.reminderTime = inputEl("reminderTime").value || "19:30";
      localStorage.setItem(STORAGE.reminderTime, state.reminderTime);
      localStorage.setItem(STORAGE.reminderEnabled, "true");
      const notificationSupported = "Notification" in window;
      if (notificationSupported && Notification.permission === "default") {
        try {
          await Notification.requestPermission();
        } catch (error) {
          console.error("Notification permission failed", error);
        }
      }
      $("reminderStatus").textContent = notificationSupported && Notification.permission === "granted" ? a("reminderSaved")(state.reminderTime) : a("reminderBlocked");
      renderProfileCard();
      queueCloudSave();
    }
    async function maybeShowReminder() {
      if (localStorage.getItem(STORAGE.reminderEnabled) !== "true") return;
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      if (!("serviceWorker" in navigator)) return;
      const [hours, minutes] = (localStorage.getItem(STORAGE.reminderTime) || state.reminderTime).split(":").map((part) => Number(part));
      const now = /* @__PURE__ */ new Date();
      const dueToday = /* @__PURE__ */ new Date();
      dueToday.setHours(hours, minutes, 0, 0);
      const today = now.toISOString().slice(0, 10);
      if (now < dueToday || localStorage.getItem(STORAGE.reminderLastShown) === today) return;
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return;
      await registration.showNotification(a("practiceNotificationTitle"), {
        body: a("practiceNotificationBody"),
        tag: "sanket-practice-reminder"
      });
      localStorage.setItem(STORAGE.reminderLastShown, today);
    }
    function initInstallFlow() {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        state.deferredPrompt = event;
      });
      window.addEventListener("appinstalled", () => {
        localStorage.setItem(STORAGE.installMarker, "true");
        state.deferredPrompt = null;
      });
    }
    async function triggerInstall() {
      if (!state.deferredPrompt) {
        window.alert(a("installUnavailable"));
        return;
      }
      await state.deferredPrompt.prompt();
      await state.deferredPrompt.userChoice;
    }
    async function registerServiceWorker() {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("./sw.js");
        } catch (error) {
          console.error("Service worker registration failed", error);
        }
      }
    }
    function bindEvents() {
      $("langHiBtn").addEventListener("click", () => setLanguage("hi"));
      $("langEnBtn").addEventListener("click", () => setLanguage("en"));
      $("themeBtn").addEventListener("click", () => toggleTheme());
      $("openDrawerBtn").addEventListener("click", openDrawer);
      $("closeDrawerBtn").addEventListener("click", closeDrawer);
      $("drawer").addEventListener("click", (event) => {
        if (event.target === $("drawer")) closeDrawer();
      });
      $("encodeBtn").addEventListener("click", encodeText);
      $("decodeBtn").addEventListener("click", decodeText);
      $("copyMorseBtn").addEventListener("click", () => {
        void copyOutput("morseOutput");
      });
      $("copyTextBtn").addEventListener("click", () => {
        void copyOutput("textOutput");
      });
      $("checkPracticeBtn").addEventListener("click", checkPractice);
      $("nextPracticeBtn").addEventListener("click", nextPractice);
      $("saveReminderBtn").addEventListener("click", () => {
        void saveReminder();
      });
      $("installBtn").addEventListener("click", () => {
        void triggerInstall();
      });
      $("modeTabs").addEventListener("click", (event) => {
        const target = event.target;
        const mode = target.dataset.mode;
        if (!mode) return;
        state.mode = mode;
        renderTabs();
      });
      $("historyList").addEventListener("click", (event) => {
        const target = event.target instanceof HTMLElement ? event.target.closest("[data-history-id]") : null;
        const id = target?.dataset.historyId;
        if (!id) return;
        restoreFromHistory(id);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeDrawer();
      });
    }
    void (async function init() {
      inputEl("reminderTime").value = state.reminderTime;
      document.body.dataset.theme = state.theme;
      await registerServiceWorker();
      initInstallFlow();
      bindEvents();
      setLanguage(state.lang);
      renderPractice();
      await initFamilyAuth();
      await maybeShowReminder();
    })();
  })();
})();
