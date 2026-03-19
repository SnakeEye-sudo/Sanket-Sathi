(() => {
  type Lang = "hi" | "en";
  type Mode = "encode" | "decode";

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
    "ड": "da", "ढ": "dha", "त": "ta", "थ": "tha", "द": "da", "ध": "dha", "न": "na", "प": "pa", "फ": "pha", "ब": "ba", "भ": "bha", "म": "ma",
    "य": "ya", "र": "ra", "ल": "la", "व": "va", "श": "sha", "ष": "sha", "स": "sa", "ह": "ha", "ं": "n", "ः": "h", "ा": "a", "ि": "i", "ी": "i", "ु": "u", "ू": "u", "े": "e", "ै": "ai", "ो": "o", "ौ": "au", "्": ""
  };

  const state = {
    lang: ("hi" === localStorage.getItem("sanket-lang") ? "hi" : "en") as Lang,
    mode: "encode" as Mode
  };

  function $(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }

  function setLang(lang: Lang): void {
    state.lang = lang;
    localStorage.setItem("sanket-lang", lang);
    $("langHiBtn").classList.toggle("active", lang === "hi");
    $("langEnBtn").classList.toggle("active", lang === "en");
    $("heroHeadline").textContent = lang === "hi"
      ? "Hindi ya English likho, Morse code me badlo, ya Morse ko text me decode karo."
      : "Write in Hindi or English, convert it to Morse, or decode Morse back into text.";
    $("heroText").textContent = lang === "hi"
      ? "Hindi text ko lightweight transliteration ke through Morse me map kiya jata hai, aur English/Morse dono ke liye fast local translation milta hai."
      : "Hindi text is mapped to Morse through lightweight transliteration, while English and Morse both convert locally at speed.";
    renderTabs();
  }

  function transliterateHindi(input: string): string {
    return input.split("").map((char) => HINDI_MAP[char] ?? char).join("");
  }

  function encodeText(): void {
    const plain = (document.getElementById("plainInput") as HTMLTextAreaElement).value.trim();
    const normalized = transliterateHindi(plain.toLowerCase());
    const output = normalized.split("").map((char) => MORSE[char] ?? char).join(" ");
    $("morseOutput").textContent = output || "--";
  }

  function decodeText(): void {
    const raw = (document.getElementById("morseInput") as HTMLTextAreaElement).value.trim();
    const output = raw
      .split(" ")
      .map((chunk) => chunk === "/" ? " " : (DECODE[chunk] ?? "?"))
      .join("");
    $("textOutput").textContent = output || "--";
  }

  function renderTabs(): void {
    const labels = state.lang === "hi"
      ? { encode: "Text → Morse", decode: "Morse → Text" }
      : { encode: "Text → Morse", decode: "Morse → Text" };
    $("modeTabs").innerHTML = `
      <button class="tab-btn ${state.mode === "encode" ? "active" : ""}" type="button" data-mode="encode">${labels.encode}</button>
      <button class="tab-btn ${state.mode === "decode" ? "active" : ""}" type="button" data-mode="decode">${labels.decode}</button>
    `;
    document.querySelectorAll<HTMLElement>(".tool-view").forEach((view) => {
      view.classList.toggle("active", view.id === `view-${state.mode}`);
    });
  }

  async function copyOutput(id: string): Promise<void> {
    const text = $(id).textContent || "";
    if (!text || text === "--") return;
    await navigator.clipboard.writeText(text);
  }

  function bind(): void {
    $("langHiBtn").addEventListener("click", () => setLang("hi"));
    $("langEnBtn").addEventListener("click", () => setLang("en"));
    $("encodeBtn").addEventListener("click", encodeText);
    $("decodeBtn").addEventListener("click", decodeText);
    $("copyMorseBtn").addEventListener("click", () => { void copyOutput("morseOutput"); });
    $("copyTextBtn").addEventListener("click", () => { void copyOutput("textOutput"); });
    $("modeTabs").addEventListener("click", (event) => {
      const mode = (event.target as HTMLElement).dataset.mode as Mode | undefined;
      if (!mode) return;
      state.mode = mode;
      renderTabs();
    });
  }

  setLang(state.lang);
  bind();
})();
