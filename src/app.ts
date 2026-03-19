(() => {
  type Lang = "hi" | "en";
  type ThemeMode = "night" | "dawn";
  type Mode = "encode" | "decode" | "practice";

  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  }

  type HistoryEntry = {
    id: string;
    mode: "encode" | "decode";
    input: string;
    output: string;
    createdAt: string;
  };

  type PracticeChallenge = {
    answer: string;
    morse: string;
  };

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
  } as const;

  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC6Cpg83N8fBuvY7YOSwTWsfM9DUsaVc3E",
    authDomain: "pariksha-sathi.firebaseapp.com",
    projectId: "pariksha-sathi",
    storageBucket: "pariksha-sathi.firebasestorage.app",
    messagingSenderId: "921721697043",
    appId: "1:921721697043:web:dada90a420c40e11ae60e6",
    measurementId: "G-NC7955J7KV"
  } as const;

  const MORSE: Record<string, string> = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---",
    k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
    u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..",
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-.", " ": "/"
  };

  const DECODE = Object.fromEntries(Object.entries(MORSE).map(([key, value]) => [value, key]));

  const HINDI_MAP: Record<string, string> = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ii", "उ": "u", "ऊ": "uu", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
    "क": "ka", "ख": "kha", "ग": "ga", "घ": "gha", "च": "cha", "छ": "chha", "ज": "ja", "झ": "jha", "ट": "ta", "ठ": "tha",
    "ड": "da", "ढ": "dha", "त": "ta", "थ": "tha", "द": "da", "ध": "dha", "न": "na", "प": "pa", "फ": "pha", "ब": "ba", "भ": "bha",
    "म": "ma", "य": "ya", "र": "ra", "ल": "la", "व": "va", "श": "sha", "ष": "sha", "स": "sa", "ह": "ha", "ं": "n", "ः": "h",
    "ा": "a", "ि": "i", "ी": "i", "ु": "u", "ू": "u", "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "्": ""
  };

  const PRACTICE_BANK = [
    "sos", "help", "india", "code", "signal", "night", "light", "radio",
    "team", "sathi", "hello", "rescue", "focus", "alert", "calm"
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
      badgeOne: "Text → Morse",
      badgeTwo: "Morse → Text",
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
  } as const;

  const APP_COPY = {
    hi: {
      tabEncode: "Text → Morse",
      tabDecode: "Morse → Text",
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
      practiceWrong: (answer: string) => `Thoda aur try karo. Sahi answer: ${answer.toUpperCase()}.`,
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
      reminderSaved: (time: string) => `Daily practice reminder ${time} par save ho gaya.`,
      reminderBlocked: "Notification permission off hai, isliye sirf local reminder save hua hai.",
      installUnavailable: "Install prompt abhi available nahi hai. Browser menu se install try karo.",
      cloudReady: "Family sync ready",
      cloudUser: "Family account linked",
      cloudSavedAt: (value: string) => `Last cloud save: ${value}`,
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
      practiceWrong: (answer: string) => `Try again. The correct answer is ${answer.toUpperCase()}.`,
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
      reminderSaved: (time: string) => `A daily practice reminder was saved for ${time}.`,
      reminderBlocked: "Notification permission is off, so only the local reminder was saved.",
      installUnavailable: "The install prompt is not available yet. Try the browser install option.",
      cloudReady: "Family sync ready",
      cloudUser: "Family account linked",
      cloudSavedAt: (value: string) => `Last cloud save: ${value}`,
      restoredItem: "Restored from history.",
      copied: "Copied",
      pending: "Not set",
      practiceNotificationTitle: "Sanket Sathi",
      practiceNotificationBody: "Your quick Morse practice challenge is ready."
    }
  } as const;

  const state = {
    lang: (localStorage.getItem(STORAGE.lang) as Lang) || "hi",
    theme: resolveTheme(getThemePreference()),
    mode: "encode" as Mode,
    reminderTime: localStorage.getItem(STORAGE.reminderTime) || "19:30",
    authUser: null as { uid: string; displayName: string | null; email: string | null } | null,
    deferredPrompt: null as BeforeInstallPromptEvent | null,
    history: loadHistory(),
    practiceWins: Number(localStorage.getItem(STORAGE.practiceWins) || "0"),
    challenge: buildChallenge(),
    lastMessage: ""
  };

  const firebaseContext: {
    db: unknown | null;
    sdk: Record<string, unknown> | null;
    saveTimer: number | null;
  } = { db: null, sdk: null, saveTimer: null };

  function $(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }

  function inputEl(id: string): HTMLInputElement {
    return document.getElementById(id) as HTMLInputElement;
  }

  function textEl(id: string): HTMLTextAreaElement {
    return document.getElementById(id) as HTMLTextAreaElement;
  }

  function t<K extends keyof typeof UI_COPY.hi>(key: K): (typeof UI_COPY.hi)[K] {
    return UI_COPY[state.lang][key] as (typeof UI_COPY.hi)[K];
  }

  function a<K extends keyof typeof APP_COPY.hi>(key: K): (typeof APP_COPY.hi)[K] {
    return APP_COPY[state.lang][key] as (typeof APP_COPY.hi)[K];
  }

  function getThemePreference(): string {
    return localStorage.getItem(STORAGE.familyThemeMode)
      || localStorage.getItem(STORAGE.familyTheme)
      || localStorage.getItem(STORAGE.theme)
      || "system";
  }

  function resolveTheme(themePreference: string): ThemeMode {
    if (themePreference === "night" || themePreference === "dawn") return themePreference;
    const base = themePreference === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : themePreference;
    return base === "light" ? "dawn" : "night";
  }

  function setTheme(theme: ThemeMode, persist = true): void {
    state.theme = theme;
    document.body.dataset.theme = theme;
    if (!persist) return;
    localStorage.setItem(STORAGE.theme, theme);
    localStorage.setItem(STORAGE.familyThemeMode, theme);
    localStorage.setItem(STORAGE.familyTheme, theme === "dawn" ? "light" : "dark");
    renderProfileCard();
    queueCloudSave();
  }

  function toggleTheme(): void {
    setTheme(state.theme === "night" ? "dawn" : "night");
  }

  function formatDateTime(value: string): string {
    return new Date(value).toLocaleString(state.lang === "hi" ? "hi-IN" : "en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  function normalizeAnswer(value: string): string {
    return transliterateHindi(value.toLowerCase())
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function transliterateHindi(input: string): string {
    return input.split("").map((char) => HINDI_MAP[char] ?? char).join("");
  }

  function encodeToMorse(value: string): string {
    return transliterateHindi(value.toLowerCase())
      .split("")
      .map((char) => MORSE[char] ?? char)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function decodeMorse(value: string): string {
    return value.trim().split(/\s+/).map((chunk) => chunk === "/" ? " " : (DECODE[chunk] ?? "?")).join("").replace(/\s+/g, " ").trim();
  }

  function loadHistory(): HistoryEntry[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.history) || "[]") as HistoryEntry[];
    } catch {
      return [];
    }
  }

  function saveHistory(entry: HistoryEntry): void {
    state.history = [entry, ...state.history].slice(0, 10);
    localStorage.setItem(STORAGE.history, JSON.stringify(state.history));
    renderHistory();
    renderMetrics();
    renderProfileCard();
    queueCloudSave();
  }

  function buildChallenge(): PracticeChallenge {
    const answer = PRACTICE_BANK[Math.floor(Math.random() * PRACTICE_BANK.length)];
    return { answer, morse: encodeToMorse(answer) };
  }

  function syncAuthUi(): void {
    const authStateText = $("authStateText");
    const authBtn = $("authBtn") as HTMLButtonElement;
    if (state.authUser) {
      authStateText.textContent = `${t("authSignedAs")} ${state.authUser.displayName || state.authUser.email || "User"}`;
      authBtn.textContent = t("authSignOut") as string;
    } else {
      authStateText.textContent = t("authLoggedOut") as string;
      authBtn.textContent = t("authSignIn") as string;
    }
    renderMetrics();
    renderProfileCard();
  }

  function applyCopy(): void {
    $("menuLabel").textContent = t("menuLabel") as string;
    $("menuTitle").textContent = t("menuTitle") as string;
    $("languageLabel").textContent = t("languageLabel") as string;
    $("languageTitle").textContent = t("languageTitle") as string;
    $("themeLabel").textContent = t("themeLabel") as string;
    $("themeTitle").textContent = t("themeTitle") as string;
    $("themeBtn").textContent = t("themeAction") as string;
    $("installLabel").textContent = t("installLabel") as string;
    $("installTitle").textContent = t("installTitle") as string;
    $("installBtn").textContent = t("installAction") as string;
    $("authLabel").textContent = t("authLabel") as string;
    $("authTitle").textContent = t("authTitle") as string;
    $("reminderLabel").textContent = t("reminderLabel") as string;
    $("reminderTitle").textContent = t("reminderTitle") as string;
    $("reminderField").textContent = t("reminderField") as string;
    $("saveReminderBtn").textContent = t("reminderSave") as string;
    $("pagesLabel").textContent = t("pagesLabel") as string;
    $("pagesTitle").textContent = t("pagesTitle") as string;
    $("pageAbout").textContent = t("pageAbout") as string;
    $("pageResources").textContent = t("pageResources") as string;
    $("pageContact").textContent = t("pageContact") as string;
    $("pagePrivacy").textContent = t("pagePrivacy") as string;
    $("pageTerms").textContent = t("pageTerms") as string;
    $("pageFamily").textContent = t("pageFamily") as string;
    $("brandTag").textContent = t("brandTag") as string;
    $("familyChip").textContent = t("familyChip") as string;
    $("heroHeadline").textContent = t("heroHeadline") as string;
    $("heroText").textContent = t("heroText") as string;
    $("badgeOne").textContent = t("badgeOne") as string;
    $("badgeTwo").textContent = t("badgeTwo") as string;
    $("badgeThree").textContent = t("badgeThree") as string;
    $("metricHistoryLabel").textContent = t("metricHistoryLabel") as string;
    $("metricPracticeLabel").textContent = t("metricPracticeLabel") as string;
    $("metricSyncLabel").textContent = t("metricSyncLabel") as string;
    $("encodeLabel").textContent = a("encodeLabel") as string;
    $("encodeTitle").textContent = a("encodeTitle") as string;
    $("decodeLabel").textContent = a("decodeLabel") as string;
    $("decodeTitle").textContent = a("decodeTitle") as string;
    $("practiceLabel").textContent = a("practiceLabel") as string;
    $("practiceTitle").textContent = a("practiceTitle") as string;
    $("plainLabel").textContent = a("plainLabel") as string;
    $("morseLabel").textContent = a("morseLabel") as string;
    $("encodeBtn").textContent = a("encodeAction") as string;
    $("decodeBtn").textContent = a("decodeAction") as string;
    $("copyMorseBtn").textContent = a("copyMorse") as string;
    $("copyTextBtn").textContent = a("copyText") as string;
    $("practiceAnswerLabel").textContent = a("practiceAnswerLabel") as string;
    $("checkPracticeBtn").textContent = a("practiceCheck") as string;
    $("nextPracticeBtn").textContent = a("practiceNext") as string;
    $("guideLabel").textContent = a("guideLabel") as string;
    $("guideTitle").textContent = a("guideTitle") as string;
    $("guideLetterGap").textContent = a("guideLetterGap") as string;
    $("guideWordGap").textContent = a("guideWordGap") as string;
    $("guideHindiMode").textContent = a("guideHindiMode") as string;
    $("signalsLabel").textContent = a("signalsLabel") as string;
    $("signalsTitle").textContent = a("signalsTitle") as string;
    $("historyLabel").textContent = a("historyLabel") as string;
    $("historyTitle").textContent = a("historyTitle") as string;
    $("profileLabel").textContent = a("profileLabel") as string;
    $("profileTitle").textContent = a("profileTitle") as string;
    $("footerNote").textContent = a("footerNote") as string;
    syncAuthUi();
    renderTabs();
    renderHistory();
    renderProfileCard();
    renderMetrics();
    if (!state.lastMessage) {
      $("practiceFeedback").textContent = a("practiceIdle") as string;
    }
  }

  function setLanguage(lang: Lang): void {
    state.lang = lang;
    localStorage.setItem(STORAGE.lang, lang);
    $("langHiBtn").classList.toggle("active", lang === "hi");
    $("langEnBtn").classList.toggle("active", lang === "en");
    applyCopy();
    queueCloudSave();
  }

  function renderTabs(): void {
    $("modeTabs").innerHTML = `
      <button class="tab-btn ${state.mode === "encode" ? "active" : ""}" type="button" data-mode="encode">${a("tabEncode")}</button>
      <button class="tab-btn ${state.mode === "decode" ? "active" : ""}" type="button" data-mode="decode">${a("tabDecode")}</button>
      <button class="tab-btn ${state.mode === "practice" ? "active" : ""}" type="button" data-mode="practice">${a("tabPractice")}</button>
    `;
    document.querySelectorAll<HTMLElement>(".tool-view").forEach((view) => {
      view.classList.toggle("active", view.id === `view-${state.mode}`);
    });
  }

  function renderHistory(): void {
    const root = $("historyList");
    if (!state.history.length) {
      root.innerHTML = `<div class="history-empty">${a("historyEmpty")}</div>`;
      return;
    }
    root.innerHTML = state.history.map((entry) => `
      <button class="history-item" type="button" data-history-id="${entry.id}">
        <strong>${entry.mode === "encode" ? (a("tabEncode") as string) : (a("tabDecode") as string)}</strong>
        <div>${entry.output.slice(0, 72) || "--"}</div>
        <small>${formatDateTime(entry.createdAt)}</small>
      </button>
    `).join("");
  }

  function renderProfileCard(): void {
    const synced = localStorage.getItem(STORAGE.cloudSyncedAt);
    const theme = state.theme === "night" ? "Night" : "Dawn";
    $("profileCard").innerHTML = `
      <div class="stack-row"><span>${a("profileTheme")}</span><strong>${theme}</strong></div>
      <div class="stack-row"><span>${a("profileReminder")}</span><strong>${localStorage.getItem(STORAGE.reminderEnabled) === "true" ? state.reminderTime : (a("pending") as string)}</strong></div>
      <div class="stack-row"><span>${a("profileCloud")}</span><strong>${state.authUser ? (a("cloudUser") as string) : (a("cloudReady") as string)}</strong></div>
      <div class="stack-row"><span>${a("profileWins")}</span><strong>${state.practiceWins}</strong></div>
      <div class="stack-row"><span>${a("profileHistory")}</span><strong>${state.history.length}</strong></div>
      ${synced ? `<div class="stack-row"><span>Sync</span><strong>${formatDateTime(synced)}</strong></div>` : ""}
    `;
  }

  function renderMetrics(): void {
    $("historyMetricValue").textContent = String(state.history.length);
    $("historyMetricMeta").textContent = state.history[0] ? formatDateTime(state.history[0].createdAt) : (t("historyMetricEmpty") as string);
    $("practiceMetricValue").textContent = String(state.practiceWins);
    $("practiceMetricMeta").textContent = t("practiceMetricMeta") as string;
    $("syncMetricValue").textContent = state.authUser ? "Linked" : (t("syncReady") as string);
    const synced = localStorage.getItem(STORAGE.cloudSyncedAt);
    $("syncMetricMeta").textContent = state.authUser && synced
      ? (a("cloudSavedAt") as (value: string) => string)(formatDateTime(synced))
      : (t("syncMetaIdle") as string);
  }

  function openDrawer(): void {
    $("drawer").classList.add("open");
    $("drawer").setAttribute("aria-hidden", "false");
  }

  function closeDrawer(): void {
    $("drawer").classList.remove("open");
    $("drawer").setAttribute("aria-hidden", "true");
  }

  async function copyOutput(id: string): Promise<void> {
    const text = $(id).textContent || "";
    if (!text || text === "--") return;
    await navigator.clipboard.writeText(text);
    state.lastMessage = a("copied") as string;
  }

  function pushHistory(mode: "encode" | "decode", input: string, output: string): void {
    if (!input.trim() || !output.trim() || output === "--") return;
    saveHistory({ id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`, mode, input, output, createdAt: new Date().toISOString() });
  }

  function encodeText(): void {
    const plain = textEl("plainInput").value.trim();
    const output = encodeToMorse(plain);
    $("morseOutput").textContent = output || "--";
    pushHistory("encode", plain, output);
  }

  function decodeText(): void {
    const raw = textEl("morseInput").value.trim();
    const output = decodeMorse(raw);
    $("textOutput").textContent = output || "--";
    pushHistory("decode", raw, output);
  }

  function renderPractice(): void {
    $("practicePrompt").textContent = state.challenge.morse;
    if (!state.lastMessage) {
      $("practiceFeedback").textContent = a("practiceIdle") as string;
    }
  }

  function checkPractice(): void {
    const answer = normalizeAnswer(inputEl("practiceAnswer").value);
    const expected = normalizeAnswer(state.challenge.answer);
    if (!answer) {
      $("practiceFeedback").textContent = a("practiceIdle") as string;
      return;
    }
    if (answer === expected) {
      state.practiceWins += 1;
      localStorage.setItem(STORAGE.practiceWins, String(state.practiceWins));
      state.lastMessage = a("practiceCorrect") as string;
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
    state.lastMessage = (a("practiceWrong") as (answer: string) => string)(state.challenge.answer);
    $("practiceFeedback").textContent = state.lastMessage;
  }

  function nextPractice(): void {
    state.challenge = buildChallenge();
    inputEl("practiceAnswer").value = "";
    state.lastMessage = "";
    renderPractice();
  }

  function restoreFromHistory(id: string): void {
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
    state.lastMessage = a("restoredItem") as string;
  }

  function queueCloudSave(): void {
    if (!state.authUser || !firebaseContext.db || !firebaseContext.sdk) return;
    if (firebaseContext.saveTimer) window.clearTimeout(firebaseContext.saveTimer);
    firebaseContext.saveTimer = window.setTimeout(() => {
      void saveCloudState();
    }, 700);
  }

  async function saveCloudState(): Promise<void> {
    if (!state.authUser || !firebaseContext.db || !firebaseContext.sdk) return;
    try {
      const { doc, setDoc } = firebaseContext.sdk as {
        doc: (...args: unknown[]) => unknown;
        setDoc: (ref: unknown, value: Record<string, unknown>, options: { merge: boolean }) => Promise<void>;
      };
      const ref = doc(firebaseContext.db, "users", state.authUser.uid, "apps", "sanket-sathi", "state", "default");
      await setDoc(ref, {
        history: state.history,
        lang: state.lang,
        theme: state.theme,
        reminderTime: state.reminderTime,
        practiceWins: state.practiceWins,
        syncedAt: new Date().toISOString()
      }, { merge: true });
      localStorage.setItem(STORAGE.cloudSyncedAt, new Date().toISOString());
      renderMetrics();
      renderProfileCard();
    } catch (error) {
      console.error("Cloud save failed", error);
    }
  }

  async function loadCloudState(): Promise<void> {
    if (!state.authUser || !firebaseContext.db || !firebaseContext.sdk) return;
    try {
      const { doc, getDoc } = firebaseContext.sdk as {
        doc: (...args: unknown[]) => unknown;
        getDoc: (ref: unknown) => Promise<{ exists: () => boolean; data: () => Record<string, unknown> }>;
      };
      const ref = doc(firebaseContext.db, "users", state.authUser.uid, "apps", "sanket-sathi", "state", "default");
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      if (Array.isArray(data.history)) {
        state.history = data.history as HistoryEntry[];
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

  async function initFamilyAuth(): Promise<void> {
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

      (inputEl("authBtn") as HTMLButtonElement).addEventListener("click", async () => {
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

  async function saveReminder(): Promise<void> {
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
    $("reminderStatus").textContent = notificationSupported && Notification.permission === "granted"
      ? (a("reminderSaved") as (time: string) => string)(state.reminderTime)
      : (a("reminderBlocked") as string);
    renderProfileCard();
    queueCloudSave();
  }

  async function maybeShowReminder(): Promise<void> {
    if (localStorage.getItem(STORAGE.reminderEnabled) !== "true") return;
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    if (!("serviceWorker" in navigator)) return;

    const [hours, minutes] = (localStorage.getItem(STORAGE.reminderTime) || state.reminderTime).split(":").map((part) => Number(part));
    const now = new Date();
    const dueToday = new Date();
    dueToday.setHours(hours, minutes, 0, 0);
    const today = now.toISOString().slice(0, 10);
    if (now < dueToday || localStorage.getItem(STORAGE.reminderLastShown) === today) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;
    await registration.showNotification(a("practiceNotificationTitle") as string, {
      body: a("practiceNotificationBody") as string,
      tag: "sanket-practice-reminder"
    });
    localStorage.setItem(STORAGE.reminderLastShown, today);
  }

  function initInstallFlow(): void {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      state.deferredPrompt = event as BeforeInstallPromptEvent;
    });
    window.addEventListener("appinstalled", () => {
      localStorage.setItem(STORAGE.installMarker, "true");
      state.deferredPrompt = null;
    });
  }

  async function triggerInstall(): Promise<void> {
    if (!state.deferredPrompt) {
      window.alert(a("installUnavailable") as string);
      return;
    }
    await state.deferredPrompt.prompt();
    await state.deferredPrompt.userChoice;
  }

  async function registerServiceWorker(): Promise<void> {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("./sw.js");
      } catch (error) {
        console.error("Service worker registration failed", error);
      }
    }
  }

  function bindEvents(): void {
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
    $("copyMorseBtn").addEventListener("click", () => { void copyOutput("morseOutput"); });
    $("copyTextBtn").addEventListener("click", () => { void copyOutput("textOutput"); });
    $("checkPracticeBtn").addEventListener("click", checkPractice);
    $("nextPracticeBtn").addEventListener("click", nextPractice);
    $("saveReminderBtn").addEventListener("click", () => { void saveReminder(); });
    $("installBtn").addEventListener("click", () => { void triggerInstall(); });
    $("modeTabs").addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const mode = target.dataset.mode as Mode | undefined;
      if (!mode) return;
      state.mode = mode;
      renderTabs();
    });
    $("historyList").addEventListener("click", (event) => {
      const target = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-history-id]") : null;
      const id = target?.dataset.historyId;
      if (!id) return;
      restoreFromHistory(id);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDrawer();
    });
  }

  void (async function init(): Promise<void> {
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
