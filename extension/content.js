// ScamShield Active Page Content Script
(function () {
  const currentUrl = window.location.href;
  const currentHost = window.location.hostname;
  
  // Extract visible page signals (forms, payment hints, urgency words)
  const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
  const formsCount = document.querySelectorAll("form").length;
  const passwordInputs = document.querySelectorAll("input[type='password']").length;
  
  const paymentKeywordsFound = [];
  ["₹", "fee", "deposit", "security fee", "upi", "qr code", "caution deposit"].forEach(term => {
    if (bodyText.includes(term)) paymentKeywordsFound.push(term);
  });

  // Expose lightweight telemetry to extension runtime
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "GET_DOM_TELEMETRY") {
      sendResponse({
        url: currentUrl,
        host: currentHost,
        formsCount: formsCount,
        hasPasswordInput: passwordInputs > 0,
        paymentKeywords: paymentKeywordsFound,
        title: document.title
      });
    }
  });
})();
