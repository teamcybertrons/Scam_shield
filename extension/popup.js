// ScamShield Manifest V3 Extension Popup Controller
const API_BASE_URL = "http://localhost:8000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const loadingEl = document.getElementById("loading");
  const resultEl = document.getElementById("result");
  const errorBox = document.getElementById("errorBox");
  const retryBtn = document.getElementById("retryBtn");
  const openReportBtn = document.getElementById("openReportBtn");

  let currentAnalysisId = null;

  async function runInspection() {
    loadingEl.classList.remove("hidden");
    resultEl.classList.add("hidden");
    errorBox.classList.add("hidden");

    try {
      // 1. Get active browser tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url) {
        throw new Error("No active tab URL detected");
      }

      document.getElementById("targetUrl").textContent = tab.url;

      // 2. Call ScamShield Backend API
      const res = await fetch(`${API_BASE_URL}/analyze/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tab.url })
      });

      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }

      const data = await res.json();
      currentAnalysisId = data.id;

      // 3. Render Results
      renderResults(data);
    } catch (err) {
      console.error("[ScamShield Extension Error]", err);
      loadingEl.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }

  function renderResults(data) {
    loadingEl.classList.add("hidden");
    resultEl.classList.remove("hidden");

    const scoreEl = document.getElementById("riskScore");
    const levelEl = document.getElementById("riskLevel");
    const scoreCard = document.getElementById("scoreCard");
    const brandText = document.getElementById("brandText");
    const statusDot = document.getElementById("statusDot");
    const evidenceList = document.getElementById("evidenceList");

    scoreEl.textContent = `${data.riskScore}/100`;
    levelEl.textContent = `${data.riskLevel} RISK`;
    document.getElementById("confidence").textContent = `${data.confidence}% Confidence`;

    // Colors
    if (data.riskScore >= 80) {
      scoreCard.style.borderColor = "#EF4444";
      scoreEl.style.color = "#EF4444";
      levelEl.style.color = "#EF4444";
    } else if (data.riskScore >= 55) {
      scoreCard.style.borderColor = "#F97316";
      scoreEl.style.color = "#F97316";
      levelEl.style.color = "#F97316";
    } else if (data.riskScore >= 25) {
      scoreCard.style.borderColor = "#F59E0B";
      scoreEl.style.color = "#F59E0B";
      levelEl.style.color = "#F59E0B";
    } else {
      scoreCard.style.borderColor = "#10B981";
      scoreEl.style.color = "#10B981";
      levelEl.style.color = "#10B981";
    }

    // Company verification
    const ver = data.verification || {};
    if (ver.status === "VERIFIED") {
      statusDot.style.background = "#10B981";
      brandText.textContent = `Verified Official: ${ver.claimedName}`;
    } else if (ver.status === "SUSPICIOUS_MISMATCH") {
      statusDot.style.background = "#EF4444";
      brandText.textContent = `Mismatch: Impersonating ${ver.claimedName}`;
    } else {
      statusDot.style.background = "#94A3B8";
      brandText.textContent = ver.claimedName ? `Unverified: ${ver.claimedName}` : "Third-Party Domain";
    }

    // Evidence
    evidenceList.innerHTML = "";
    const items = data.evidenceList || [];
    if (items.length === 0) {
      evidenceList.innerHTML = `<div class="evidence-chip clean"><span>✓ No malicious threat signatures identified</span></div>`;
    } else {
      items.slice(0, 3).forEach(ev => {
        const chip = document.createElement("div");
        chip.className = `evidence-chip ${ev.severity === "CRITICAL" ? "" : "warning"}`;
        chip.innerHTML = `<strong>${ev.title}:</strong> <span>${ev.description.substring(0, 70)}...</span>`;
        evidenceList.appendChild(chip);
      });
    }
  }

  retryBtn.addEventListener("click", runInspection);

  openReportBtn.addEventListener("click", () => {
    if (currentAnalysisId) {
      chrome.tabs.create({ url: `http://localhost:5173/?report=${currentAnalysisId}` });
    } else {
      chrome.tabs.create({ url: `http://localhost:5173` });
    }
  });

  // Run on open
  runInspection();
});
