// ScamShield Manifest V3 Background Service Worker
const API_BASE_URL = "http://localhost:8000/api";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[ScamShield Extension] Background Service Worker installed.");
  chrome.action.setBadgeBackgroundColor({ color: "#06B6D4" });
  chrome.action.setBadgeText({ text: "ON" });
});

// Listen for tab updates to perform background security triage
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
    inspectTabSecurity(tabId, tab.url);
  }
});

async function inspectTabSecurity(tabId, url) {
  try {
    let pageContent = "";
    if (tabId && url && url.startsWith("http")) {
      try {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => document.body ? document.body.innerText.slice(0, 3500) : ""
        });
        if (results && results[0] && results[0].result) {
          pageContent = results[0].result;
        }
      } catch (e) {
        // Tab not yet ready or restricted
      }
    }

    const response = await fetch(`${API_BASE_URL}/analyze/url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url, page_content: pageContent })
    });

    if (response.ok) {
      const data = await response.json();
      const score = data.riskScore;
      
      let badgeColor = "#10B981"; // Safe Green
      let badgeText = "SAFE";

      if (score >= 80) {
        badgeColor = "#EF4444"; // Critical Red
        badgeText = "CRIT";
      } else if (score >= 55) {
        badgeColor = "#F97316"; // High Orange
        badgeText = "HIGH";
      } else if (score >= 25) {
        badgeColor = "#F59E0B"; // Moderate Yellow
        badgeText = "WARN";
      }

      chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: badgeColor, tabId: tabId });
      
      // Store latest scan for popup
      chrome.storage.local.set({ [tab.url]: data });
    }
  } catch (err) {
    console.warn("[ScamShield Extension] Backend inspection offline or unreachable:", err);
  }
}
