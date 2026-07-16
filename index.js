document.addEventListener("DOMContentLoaded", function () {

  // — Element references —
  const questionEl    = document.getElementById("question");
  const askBtn        = document.getElementById("ask-btn");
  const statusEl      = document.getElementById("status");
  const answerEl      = document.getElementById("answer");
  const answerTextEl  = document.getElementById("answer-text");
  const qtypePill     = document.getElementById("type-pill");
  const toolPill      = document.getElementById("tool-pill");
  const sourcesEl     = document.getElementById("sources-wrap");
  const sourcesListEl = document.getElementById("sources");

  const pdfInput      = document.querySelector("#pdf-input");
  const uploadStatus  = document.querySelector("#upload-status");

  // — Question-type class map (matches CSS .pill.definition/.example/.comparison) —
  const QTYPE_CLASS = {
    definition : "pill definition",
    example    : "pill example",
    comparison : "pill comparison",
  };

  // ─── Upload handler ────────────────────────────────────────────────────────

  pdfInput.addEventListener("change", handleUpload);

  function handleUpload() {
    const file = pdfInput.files[0];
    if (!file) return;

    uploadStatus.textContent = "Uploading \"" + file.name + "\"...";
    uploadStatus.className   = "";

    const fd = new FormData();
    fd.append("file", file);

    // Simulated upload confirmation (replace with real fetch() to backend)
    setTimeout(function () {
      uploadStatus.textContent = "\"" + file.name + "\" is ready to search.";
      uploadStatus.className   = "success";
    }, 900);
  }

  // ─── Reset helper ──────────────────────────────────────────────────────────

  function resetAnswerUI() {
    answerTextEl.textContent = "Your answer will appear here...";
    answerEl.classList.add("hidden");

    qtypePill.className   = "pill hidden";
    qtypePill.textContent = "";

    toolPill.className   = "pill hidden";
    toolPill.textContent = "";

    sourcesEl.classList.add("hidden");
    while (sourcesListEl.firstChild) {
      sourcesListEl.removeChild(sourcesListEl.firstChild);
    }
  }

  // ─── Remove any inline onclick that navigates away ─────────────────────────

  askBtn.removeAttribute("onclick");

  // ─── Submit handler ────────────────────────────────────────────────────────

  askBtn.addEventListener("click", function () {

    // Step 1 — Validate
    const question = questionEl.value.trim();

    if (!question) {
      statusEl.textContent = "Please type a question first.";
      statusEl.className   = "error";
      resetAnswerUI();
      return;
    }

    // Step 2 — Loading state
    resetAnswerUI();
    statusEl.textContent = "Thinking...";
    statusEl.className   = "thinking";
    askBtn.disabled = true;

    // Step 3 — Simulated delay (single setTimeout)
    setTimeout(function () {

      const lower = question.toLowerCase();

      // Step 4 — Question type
      var placeholderType;

      if (lower.startsWith("what is"))
        placeholderType = "definition";

      else if (lower.startsWith("give") || lower.includes("example"))
        placeholderType = "example";

      else if (
        lower.includes("vs") ||
        lower.includes("versus") ||
        lower.includes("compare") ||
        lower.includes("difference")
      )
        placeholderType = "comparison";

      else
        placeholderType = "definition";

      // Step 5 — Tool
      var placeholderTool;
      if (/^[\d\s\+\-\*\/\%\(\)\.]+$/.test(question.trim()))
        placeholderTool = "calculator";
      else
        placeholderTool = "search_notes";

      // Step 6 — Placeholder answer
      var placeholderAnswer =
        "Placeholder answer for: \"" + question + "\". Real answers will appear here once the backend is connected.";

      // Step 7 — Populate UI

      // Answer text
      answerTextEl.textContent = placeholderAnswer;

      // Question-type pill
      qtypePill.textContent = "type: " + placeholderType;
      qtypePill.className   = QTYPE_CLASS[placeholderType];

      // Tool pill
      toolPill.textContent = "tool: " + placeholderTool;
      toolPill.className   = "pill";

      // Sources
      if (placeholderTool !== "calculator") {
        var chunks = [
          "Sample source chunk 1 — example excerpt from the uploaded notes.",
          "Sample source chunk 2 — another excerpt.",
          "Sample source chunk 3 — final excerpt.",
        ];
        chunks.forEach(function (text) {
          var li = document.createElement("li");
          li.textContent = text;
          sourcesListEl.appendChild(li);
        });
        sourcesEl.classList.remove("hidden");
      }

      // Reveal answer panel & clear status
      answerEl.classList.remove("hidden");
      statusEl.textContent = "";
      statusEl.className   = "";
      askBtn.disabled = false;

    }, 2300);
  });

});