"use strict";
(() => {
  // src/app.ts
  (() => {
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
    const state = {
      lang: "hi" === localStorage.getItem("sanket-lang") ? "hi" : "en",
      mode: "encode"
    };
    function $(id) {
      return document.getElementById(id);
    }
    function setLang(lang) {
      state.lang = lang;
      localStorage.setItem("sanket-lang", lang);
      $("langHiBtn").classList.toggle("active", lang === "hi");
      $("langEnBtn").classList.toggle("active", lang === "en");
      $("heroHeadline").textContent = lang === "hi" ? "Hindi ya English likho, Morse code me badlo, ya Morse ko text me decode karo." : "Write in Hindi or English, convert it to Morse, or decode Morse back into text.";
      $("heroText").textContent = lang === "hi" ? "Hindi text ko lightweight transliteration ke through Morse me map kiya jata hai, aur English/Morse dono ke liye fast local translation milta hai." : "Hindi text is mapped to Morse through lightweight transliteration, while English and Morse both convert locally at speed.";
      renderTabs();
    }
    function transliterateHindi(input) {
      return input.split("").map((char) => HINDI_MAP[char] ?? char).join("");
    }
    function encodeText() {
      const plain = document.getElementById("plainInput").value.trim();
      const normalized = transliterateHindi(plain.toLowerCase());
      const output = normalized.split("").map((char) => MORSE[char] ?? char).join(" ");
      $("morseOutput").textContent = output || "--";
    }
    function decodeText() {
      const raw = document.getElementById("morseInput").value.trim();
      const output = raw.split(" ").map((chunk) => chunk === "/" ? " " : DECODE[chunk] ?? "?").join("");
      $("textOutput").textContent = output || "--";
    }
    function renderTabs() {
      const labels = state.lang === "hi" ? { encode: "Text \u2192 Morse", decode: "Morse \u2192 Text" } : { encode: "Text \u2192 Morse", decode: "Morse \u2192 Text" };
      $("modeTabs").innerHTML = `
      <button class="tab-btn ${state.mode === "encode" ? "active" : ""}" type="button" data-mode="encode">${labels.encode}</button>
      <button class="tab-btn ${state.mode === "decode" ? "active" : ""}" type="button" data-mode="decode">${labels.decode}</button>
    `;
      document.querySelectorAll(".tool-view").forEach((view) => {
        view.classList.toggle("active", view.id === `view-${state.mode}`);
      });
    }
    async function copyOutput(id) {
      const text = $(id).textContent || "";
      if (!text || text === "--") return;
      await navigator.clipboard.writeText(text);
    }
    function bind() {
      $("langHiBtn").addEventListener("click", () => setLang("hi"));
      $("langEnBtn").addEventListener("click", () => setLang("en"));
      $("encodeBtn").addEventListener("click", encodeText);
      $("decodeBtn").addEventListener("click", decodeText);
      $("copyMorseBtn").addEventListener("click", () => {
        void copyOutput("morseOutput");
      });
      $("copyTextBtn").addEventListener("click", () => {
        void copyOutput("textOutput");
      });
      $("modeTabs").addEventListener("click", (event) => {
        const mode = event.target.dataset.mode;
        if (!mode) return;
        state.mode = mode;
        renderTabs();
      });
    }
    setLang(state.lang);
    bind();
  })();
})();
